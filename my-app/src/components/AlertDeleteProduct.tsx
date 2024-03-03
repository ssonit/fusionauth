"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { AppContext } from "@/providers/app-provider";
import instance from "@/lib/instance";

export default function AlertDeleteProduct() {
  const router = useRouter();
  const { openAlertDialog, handleCloseAlertDialog, productDelete } =
    useContext(AppContext);
  const handleDeleteProduct = async () => {
    try {
      if (productDelete.id) {
        // const res = await instance.delete(`/api/products/${productDelete.id}`);
        // const data = res.data;
        toast.success("Xóa thành công");
        handleCloseAlertDialog();
        router.refresh();
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Không thể xóa");
      console.log(error);
    }
  };
  return (
    <AlertDialog open={openAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>
            Thao tác này sẽ xóa sản phẩm{" "}
            <span className="font-semibold text-primary">
              {productDelete.name || ""}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCloseAlertDialog()}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteProduct()}>
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
