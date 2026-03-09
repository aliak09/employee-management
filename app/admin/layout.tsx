"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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
        <div className= "flex">
        <Sidebar/>  
        <main className="flex-1">
            <Navbar/>
            <div className="p-10">
                {children}
            </div>
        </main>
        </div>
  )
}