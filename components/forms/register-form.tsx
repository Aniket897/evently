"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Message from "@/components/ui/message";

interface Message {
  error: boolean;
  message: string;
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Message | null>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage({
        error: true,
        message: "All fields are required!",
      });
      return;
    }
    try {
      setLoading(true);
      setMessage(null);
      const response = await axios.post("/api/register", {
        email,
        password,
        name,
      });
      console.log(response);
      setMessage(response.data);
    } catch (error: any) {
      console.log(error);
      setMessage(
        error?.response?.data || {
          error: true,
          message: "Something went wrong",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] max-w-[90vw] border rounded-md p-8 space-y-8 border-t-green-500 border-t-4"
      >
        <h1 className="font-bold text-xl capitalize underline underline-offset-8">
          register form
        </h1>
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            placeholder="John doe"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input
            placeholder="example@gmail.com"
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Password *</Label>
          <Input
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={loading} className="w-full">
          Register
          <ArrowRight />
        </Button>
        {message && <Message {...message} />}
        <Link
          className="text-xs hover:underline underline-offset-8 duration-300 hover:text-blue-500"
          href={"/login"}
        >
          Already a user? login now
        </Link>
      </form>
    </div>
  );
}
