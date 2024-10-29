import { Request, Response } from 'express'
import { productSchema } from '../db/schema.js'
import { database } from '../db/database.js';
import { eq } from 'drizzle-orm';

interface Variant {
  title: string
  sku: string
}

interface Product {
  title: string
  tags: string
  variants: Variant[]
}

interface ProductResponse {
  products: Product[]
}

interface ProductEntry { 
  title: string
  tags: string
  sku: string
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productList = await database.select().from(productSchema)
    
    if(productList.length === 0) {
      console.log("Product list empty. Starting to populate.")
      const productArray: ProductEntry[] = [] 

      const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get')
      const data = await response.json() as ProductResponse
      
      data.products.forEach(product => {
        const { title, tags, variants } = product

        variants.forEach(variant => {
          const variantTitle = variant.title
          const variantSKU = variant.sku

          productArray.push({
            title: title + " " + variantTitle,
            tags: tags,
            sku: variantSKU
          })
        })
      })

      productArray.forEach( async product => {
        const newProducts = await database
          .insert(productSchema)
          .values({
            title: product.title,
            tags: product.tags,
            sku: product.sku
          })
          .execute()
        
        console.log('Added ' + product.title)
      })
      return res.status(200).json({ message: 'Products have been inserted.' })
    }
    return res.status(200).json({ message: 'Products have already been inserted.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products.' });
  }
}

export const postProducts = async (req: Request, res: Response) => {
  try {
    var productList = await database.select().from(productSchema)
    
    if(productList.length === 0) {
      console.log("Product list empty. Starting to populate.")
      const productArray: ProductEntry[] = [] 

      const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts')
      const data = await response.json() as ProductResponse
      
      data.products.forEach(product => {
        const { title, tags, variants } = product

        variants.forEach(variant => {
          const variantTitle = variant.title
          const variantSKU = variant.sku

          productArray.push({
            title: title + " " + variantTitle,
            tags: tags,
            sku: variantSKU
          })
        })
      })

      productArray.forEach(product => {
        const newProducts = database
          .insert(productSchema)
          .values({
            title: product.title,
            tags: product.tags,
            sku: product.sku
          })
          .execute()

        console.log('Added ' + product.title)
      })
      productList = await database.select().from(productSchema)
      console.log(productList)
      return res.status(200).json({ message: 'Products have been inserted.', productList })
    }
    console.log(productList)
    return res.status(200).json({ message: 'Products have already been inserted.', productList })
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products.' });
  }
}

export const updateProducts = async (req: Request, res: Response) => {
  try {
    var productList = await database.select().from(productSchema)
    var productArray: ProductEntry[] = []

    productList.forEach(product => {
      productArray.push({
        title: (product.title || "") + (product.sku || ""),
        tags: product.tags || "",
        sku: product.sku || ""
      })
    })

    return res.status(200).json({ message: 'Products have been updated.', productArray })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating products.' })
  }
}

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const productSelect = await database.select().from(productSchema).where(eq(productSchema.id, id as any))

    if(productSelect.length === 0) {
      return res.status(404).json({ message: 'Product does not exist.' })
    }


    const result = await database
      .delete(productSchema)
      .where(eq(productSchema.id, id as any))
      .execute()

    return res.status(200).json({ message: 'Product has been deleted.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting products.' })
  }
}