'use server'
import { ActionResult } from '@/actions/action-result'
import { GetQuotesResponse, getQuotesResponseSchema } from '@/schemas/quotes'

export interface GetQuotesProps {
  skip: number
  limit: number
}

export const getQuotes = async ({
  skip,
  limit,
}: GetQuotesProps): Promise<ActionResult<GetQuotesResponse>> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    })
    const baseUrl = 'https://dummyjson.com/quotes'

    const url = `${baseUrl}?${params.toString()}`
    const response = await fetch(url)
    const result = await response.json()

    const { success, data } = getQuotesResponseSchema.safeParse(result)

    if (success) {
      return {
        status: 'success',
        data: data,
      }
    } else {
      return {
        status: 'error',
        error: '데이터 형식이 올바르지 않습니다.',
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'error',
        error: error.message,
      }
    }

    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다.',
    }
  }
}
