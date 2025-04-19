"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    toast.promise(
      signOut({
        redirectTo: "/login",
      }).finally(() => {
        setLoading(false);
      }),
      {
        loading: "Signing out...",
        success: "Signed out successfully!",
        error: "Something went wrong. Please try again.",
      }
    );
  };

  return (
    <Button
      disabled={loading}
      onClick={handleLogout}
      className="hover:text-red-500"
      variant={"ghost"}
    >
      logout
      <LogOut />
    </Button>
  );
}
