import { Crown, Home, Menu, UserRound } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SigninBtn from "./SigninBtn";
import Link from "next/link";

const MenuDropdown = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu size={36} color="#000000" strokeWidth={2.5} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <Avatar className="mr-2">
                <AvatarImage src="./favicon.ico" />
                <AvatarFallback>Todo</AvatarFallback>
              </Avatar>
              <div className="text-lg font-semibold">Todo App</div>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <div className="mt-10 w-full">
              <ul className="flex flex-col justify-center items-center gap-3 h">
                <li className="w-full">
                  <Link
                    href="/"
                    className="px-3 flex items-center justify-center gap-1 py-2 hover:bg-primary/90 hover:text-white transition-colors cursor-pointer rounded"
                  >
                    <SheetClose asChild>
                      <div className="w-full">
                        <div className="flex gap-1 items-center justify-center">
                          <Home size={20} strokeWidth={1.5} />
                          <span>Home</span>
                        </div>
                      </div>
                    </SheetClose>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/profile"
                    className="px-3 flex items-center justify-center gap-1 py-2 hover:bg-primary/90 hover:text-white transition-colors cursor-pointer rounded"
                  >
                    <SheetClose asChild>
                      <div className="w-full">
                        <div className="flex gap-1 items-center justify-center">
                          <UserRound size={20} strokeWidth={1.5} />
                          <span>Profile</span>
                        </div>
                      </div>
                    </SheetClose>
                  </Link>
                </li>
                <SheetClose asChild>
                  <div className="flex gap-2">
                    <SigninBtn />
                  </div>
                </SheetClose>
              </ul>
            </div>
          </SheetDescription>
          <SheetFooter className="fixed bottom-2 left-2">
            <p className="text-sm flex">
              Developed by <Crown size={20} color="	#f97316" strokeWidth={1.5} />{" "}
              <a
                href="https://github.com/MuminBashir"
                target="_blank"
                className="hover:text-[#f97316]"
              >
                Mumin Bashir
              </a>
            </p>
            <p className="text-sm">&copy; All Rights Reserved</p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuDropdown;
