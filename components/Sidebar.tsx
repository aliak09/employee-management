"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
    LayoutDashboard,
    User, 
    Landmark,
    CalendarDays, 
    Banknote, 
    Settings, 
    ArrowLeftToLine, 
    ArrowRightFromLine
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const navBtns= [
    {
        name: "Dashboard",
        icon: <LayoutDashboard/>,
        path: "/admin/dashboard"
    },
    {
        name: "Employee",
        icon: <User/>,
        path: "/admin/employee"
    },
    {
        name: "Department",
        icon: <Landmark/>,
        path: "/admin/department"
    },
    {
        name: "Leave",
        icon: <CalendarDays/>,
        path: "/admin/leave"
    },
    {
        name: "Salary",
        icon: <Banknote/>,
        path: "/admin/salary"
    },
    {
        name: "Settings",
        icon: <Settings/>,
        path: "/admin/settings"
    }
];

export default function Sidebar() {
   
    const [collapsed, setCollapsed] = useState(false);
    
    const pathname = usePathname();
 
return (
    <div className={`min-h-screen border-r p-4 transition-all duration-300 ${collapsed? "w-[70]" : "w-[220]"}`}>

        <div className="mb-6 flex justify-end transition-all duration-300">

            <Button variant="outline" size="sm" onClick={()=> setCollapsed(!collapsed)}>
            
                    {collapsed? <ArrowRightFromLine/>:<ArrowLeftToLine/>}
            
            </Button>

        </div>

        <TooltipProvider>

            <div className="flex gap-4 flex-col">

                {navBtns.map((btn, index)=>{

                const isActive = pathname.startsWith(btn.path)

                return(

                    <Tooltip key={index}>
                    
                        <TooltipTrigger asChild>

                            <Link href={btn.path}>
                    
                                <Button variant={isActive ? "default" : "outline"} size="lg" className={`w-full flex items-center ${collapsed ? "justify-center": "justify-start gap-3"}`}>
                                    
                                    {btn.icon}
                                    
                                    {!collapsed && btn.name}

                                </Button>

                            </Link>

                        </TooltipTrigger>

                        {collapsed && (

                            <TooltipContent side="right" className="opacity-50">

                                {btn.name}

                            </TooltipContent>

                        )}

                    </Tooltip>
                )

})}
                
                </div>
            
            </TooltipProvider>

    </div>
  )
}
