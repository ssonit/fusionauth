import { Injectable } from '@nestjs/common'

@Injectable()
export class PaymentService {
  createPaymentUrl(payload: any) {
    //   const vnp_TmnCode = 'G743KDB8'
    //   const vnp_HashSecret = 'BWVOFPBBWWYULDXAERNNSJDCNEBLEJTQ'
    //   const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
    //   const vnp_ReturnUrl = 'http://localhost:3000/payment'
    //   const vnp_Version = '2.1.0'
    //   const vnp_Command = 'pay'
    //   const vnp_Locale = 'vn'
    //   const vnp_CurrCode = 'VND'
    //   const date = new Date()
    //   const createDate = moment(date).format('YYYYMMDDHHmmss')
    //   const vnp_Params = {
    //     vnp_Version,
    //     vnp_Command,
    //     vnp_TmnCode,
    //     vnp_Locale,
    //     vnp_CurrCode,
    //     vnp_TxnRef,
    //     vnp_OrderInfo,
    //     vnp_OrderType,
    //     vnp_Amount,
    //     vnp_ReturnUrl,
    //     vnp_IpAddr,
    //     vnp_CreateDate
    //   }
    //   const pass = 'Son12042002'
    //   const vnp_BankCode = 'NCB'
    //   const account = 'NGUYEN VAN A'
    //   const bankCode = '9704198526191432198'
    //   const releaseDate = '07/15'
    //   const OTP = '123456'
    return payload
  }
}
