import axios from 'axios'
import { serverApiUrl } from '../constants/apis'

const apiUrl = serverApiUrl

async function get(url: string, headers?: object) {
  try {
    const response = await axios.get(url, {
      // withCredentials: true, // 启用跨域请求携带凭证
      headers,
    })
    return response.data
  }
  catch (error: any) {
    console.error(error.message)
    const customError = { code: 400, message: '请求失败', data: null }
    throw customError
  }
}
async function post(url: string, json: object, headers?: object) {
  try {
    const response = await axios.post(url, json, {
      // withCredentials: true, // 启用跨域请求携带凭证
      headers,
    })

    return response.data
  }
  catch (error: any) {
    console.error(error.message)
    const customError = { code: 400, message: '请求失败', data: null }
    throw customError
  }
}

export {
  apiUrl,
  get,
  post,
}
