"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDebounce from "@/hooks/useDebounce";
import instance from "@/lib/instance";
import { IProduct, TProductResponse } from "@/types/products";

export default function SearchBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const debouncedValue = useDebounce<string>(searchInput, 300);

  useEffect(() => {
    async function fetchData() {
      try {
        if (debouncedValue) {
          setIsLoading(true);
          const res = await instance.get<TProductResponse>(
            `/api/product?search=${debouncedValue}`
          );
          setProducts(res.data.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [debouncedValue]);

  return (
    <div className="relative">
      <Input
        className="outline-none placeholder:text-black focus-visible:ring-0 focus-visible:ring-transparent"
        placeholder="Tìm kiếm"
        value={searchInput}
        onChange={handleInputChange}
      ></Input>
      {searchInput && (
        <div className="absolute left-0 top-full w-full">
          <ScrollArea>
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                <CommandGroup heading="Kết quả tìm kiếm">
                  {!isLoading && products.length === 0 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  {!isLoading &&
                    products.length > 0 &&
                    products.map((item) => (
                      <CommandItem
                        className="cursor-pointer p-0 hover:bg-accent hover:text-accent-foreground"
                        key={item._id}
                      >
                        <div
                          onClick={() => {
                            setSearchInput("");
                            setProducts([]);
                            router.push(`/${item._id}`);
                          }}
                          className="w-full px-2 py-1.5"
                        >
                          {item.name}
                        </div>
                      </CommandItem>
                    ))}
                  {isLoading && (
                    <div className="flex items-center py-1.5 justify-center">
                      loading...
                    </div>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
