"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userAtom } from "@/store/atoms";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const { toast } = useToast();

  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        setUser({ success: data.success, user: data.user });
        toast({
          variant: "success",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: data.message,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
        toast({
          variant: "destructive",
          description: "Some internal error occured",
        });
      }
    }
  };

  if (user.success) {
    redirect("/");
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="container mt-20">
      <Card className="w-full md:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              className="mb-4"
              type="email"
              placeholder="Email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              className="mb-4"
              type="password"
              placeholder="Password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
