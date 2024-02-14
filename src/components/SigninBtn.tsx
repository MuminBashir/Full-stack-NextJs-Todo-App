"use client";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import { userAtom } from "@/store/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const SigninBtn = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    push("/login");
  };

  const handleSignin = () => {
    push("/signin");
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      const data = await response.json();
      
      setLoading(false);
      if (data.success) {
        setUser({ success: false, user: {} });
        await new Promise(resolve=>{
          setTimeout(()=>{
            resolve(null)
          },1)
        })
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
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/me")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: err.message,
        });
      });
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return user.success ? (
    <Button className="w-full md:w-18" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <>
        <Button className="w-full md:w-18" onClick={handleSignin}>
          Signin
        </Button>
        <Button className="w-full md:w-18" onClick={handleLogin}>
          Login
        </Button>
    </>
  );
};

export default SigninBtn;
