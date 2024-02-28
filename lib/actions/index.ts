'use server';

import { scrapeAmazonProduct } from './scraper/index';

export async function scrapeAndStoreProduct(productURL: string) {
  if (!productURL) {
    return;
  } else {
    try {
      const scrapedProduct = await scrapeAmazonProduct(productURL);
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`);
    }
  }
}
