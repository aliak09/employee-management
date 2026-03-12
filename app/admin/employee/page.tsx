"use client"
import React, { useEffect, useState } from 'react'
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { MoreHorizontalIcon, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Field, FieldLabel } from "@/components/ui/field"
import {Pagination,PaginationContent,PaginationItem,PaginationNext,PaginationPrevious} from "@/components/ui/pagination"
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from "next/link"
import api from '@/lib/axios'

export default function AdminEmployee() {

  const [employees, setEmployees]=useState<any[]>([]);
  const [page, setPage]=useState<number>(1);
  const [totalPages, setTotalPages]=useState<number>(1);
  const [rowsPerPage, setRowsPerPage]= useState<number>(5);

  const fetchEmployees = async (pageNumber:number, limit = rowsPerPage)=>{
    try{

      const res = await api.get(`/employees?page=${pageNumber}&limit=${limit}`);
      
      setEmployees(res.data.employees);
      setPage(Number(res.data.pagination.page) || 1);
      setTotalPages(Number(res.data.pagination.totalPages) || 1);

    }catch(error){

      console.error("Failed to fetch Employees", error);

    }
  };
  
  useEffect(()=>{
    fetchEmployees(page, rowsPerPage);
  },[page, rowsPerPage]);

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
    <div>Manage Employees</div>
    </div>
    <Card className='shadow-none p-8'>
      <CardHeader className='p-0'>
        <div className="flex items-center justify-between">
        
        <Input
          placeholder="Search employee..."
          className="max-w-sm shadow-none"
        />
        <Link href="/admin/employee/add">
          <Button variant="outline" className='shadow-none'>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>


      </CardHeader>
      <Card className='shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Sr No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp, index)=>
            <TableRow key={emp._id}>
              <TableCell>{index +1}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.salary}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/admin/employee/view/${emp._id}`}>
                      <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>
                    <Link href={`/admin/employee/edit/${emp._id}`}>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Leaves</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={()=>handleDelete(emp._id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
        </CardContent>
      </Card>
      <CardFooter className='flex justify-end p-0'>
          <div className="flex items-center justify-between gap-4">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
            <Select 
            defaultValue="5"
            onValueChange={(value)=>{
              setRowsPerPage(Number(value));
              setPage(1);
            }}
            >
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                
                <PaginationPrevious
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />

              </PaginationItem>
              <PaginationItem>
                
                <PaginationNext 
                        href="#"
                        onClick={() => {
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />

              </PaginationItem>
            </PaginationContent>
          </Pagination>
          </div>
      </CardFooter>
    </Card>
  </div>
    
  )
}
