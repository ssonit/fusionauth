"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import CheckoutFormInfo from "@/components/CheckoutFormInfo";
import CheckoutFormPayment from "@/components/CheckoutFormPayment";
import CheckoutFormSummary from "@/components/CheckoutFormSummary";
import { Form } from "@/components/ui/form";
import { PaymentType } from "@/constants/enums";
import { formCheckoutSchema } from "@/constants/schema";
import { AppContext } from "@/providers/app-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { User } from "@/types/utils";
import instance from "@/lib/instance";

const formSchema = formCheckoutSchema;

export default function CheckoutClient() {
  const router = useRouter();
  const { data } = useSession();

  const currentUser = data?.user as User;
  const { productOrder } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      info: {
        username: currentUser?.lastName + " " + currentUser?.firstName || "",
        address: "",
        phone: "",
        notes: "",
      },
      payment: {
        type: PaymentType.COD.toString(),
      },
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.payment.type === PaymentType.PAYPAL.toString()) {
        router.push("/payment");
      } else if (values.payment.type === PaymentType.COD.toString()) {
        const res = await instance.post("/api/order/create-many", {
          product_order: productOrder.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
          user_id: currentUser.id,
          username: values.info.username,
          address: values.info.address,
          phone: values.info.phone,
          notes: values.info.notes,
          payment_type: values.payment.type,
        });
        const data = res.data;
        router.refresh();
        toast.success("Đặt hàng thành công");
        //   router.push('/products/order');
        console.log({ values });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="my-6 grid grid-cols-1 items-start gap-3 lg:grid-cols-3">
            <CheckoutFormInfo></CheckoutFormInfo>
            <CheckoutFormPayment></CheckoutFormPayment>
            <CheckoutFormSummary></CheckoutFormSummary>
          </div>
        </form>
      </Form>
    </div>
  );
}
