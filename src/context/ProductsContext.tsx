import React, { createContext, useEffect, useState } from 'react'
import { ImagePickerResponse } from 'react-native-image-picker';
import productsApi from '../api/ProductsApi';
import { Producto, ProductsResponse } from '../interfaces/productsInterface';

type ProductsContextProps = {
    products:Producto[]
    loadProducts: () => Promise<void>
    addProduct : ( categoryId:string, productName:string ) => Promise<Producto | undefined>
    updateProduct : ( categoryId:string, productName:string, productId:string) => Promise<void>
    deleteProduct : ( productId:string ) => Promise<void>
    loadProductById : ( productId:string ) => Promise<Producto>
    updaloadImage: (data:any, id:string) => Promise<void>
}

export const ProductContext = createContext({} as ProductsContextProps )

const ProductsProvider = ({children}:any) => {
    const [products, setproducts] = useState<Producto[]>([])

    const loadProducts = async () => {
        const res = await productsApi.get<ProductsResponse>('/productos')
        //setproducts([...products,...res.data.productos])
        setproducts(res.data.productos)
        console.log(res.data.productos.length)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const addProduct = async ( categoryId:string, productName:string ) => {
        console.log({categoryId,productName})
        try {
            const res = await productsApi.post<Producto>('/productos',{
                nombre:productName,
                categoria:categoryId
            })
            setproducts([...products,res.data])    
            return res.data
        } catch (error) {
            console.log(error)
        }
        
        
    }
    const updateProduct = async ( categoryId:string, productName:string, productId:string) => {
        try {
            const res = await productsApi.put<Producto>(`/productos/${productId}`,{
                nombre:productName,
                categoria:categoryId
            })
            setproducts(
                products.map( prod =>  (prod._id === productId) ? res.data : prod)
            )
        } catch (error) {
            console.log(error)
        }
    }
    const deleteProduct = async ( productId:string ) => {}
    const loadProductById = async ( productId:string ):Promise<Producto>=> {
        const res = await productsApi.get<Producto>(`/productos/${productId}`)
        return res.data
    }
    const updaloadImage= async(data:ImagePickerResponse, id:string) => {
        const fileToUpload = {
            uri : data.assets![0].uri,
            type: data.assets![0].type,
            name : data.assets![0].fileName
        }
        const formData = new FormData()
        formData.append('archivo',fileToUpload)
        try {
            const res = await productsApi.put(`/uploads/productos/${id}`,formData)
        } catch (error) {
            console.log(error)
        }

    }
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
