// noinspection JSUnusedGlobalSymbols

import axios, { AxiosInstance } from 'axios'

export class Webstore {
  client: AxiosInstance
  pubId: string
  extId: string

  constructor(pubId: string, extId: string, token: string) {
    this.pubId = pubId
    this.extId = extId
    this.client = axios.create({
      baseURL: 'https://chromewebstore.googleapis.com',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getExtension() {
    const response = await this.client.get(
      `/v2/publishers/${this.pubId}/items/${this.extId}:fetchStatus`,
    )
    // console.log('response:', response)
    return response.data
  }

  async uploadFile(file: Buffer) {
    const response = await this.client.post(
      `/upload/v2/publishers/${this.pubId}/items/${this.extId}:upload`,
      file,
      { headers: { 'Content-Type': 'application/zip' } },
    )
    // console.log('response:', response)
    return response.data
  }

  async publishExtension() {
    const response = await this.client.post(
      `/v2/publishers/${this.pubId}/items/${this.extId}:publish`,
    )
    // console.log('response:', response)
    return response.data
  }
}
