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

interface ProductUpdate {
  id: number
  title: string
  tags: string
  sku: string
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    //Get the product list
    var productList = await database.select().from(productSchema)
    
    //if product list is empty, fetch from an endpoint and populate the product list database
    if(productList.length === 0) {
      console.log("Product list empty. Starting to populate.")
      const productArray: ProductEntry[] = [] 

      //fetch data from a third-party endpoint and check response if okay
      const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts')
      if(!response.ok) {
        return res.status(500).json({ message: 'Error fetching data from external API.' })
      }
      const data = await response.json() as ProductResponse
      
      //prepare and map the records for insertion
      data.products.map( product => {
        const { title, tags, variants } = product

        variants.map( variant => {
          const variantTitle = variant.title
          const variantSKU = variant.sku

          productArray.push({
            title: (title || "") + " " + (variantTitle || ""),
            tags: tags || "",
            sku: variantSKU || ""
          })
        })
      })

      //insert the records to the database
      const insertPromises = productArray.map(async product => {
        return await database
          .insert(productSchema)
          .values({
            title: product.title,
            tags: product.tags,
            sku: product.sku
          })
          .execute();
      })
      await Promise.all(insertPromises)
      
      //return a message if products has been inserted
      return res.status(200).json({ message: 'Products have been inserted.' })
    }

    //return a message if products have already been inserted
    return res.status(409).json({ message: 'Products have already been inserted.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products.' });
  }
}

export const postProducts = async (req: Request, res: Response) => {
  try {
    //Get the product list
    var productList = await database.select().from(productSchema)
    
    //if product list is empty, fetch from an endpoint and populate the product list database
    if(productList.length === 0) {
      console.log("Product list empty. Starting to populate.")
      const productArray: ProductEntry[] = [] 

      //fetch data from a third-party endpoint and check response if okay
      const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts')
      if(!response.ok) {
        return res.status(500).json({ message: 'Error fetching data from external API.' })
      }
      const data = await response.json() as ProductResponse
      
      //prepare and map the records for insertion
      data.products.map( product => {
        const { title, tags, variants } = product

        variants.map( variant => {
          const variantTitle = variant.title
          const variantSKU = variant.sku

          productArray.push({
            title: (title || "") + " " + (variantTitle || ""),
            tags: tags || "",
            sku: variantSKU || ""
          })
        })
      })

      //insert the records to the database
      const insertPromises = productArray.map(async product => {
        return await database
          .insert(productSchema)
          .values({
            title: product.title,
            tags: product.tags,
            sku: product.sku
          })
          .execute();
      })
      await Promise.all(insertPromises)

      //get the updated product list to be returned as JSON
      productList = await database.select().from(productSchema)
      
      //return a success message and a JSON for response
      return res.status(200).json({ message: 'Products have been inserted.', productList })
    }
    
    //return a JSON and a message if products have already been inserted
    return res.status(200).json({ message: 'Products have already been inserted.', productList })
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products.' });
  }
}

export const updateProducts = async (req: Request, res: Response) => {
  try {
    //Get the product list
    var productList = await database.select().from(productSchema)

    //Return a 404 message if the table has no records
    if(productList.length === 0) {
      return res.status(404).json({ message: 'There are no products listed.' })
    }

    //Update the title on every record in the product list 
    productList.map( async product => {
      await database
        .update(productSchema)
        .set({title: (product.title || "") + (product.sku || "")})
        .where(eq(productSchema.id, product.id))

    })

    //return a success message
    return res.status(200).json({ message: 'Products have been updated.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating products.' })
  }
}

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    //Get the ID from the URL
    const { id } = req.params

    //Get the records using the ID
    const productSelect = await database.select().from(productSchema).where(eq(productSchema.id, id as any))

    //Return a 404 message if the record does not exist
    if(productSelect.length === 0) {
      return res.status(404).json({ message: 'Product does not exist.' })
    }

    //Delete the record if it exist
    const result = await database
      .delete(productSchema)
      .where(eq(productSchema.id, id as any))
      .execute()

    //return a successful message
    return res.status(200).json({ message: 'Product has been deleted.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting products.' })
  }
}