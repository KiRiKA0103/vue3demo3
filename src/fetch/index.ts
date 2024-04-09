import { createFetch } from '@vueuse/core'
import type { ResultVO } from '@/type/Type'
import { openMessageBox } from '@/dataSource/service'

const useFetch = createFetch({
  baseUrl: '',
  options: {
    beforeFetch: ({ options }) => {
      // console.log('beforeFetch')
      const token = sessionStorage.getItem('token')
      if (token) {
        options.headers = {
          ...options.headers,
          token
        }
      }
      return { options }
    },
    afterFetch: (ctx) => {
      // console.log('afterFetch')
      const data: ResultVO<{}> = ctx.data
      if (data.code != 200) {
        return Promise.reject(data.message)
      }
      return ctx
    },
    onFetchError: (ctx) => {
      // console.log('onFetchError')
      ctx.error && openMessageBox(ctx.error)
      return Promise.reject(ctx.error)
    }
  }
})


export async function useGet<T>(url: string) {
  const resp = useFetch(url, { immediate: false }).get().json<ResultVO<T>>()
  await resp.execute(true)
  return resp
}

export async function usePost<T>(url: string, data: unknown) {
  const resp = useFetch(url, { immediate: false }).post(data).json<ResultVO<T>>()
  await resp.execute(true)
  return resp
}
