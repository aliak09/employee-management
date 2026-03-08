"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  
const router = useRouter();
const [loading, setLoading]=useState(true);

useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
        router.push("/login-page");
    }else{
        setLoading(false);
    }
},[])

if(loading) return <p>Loading...</p>
return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}