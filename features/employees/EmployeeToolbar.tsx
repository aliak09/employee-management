import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

interface EmployeeToolbarProps{
    search:string
    setSearch: (value:string) => void
    setPage: (value: number) => void
}

export default function EmployeeToolbar({
    search,
    setSearch,
    setPage
}:EmployeeToolbarProps) {
  return (
    <div className="flex items-center justify-between">  
        
        <Input
          placeholder="Search Employee"
          className="max-w-sm shadow-none"
          value={search}
          onChange={(e)=>{
          setSearch(e.target.value)
          setPage(1)}}
        />

        <Link href="/admin/employee/add">
          
          <Button variant="outline" className='shadow-none'>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        
        </Link>
    </div>
  )
}
