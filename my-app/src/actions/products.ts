import { LIMIT_PRODUCT } from "@/constants/utils";
import { prisma } from "@/lib/prisma";
import { SortDirection } from "@/types/products";

export const getProducts = async (
  sort: Record<string, SortDirection> = {
    createdAt: "desc",
  }
) => {
  const data = await prisma.product.findMany({
    include: {
      images: true,
    },
    orderBy: {
      ...sort,
    },
  });

  return data;
};

export const getProductId = async ({ productId }: { productId: string }) => {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  return data;
};

export const getManageProducts = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: string;
  limit: string;
}) => {
  const { userId } = auth();
  if (!userId)
    return {
      data: [],
      total: 0,
    };
  const page_size = limit ? parseInt(limit) : LIMIT_PRODUCT;
  const skip = parseInt(page) > 0 ? (parseInt(page) - 1) * page_size : 0;

  const data = await prisma.product.findMany({
    where: {
      userId: userId as string,
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          id: search,
        },
      ],
    },
    take: page_size,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.product.count({
    where: {
      userId: userId as string,
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          id: search,
        },
      ],
    },
  });

  return {
    data,
    total,
  };
};
