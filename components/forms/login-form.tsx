"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Message from "../ui/message";

interface Message {
  error: boolean;
  message: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Message | null>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({
        error: true,
        message: "All fields are required!",
      });
      return;
    }
    try {
      setLoading(true);
      setMessage(null);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        console.log(response);
        setMessage({
          error: true,
          message: "Wrong Credentials",
        });
        return;
      }

      setMessage({
        error: false,
        message: "Login successful! Redirecting...",
      });
      router.replace("/");
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
          Login to your account
        </h1>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input
            placeholder="example@gmail.com"
            id="email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Password *</Label>
          <Input
            placeholder=""
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={loading} className="w-full">
          Login
          <ArrowRight />
        </Button>
        {message && <Message {...message} />}
        <Link
          className="text-xs hover:underline underline-offset-8 duration-300 hover:text-blue-500"
          href={"/register"}
        >
          Not a user? create a account now
        </Link>
      </form>
    </div>
  );
}
