"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { ProductColumn } from "./columns";

export default function CellAction({ data }: { data: ProductColumn }) {
  const router = useRouter();
  //   const { handleOpenAlertDialog, handleChangeProductDelete } = useContext(AppContext);

  const { id } = data;

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Đã lưu");
  };

  const onDelete = () => {
    // handleOpenAlertDialog();
    // handleChangeProductDelete({ id: data.id, name: data.name });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Icons.MoreHorizontal className="h-4 w-4"></Icons.MoreHorizontal>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onCopy(id)}>
            <Icons.Copy className="mr-2 h-4 w-4"></Icons.Copy>
            <span>Copy Link</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/products/edit/${id}`)}>
            <Icons.Edit className="mr-2 h-4 w-4"></Icons.Edit>
            <span>Cập nhật</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete()}>
            <Icons.Trash className="mr-2 h-4 w-4"></Icons.Trash>
            <span>Xóa</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
