import React, { createContext, useEffect, useState } from 'react'
import productsApi from '../api/ProductsApi';
import { Producto, ProductsResponse } from '../interfaces/productsInterface';

type ProductsContextProps = {
    products:Producto[]
    loadProducts: () => Promise<void>
    addProduct : ( categoryId:string, productName:string ) => Promise<void>
    updateProduct : ( categoryId:string, productName:string, productId:string) => Promise<void>
    deleteProduct : ( productId:string ) => Promise<void>
    loadProductById : ( productId:string ) => Promise<Producto>
    updaloadImage: (data:any, id:string) => Promise<void>
}

export const ProductContext = createContext({} as ProductsContextProps )

const ProductsProvider = ({children}:any) => {
    const [products, setproducts] = useState<Producto[]>([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        const res = await productsApi.get<ProductsResponse>('/productos?limite=5')
        //setproducts([...products,...res.data.productos])
        setproducts(res.data.productos)
        console.log(res.data.productos)

    }
    const addProduct = async ( categoryId:string, productName:string ) => {}
    const updateProduct = async ( categoryId:string, productName:string, productId:string) => {}
    const deleteProduct = async ( productId:string ) => {}
    const loadProductById = async ( productId:string ) => {
        throw new Error('Wait for it')
    }
    const updaloadImage= async(data:any, id:string) => {}
    return (
        <ProductContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                updaloadImage

            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductsProvider
