import { prisma } from "@/lib/prisma";

export const getColors = async () => {
  const data = await prisma.color.findMany();
  return data;
};
