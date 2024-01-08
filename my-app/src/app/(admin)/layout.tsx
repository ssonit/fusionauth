import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROLE } from "@/utils/constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any).registrations[0].roles[0];

  const UI = {
    [ROLE.ADMIN]: <div>{children}</div>,
    [ROLE.USER]: (
      <div className="h-full w-full flex items-center justify-center">
        <button className="border-2 border-cyan-300 p-2">Return Home</button>
      </div>
    ),
  };

  return <div className="min-h-screen">{UI[role]}</div>;
}
