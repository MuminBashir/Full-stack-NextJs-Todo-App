import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SigninBtn from "./SigninBtn";
import Link from "next/link";
import { Home, UserRound } from "lucide-react";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between px-5 py-4 bg-slate-100 sticky top-0">
      <div className="flex items-center cursor-pointer">
        <Avatar className="mr-2">
          <AvatarImage src="./favicon.ico" />
          <AvatarFallback>Todo</AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">Todo App</div>
      </div>
      <div className="hidden md:block">
        <ul className="flex items-center gap-6 h">
          <li>
            <Link
              href="/"
              className="px-3 flex items-center gap-1 py-2 hover:bg-primary/90 hover:text-white transition-colors cursor-pointer rounded"
            >
              <Home size={20} strokeWidth={1.5} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="px-3 flex items-center gap-1 py-2 hover:bg-primary/90 hover:text-white transition-colors cursor-pointer rounded"
            >
              <UserRound size={20} strokeWidth={1.5} /> <span>Profile</span>
            </Link>
          </li>
          <SigninBtn />
        </ul>
      </div>
      <div className="block md:hidden">
        <MenuDropdown />
      </div>
    </div>
  );
};

export default Navbar;
