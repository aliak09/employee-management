"use client"
import { useState, useEffect } from 'react'
import DataTable from '@/components/table/DataTable'
import TableToolbar from '@/components/table/TableToolbar'
import TablePagination from '@/components/table/TablePagination'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoreHorizontalIcon } from 'lucide-react'
import useTable from '@/hooks/useTable'
import api from '@/lib/axios'
import useDebounce from '@/hooks/useDebounce'

export default function DepartmentTable() {

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
      header: "Description",
      accessor: "description"
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
            <Link href={`/admin/department/view/${row._id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
    
            <Link href={`/admin/department/edit/${row._id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
    
    
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

  const [departments, setDepartments]=useState<any[]>([]);
  
  const [totalPages, setTotalPages]=useState<number>(1);
  
  const {page, setPage, rowsPerPage, setRowsPerPage, search, setSearch} = useTable();
  
  const debouncedSearch = useDebounce(search, 500);
  
  const fetchDepartments = async (pageNumber:number, limit = rowsPerPage)=>{
    try{

        
      const res = await api.get(`/department?page=${pageNumber}&limit=${limit}&search=${debouncedSearch}`);
      
      setDepartments(res.data.departments);
      setPage(Number(res.data.pagination.page) || 1);
      setTotalPages(Number(res.data.pagination.totalPages) || 1);

    }catch(error){

      console.error("Failed to fetch Employees", error);

    }
  };

  useEffect(()=>{
          fetchDepartments(page, rowsPerPage);
      },[page, rowsPerPage, debouncedSearch]);

    const handleDelete= async(id: string)=>{
    
        const confirmDelete = confirm("Are you sure you want to delete this employee?");
        if(!confirmDelete) return;
        try{
        await api.delete(`/department/${id}`);
        alert("Employee deleted successfully");
        fetchDepartments(page);
        }catch(error:any){
        alert(error.response?.data?.message);
        }
    }
      
    return (
    <div>
      <div className='flex justify-center items-center mb-4 font-semibold'>
        Manage Departments
      </div>
      <Card className='shadow-none p-8'>
        <CardHeader className='p-0'>
          <TableToolbar
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          addLink='/admin/department/add'
          addLabel='Add Department'
          />
        </CardHeader>

        <Card className='p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'>
            <CardContent>
                  <DataTable
                  columns={columns}
                  data={departments}
                  />
            </CardContent>
        </Card>

        <CardFooter className='flex justify-end p-0'>
          <TablePagination
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
