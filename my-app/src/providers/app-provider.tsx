"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { ProductCheckout } from "@/types/products";
import { User } from "@/types/utils";
import { useSession } from "next-auth/react";

type TProductDelete = {
  id?: string;
  name?: string;
};
interface AppContextInterface {
  productOrder: ProductCheckout[];
  setProductOrder: Dispatch<SetStateAction<ProductCheckout[]>>;
  handleOrderProduct: (data: ProductCheckout[]) => void;
  openAlertDialog: boolean;
  handleOpenAlertDialog: () => void;
  handleCloseAlertDialog: () => void;
  productDelete: TProductDelete;
  handleChangeProductDelete: (data: TProductDelete) => void;
  currentUser: User | null;
}

const initialAppContext: AppContextInterface = {
  productOrder:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("order_product") as string)
      : [],
  setProductOrder: () => null,
  handleOrderProduct: () => null,
  openAlertDialog: false,
  handleOpenAlertDialog: () => null,
  handleCloseAlertDialog: () => null,
  productDelete: {},
  handleChangeProductDelete: () => null,
  currentUser: null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useSession();

  const currentUser = useMemo(
    () => (data?.user as User) || initialAppContext.currentUser,
    [data]
  );

  const [productOrder, setProductOrder] = useState<ProductCheckout[]>(
    initialAppContext.productOrder || []
  );

  const [openAlertDialog, setOpenAlertDialog] = useState(
    initialAppContext.openAlertDialog
  );
  const [productDelete, setProductDelete] = useState(
    initialAppContext.productDelete
  );

  const handleOrderProduct = (data: ProductCheckout[]) => {
    setProductOrder(data);
    localStorage.setItem("order_product", JSON.stringify(data));
  };

  const handleOpenAlertDialog = () => {
    setOpenAlertDialog(true);
  };
  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleChangeProductDelete = (data: TProductDelete) => {
    setProductDelete(data);
  };

  return (
    <AppContext.Provider
      value={{
        productOrder,
        setProductOrder,
        handleOrderProduct,
        openAlertDialog,
        handleOpenAlertDialog,
        handleCloseAlertDialog,
        productDelete,
        handleChangeProductDelete,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
