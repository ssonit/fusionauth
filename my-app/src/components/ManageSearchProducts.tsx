"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LIMIT_PRODUCT, createQueryString } from "@/constants/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  search: z.string(),
});

export default function ManageSearchProducts({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.search) {
      router.push(
        `${pathname}?${createQueryString({
          search: values.search,
          page: "1",
          limit: LIMIT_PRODUCT,
        })}`
      );
      return;
    }

    router.push(pathname);
  };

  const onCancel = () => {
    form.reset();
    router.push(pathname);
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Tìm kiếm"
                        className="w-96 outline-none placeholder:text-black focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      ></Input>
                      {field.value && (
                        <Button
                          onClick={onCancel}
                          variant={"ghost"}
                          size={"icon"}
                          type="button"
                          className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        >
                          <Icons.X className="h-4 w-4"></Icons.X>
                        </Button>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"icon"}>
              <Icons.Search className="h-4 w-4"></Icons.Search>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
