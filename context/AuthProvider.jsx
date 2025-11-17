"use client";

import React from "react";
import { useUser, SignIn } from "@clerk/nextjs";

const AuthWrapper = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base-300">
        <SignIn 
        appearance={{
            elements:{
                footer:"hidden",
            }
        }} 
        afterSignInUrl="/dashboard"
        afterSignOutUrl="/"
        routing="hash" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;