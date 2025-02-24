import type { Sale } from '@/interfaces/ISale'
import { formatRequestParameters } from '@/utils/formatRequestParameters'
import api from '../api'

const baseUrl = '/sale'

export const getAllSales = async (
  page: number,
  per_page: number,
  sort?: string,
  sale_name?: string,
) => {
  try {
    const response = await api.get(
      `${baseUrl}${formatRequestParameters({
        page,
        per_page,
        sort,
        sale_name,
      })}`,
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const getSale = async (id: string) => {
  try {
    const response = await api.get(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createSale = async (sale: Sale) => {
  try {
    const response = await api.post(baseUrl, sale)
    return response.data
  } catch (error) {
    throw error
  }
}

export const editSale = async (id: string, sale: Sale) => {
  try {
    const response = await api.patch(`${baseUrl}/${id}`, sale)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteSale = async (id: string) => {
  try {
    const response = await api.delete(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
