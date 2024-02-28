'use server';

import { scrapeAmazonProduct } from './scraper/index';
import { connectToDB } from '../mongoose';

export async function scrapeAndStoreProduct(productURL: string) {
  if (!productURL) {
    return;
  } else {
    try {
      connectToDB();
      const scrapedProduct = await scrapeAmazonProduct(productURL);

      if (!scrapedProduct) return;

      let product = scrapedProduct;

      //const existingProduct = await Product
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`);
    }
  }
}
