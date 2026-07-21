"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CVDefault() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);

  return null;
}
