import { getProducts } from "@/actions/products";
import AlertDeleteProduct from "@/components/AlertDeleteProduct";
import CreateProductButton from "@/components/CreateProductButton";
import ManageNavigation from "@/components/ManageNavigation";
import ManageSearchProducts from "@/components/ManageSearchProducts";
import SectionTitle from "@/components/SectionTitle";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/constants/format";
import { columns } from "./columns";
import { User } from "@/types/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IImage } from "@/types/products";

export default async function ManageProducts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;
  const search = (searchParams?.search as string) || "";
  const page = searchParams?.page as string;
  const limit = searchParams?.limit as string;

  const {
    data: { data, total },
  } = await getProducts({
    page: Number(page),
    limit: Number(limit),
    search,
    user_id: currentUser?.id,
  });

  const formattedData = data.map((item) => ({
    id: item._id,
    name: item.name,
    image: (item.images[0] as IImage).url,
    price: item.price.toString(),
    quantity: item.quantity.toString(),
    createdAt: formatDate(item.createdAt),
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
