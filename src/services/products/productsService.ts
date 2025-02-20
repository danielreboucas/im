import type { Product } from '@/interfaces/IProduct'
import { formatRequestParameters } from '@/utils/formatRequestParameters'
import api from '../api'

export const getAllProducts = async (
  page: number,
  per_page: number,
  sort?: string,
  name?: string,
) => {
  try {
    const response = await api.get(
      `/product${formatRequestParameters({
        page,
        per_page,
        sort,
        name,
      })}`,
    )
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

export const editProduct = async (id: string, product: Product) => {
  try {
    const response = await api.patch(`/product/${id}`, product)
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
