import AlertDeleteProduct from "@/components/AlertDeleteProduct";
import CreateProductButton from "@/components/CreateProductButton";
import ManageNavigation from "@/components/ManageNavigation";
import ManageSearchProducts from "@/components/ManageSearchProducts";
import SectionTitle from "@/components/SectionTitle";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/constants/format";
import { columns } from "./columns";

const total = 10;
const page = "1";
export default function AdminManageProductsPage() {
  const data = [
    {
      id: "1",
      name: "Xiaomi",
      price: 10,
      username: "admin",
      createdAt: new Date(),
    },
  ];
  const formattedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price.toString(),
    username: item.username,
    createdAt: formatDate(item.createdAt.toISOString()),
  }));
  return (
    <div className="container">
      <div className="my-4 flex items-center justify-between">
        <SectionTitle
          title={`Sản phẩm (${total})`}
          desc="Quản lý sản phẩm của bạn"
        ></SectionTitle>

        <CreateProductButton></CreateProductButton>
      </div>
      <Separator></Separator>
      <div className="my-4">
        <ManageSearchProducts className="mb-3"></ManageSearchProducts>

        <DataTable columns={columns} data={formattedData}></DataTable>

        <ManageNavigation
          className="my-3"
          currentPage={parseInt(page) || 1}
          total={total}
        ></ManageNavigation>
      </div>
      <AlertDeleteProduct></AlertDeleteProduct>
    </div>
  );
}
