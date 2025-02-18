import type { Product } from '@/interfaces/IProduct'
import api from '../api'

export const getAllProducts = async (page: number, per_page: number) => {
  try {
    const response = await api.get(`/product?page=${page}&per_page=${per_page}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/product/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createProduct = async (product: Product) => {
  try {
    const response = await api.post('/product', product)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/product/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
