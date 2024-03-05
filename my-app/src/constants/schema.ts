import * as z from "zod";
import { PaymentType } from "./enums";

export const formCheckoutSchema = z.object({
  info: z.object({
    username: z.string().min(1, "Hãy nhập họ tên"),
    phone: z.string().min(1, "Hãy nhập số điện thoại"),
    address: z.string().min(1, "Hãy nhập địa chỉ"),
    notes: z.string(),
  }),
  payment: z.object({
    type: z.enum([PaymentType.COD.toString(), PaymentType.PAYPAL.toString()]),
  }),
});
