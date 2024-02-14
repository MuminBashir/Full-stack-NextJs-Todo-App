"use client";

import { ObjectId } from "mongoose";
import { RecoilRoot, atom } from "recoil";

interface userAtomType {
  success: boolean;
  user: {
    _id?: ObjectId;
    name?: string;
    email?: string;
    todos?: { title: string; description: string; completed: boolean }[];
  };
}

export const userAtom = atom<userAtomType>({
  key: "user-state",
  default: {
    success: false,
    user: {},
  },
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
