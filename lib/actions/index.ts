'use server';

import { revalidatePath } from 'next/cache';
<<<<<<< HEAD
import Product from '../models/product.model';
import { connectToDB } from '../mongoose';
import { scrapeAmazonProduct } from '../scraper';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils';
import { User } from '@/types';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

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
=======
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
>>>>>>> 5085a9b7df8502517563722c3e7b516ae0702e3f
    }

    const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url }, product, {
      upsert: true,
      new: true,
    });

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

<<<<<<< HEAD
export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
=======
export async function getAllProducts() {
  try {
    connectToDB();
    const allProducts = await Product.find();
    return allProducts;
>>>>>>> 5085a9b7df8502517563722c3e7b516ae0702e3f
  } catch (error) {
    console.log(error);
  }
}
<<<<<<< HEAD

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

// export async function addUserEmailToProduct(productId: string, userEmail: string) {
//   try {
//     const product = await Product.findById(productId);

//     if (!product) return;

//     const userExists = product.users.some((user: User) => user.email === userEmail);

//     if (!userExists) {
//       product.users.push({ email: userEmail });

//       await product.save();

//       const emailContent = await generateEmailBody(product, 'WELCOME');

//       await sendEmail(emailContent, [userEmail]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
=======
>>>>>>> 5085a9b7df8502517563722c3e7b516ae0702e3f
