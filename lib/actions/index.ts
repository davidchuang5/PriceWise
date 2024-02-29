'use server';

import { revalidatePath } from 'next/cache';
import { scrapeAmazonProduct } from './scraper/index';
import { connectToDB } from '../mongoose';
import Product from '../models/product.models';
import { getLowestPrice, getHighestPrice, getAveragePrice } from '../utils';

export async function scrapeAndStoreProduct(productURL: string) {
  if (!productURL) {
    return;
  } else {
    try {
      connectToDB();
      const scrapedProduct = await scrapeAmazonProduct(productURL); // This return the dat object

      if (!scrapedProduct) return;

      let product = scrapedProduct;

      const existingProduct = await Product.findOne({ url: scrapedProduct.url });

      if (existingProduct) {
        const updatedPriceHistory: any = [
          ...existingProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };
      }

      // Now we either add a new product, or return the existing one
      const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url }, product, {
        upsert: true,
        new: true,
      });

      // Refresh page with updated info
      revalidatePath(`/products/${newProduct._id}`);
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`);
    }
  }
}
