"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userAtom } from "@/store/atoms";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const { toast } = useToast();

  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          body: JSON.stringify({ name: username, email, password }),
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
        setLoading(false);
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
    } else {
      toast({
        variant: "destructive",
        description: "Password and Confirm Password don't match",
      });
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
          <CardTitle>Signin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              className="mb-4"
              placeholder="Username"
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
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
            <Input
              className="mb-4"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <Button type="submit">Signin</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
