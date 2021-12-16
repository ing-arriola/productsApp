import {useEffect,useState} from 'react';
import productsApi from '../api/ProductsApi';
import { Categoria, CategoriesResponse } from '../interfaces/categoriesInterface';
export const useCategories = () => {
    const [isLoading, setisLoading] = useState(true)
    const [categories, setcategories] = useState<Categoria[]>([])

    const getCategories = async() => {
        const res = await productsApi.get <CategoriesResponse>('/categorias')
        setcategories(res.data.categorias)
        setisLoading(false)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return { 
        categories,
        isLoading
    }

}


    