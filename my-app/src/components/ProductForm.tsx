"use client";

import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import instance from "@/lib/instance";
import { useSession } from "next-auth/react";
import { IImage, IProduct } from "@/types/products";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().positive(),
  description: z.string(),
  images: z.object({ url: z.string() }).array(),
});

export default function ProductForm({ initData }: { initData?: IProduct }) {
  const router = useRouter();
  const { data } = useSession();

  const defaultValues = initData
    ? {
        name: initData.name,
        price: Number(initData.price.toString()),
        quantity: Number(initData.quantity.toString()),
        description: initData.description,
        images: (initData.images as IImage[]).map((item) => ({
          url: item.url,
        })),
      }
    : {
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        images: [],
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initData) {
        await instance.put(`/api/product/${initData._id}`, {
          ...values,
          images: values.images.map((item) => item.url),
        });
      } else {
        await instance.post("/api/product/create", {
          ...values,
          images: values.images.map((item) => item.url),
          user_id: (data?.user as any).id,
        });
      }
      router.refresh();
      router.push("/products/manage");
      toast.success(`${initData ? "Cập nhật" : "Tạo"} sản phẩm thành công`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Hình ảnh</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value.map((image) => image.url)}
                  disabled={isSubmitting}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((current) => current.url !== url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-2 md:grid-cols-2 md:gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Tên sản phẩm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="9.99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={isSubmitting}
                  placeholder="9.99"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  className="resize-none"
                  placeholder="Mô tả sản phẩm"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} className="ml-auto" type="submit">
          {initData ? "Cập nhật" : "Tạo"}
        </Button>
      </form>
    </Form>
  );
}
