import { auth } from "@/prisma/auth";
import { Ticket } from "lucide-react";
import Logout from "./logout";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <div className="py-4 px-8 border-b shadow flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl flex items-center gap-3">
            <Ticket />
            Evently
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex items-center justify-center bg-pink-500 text-white">
            {user?.name?.slice(0, 1).toUpperCase()}
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
}
