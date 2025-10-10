// "use client"

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Loading from "@/components/Loading"; 

// export default function Department() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace("/dashboard/viewdepartment");
//   }, []);

//   return <Loading />; 
// }





"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Department() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/viewdepartment");
  }, [router]); // ✅ include router in deps

  return <Loading />;
}