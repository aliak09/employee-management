"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from "next/link"
import api from '@/lib/axios'
import axios from 'axios'


export default function AdminEmployee() {

  const [employees, setEmployees]=useState<any[]>([]);

  useEffect(()=>{
    fetchEmployees();
  },[]);

  const fetchEmployees = async ()=>{
    try{
      
      const res = await api.get("/employees")
      
      setEmployees(res.data.employees);

    }catch(error){

      console.error("Failed to fetch Employees", error);

    }
  };

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
              <TableCell>$700</TableCell>
              <TableCell>IT Dept</TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Leaves</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
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
            <Select defaultValue="25">
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          </div>
      </CardFooter>
    </Card>
    
    </div>
  )
}
