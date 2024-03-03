"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import CellActionImage from "./cell-action-image";

export type ProductColumn = {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "actions-image",
    cell: ({ row }) => <CellActionImage data={row.original}></CellActionImage>,
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "price",
    header: "Giá",
  },
  {
    accessorKey: "quantity",
    header: "Số lượng còn lại",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}></CellAction>,
  },
];
