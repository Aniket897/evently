"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    signOut({
      redirectTo: "/login",
    }).finally(() => {
      setLoading(false);
    });
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
