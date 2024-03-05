'use server';

import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice, getNumberOfRatings } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  const pw = require('playwright');

  const SBR_CDP =
    'wss://brd-customer-hl_d9cc939f-zone-pricecheckscrape:xse09t0wedp1@brd.superproxy.io:9222';

  const browser = await pw.chromium.connectOverCDP(SBR_CDP);
  const page = await browser.newPage();
  console.log(`Connected! Navigating to ${url}`);
  await page.goto(url, { timeout: 60000 }); // 60 seconds alotted for function to run

  const html = await page.content({ timeout: 60000 });
  console.log(html);
  try {
    // Load the page content into Cheerio for parsing
    const $ = cheerio.load(html);

    // Extract the product title
    const title = $('#titleSection #title #productTitle').text().trim();
    //console.log('title', title);
    const currentPrice = extractPrice(
      $('.a-section.a-spacing-none.aok-align-center.aok-relative .aok-offscreen'),
      $('.a-section.a-spacing-micro .a-price.aok-align-center .a-offscreen')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    const rating = $('#acrCustomerReviewText:first').text().trim();
    const stars = $('#averageCustomerReviews .a-size-base.a-color-base:first').text().trim();
    const outOfStock =
      $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'));
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

    const description = extractDescription($);

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'Amazon Price',
      reviewsCount: String(rating),
      stars: Number(stars),
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: originalPrice,
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    console.log('data', data);
    await browser.close();
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
