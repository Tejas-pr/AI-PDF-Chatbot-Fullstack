"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  // USER HOOOK
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);
  const CheckUser = async () => {
    const result = await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <Link href="/dashboard">
      <Button>GET STARTED</Button>
      </Link>
      <UserButton />
    </div>
  );
}
