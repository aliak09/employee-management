"use client"
import DataTable from '@/components/data-table/DataTable'
import { useEffect, useState } from 'react'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from "next/link"
import api from '@/lib/axios'
import EmployeeToolbar from './EmployeeToolbar'
import EmployeePagination from './EmployeePagination'

export default function EmployeeTable() {
    
    const [employees, setEmployees]=useState<any[]>([]);
    const [page, setPage]=useState<number>(1);
    const [totalPages, setTotalPages]=useState<number>(1);
    const [rowsPerPage, setRowsPerPage]= useState<number>(5);
    const [search, setSearch] =useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    
    const columns = [
    {
      header: "Sr No",
      accessor: "serial",
      cell: (_row: any, index?: number) => (page - 1) * rowsPerPage + ((index ?? 0) + 1)
    },
    {
      header: "Name",
      accessor: "name"
    },
    {
      header: "Rank",
      accessor: "role"
    },
    {
      header: "Salary",
      accessor: "salary"
    },
    {
      header: "Department",
      accessor: "department"
    },
    {
      header: "Actions",
      accessor: "actions",
      className: "text-right",
      cell: (row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
    
          <DropdownMenuContent align="end">
            <Link href={`/admin/employee/view/${row._id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
    
            <Link href={`/admin/employee/edit/${row._id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
    
            <DropdownMenuItem>Leaves</DropdownMenuItem>
    
            <DropdownMenuSeparator />
    
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </DropdownMenuItem>
    
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    ]
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        
        return () => clearTimeout(timer);
    }, [search]);
    
  
    const fetchEmployees = async (pageNumber:number, limit = rowsPerPage)=>{
    try{

      const res = await api.get(`/employees?page=${pageNumber}&limit=${limit}&search=${debouncedSearch}`);
      
      setEmployees(res.data.employees);
      setPage(Number(res.data.pagination.page) || 1);
      setTotalPages(Number(res.data.pagination.totalPages) || 1);

    }catch(error){

      console.error("Failed to fetch Employees", error);

    }
  };
  
    useEffect(()=>{
        fetchEmployees(page, rowsPerPage);
    },[page, rowsPerPage, debouncedSearch]);

    const handleDelete= async(id: string)=>{
    
        const confirmDelete = confirm("Are you sure you want to delete this employee?");
        if(!confirmDelete) return;
        try{
        await api.delete(`/employees/${id}`);
        alert("Employee deleted successfully");
        fetchEmployees(page);
        }catch(error:any){
        alert(error.response?.data?.message);
        }
    }
  return (
    <div>

        <div className='flex justify-center items-center mb-4 font-semibold'>
            <div>
                Manage Employees
            </div>
        </div>

        <Card className='shadow-none p-8'>
        
        <CardHeader className='p-0'>
                <EmployeeToolbar
                search={search}
                setSearch={setSearch}
                setPage={setPage}
                />
        </CardHeader>

        <Card className='p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'>
            <CardContent>
            <DataTable columns={columns} data={employees} />
            </CardContent>
        </Card>
        
        <CardFooter className='flex justify-end p-0'>
            <EmployeePagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            />
        </CardFooter>
        
        </Card>
  </div>
    
  )
}
