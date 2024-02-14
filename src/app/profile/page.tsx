import UserDetails from "@/components/UserDetails";
import React from "react";

const page = () => {
  return (
    <div className="container mt-10 flex flex-col justify-center">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Your Profile
      </h1>
      <div className="mt-8 px-5">
        <UserDetails />
      </div>
    </div>
  );
};

export default page;
