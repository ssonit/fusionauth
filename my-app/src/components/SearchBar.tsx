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

type Product = {
  id: string;
  name: string;
};

export default function SearchBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const debouncedValue = useDebounce<string>(searchInput, 800);

  useEffect(() => {
    async function fetchData() {
      //   try {
      //     if (debouncedValue) {
      //       const data = await axios.get<{ data: Product[] }>(`/api/products/search?search=${debouncedValue}`);
      //       setProducts(data.data.data);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
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
      {products.length > 0 && searchInput && (
        <div className="absolute left-0 top-full w-full">
          <ScrollArea>
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                {products.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                <CommandGroup heading="Kết quả tìm kiếm">
                  {products.map((item) => (
                    <CommandItem
                      className="cursor-pointer p-0 hover:bg-accent hover:text-accent-foreground"
                      key={item.id}
                    >
                      <div
                        onClick={() => {
                          setSearchInput("");
                          setProducts([]);
                          router.push(`/${item.id}`);
                        }}
                        className="w-full px-2 py-1.5"
                      >
                        {item.name}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
