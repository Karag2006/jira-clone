"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrent();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return <div>Authorized only</div>;
};

export default Home;
