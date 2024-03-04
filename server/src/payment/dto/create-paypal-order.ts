export class AmountPurchaseDto {
  currency_code: string

  value: string
}
export class PurchaseUnitRequestDto {
  reference_id: string

  amount: AmountPurchaseDto
}

export class CreatePaypalOrder {
  intent?: 'CAPTURE' | 'AUTHORIZE'

  purchase_units?: PurchaseUnitRequestDto[]
}

export class CapturePaypalOrder {
  order_id: string
}
