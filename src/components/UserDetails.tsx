"use client";

import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atoms";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const UserDetails = () => {
  const { toast } = useToast();
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const handleDeleteProfile = async () => {
    try {
      setDeleteFlag(true);
      const response = await fetch("/api/auth/deleteuser", {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setUser({ success: false, user: {} });
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

  if (!user.success) {
    if (!deleteFlag) {
      toast({ variant: "destructive", description: "Please Login first!" });
      return redirect("/login");
    } else {
      toast({
        variant: "success",
        description: "Profile deleted successfully!",
      });
      return redirect("/login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <CircleUserRound size={36} color="#000000" strokeWidth={1.75} />
      <div className="mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
        <span className="text-muted-foreground">Name: </span> {user.user.name}
      </div>
      <div className="mt-3 scroll-m-20 text-2xl font-semibold tracking-tight">
        <span className="text-muted-foreground">Email: </span> {user.user.email}
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="mt-5">
            Delete Profile
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProfile}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserDetails;
