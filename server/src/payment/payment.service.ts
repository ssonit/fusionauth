import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { catchError, firstValueFrom, map } from 'rxjs'
import { CreatePaypalOrder } from './dto'

@Injectable()
export class PaymentService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  getConfig() {
    return {
      data: this.configService.get('PAYPAL_CLIENT_ID')
    }
  }

  async getAccessToken() {
    try {
      const clientId = this.configService.get('PAYPAL_CLIENT_ID')
      const secretId = this.configService.get('PAYPAL_SECRET_ID')
      const auth = `${clientId}:${secretId}`
      const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token'
      const data = new URLSearchParams()
      data.append('grant_type', 'client_credentials')

      const result = await firstValueFrom(
        this.httpService
          .post(url, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(auth).toString('base64')}`
            }
          })
          .pipe(
            map((res) => res.data),
            catchError((err) => {
              throw `An error happened. Msg: ${JSON.stringify(err?.response?.data)}`
            })
          )
      )

      return result
    } catch (error) {
      return error
    }
  }

  async createPaypalOrder(payload: CreatePaypalOrder) {
    try {
      const { access_token } = await this.getAccessToken()

      const url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders'
      const result = await firstValueFrom(
        this.httpService
          .post(url, payload, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`
            }
          })
          .pipe(map((res) => res.data))
      )
      return result
    } catch (error) {
      return error
    }
  }

  async capturePaypalOrder({ order_id }: { order_id: string }) {
    try {
      const { access_token } = await this.getAccessToken()
      const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${order_id}/capture`

      const result = await firstValueFrom(
        this.httpService
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`
              }
            }
          )
          .pipe(
            map((res) => res.data),
            catchError((err) => {
              throw `An error happened. Msg: ${JSON.stringify(err?.response?.data)}`
            })
          )
      )
      return result
    } catch (error) {
      return error
    }
  }
}
