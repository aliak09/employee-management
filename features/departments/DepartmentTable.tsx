"use client"
import DataTable from '@/components/table/DataTable'
import TableToolbar from '@/components/table/TableToolbar'
import TablePagination from '@/components/table/TablePagination'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoreHorizontalIcon } from 'lucide-react'


export default function DepartmentTable() {

  const columns = [
    {
      header: "Sr No",
      accessor: "serial",
      // cell: (_row: any, index?: number) => (page - 1) * rowsPerPage + ((index ?? 0) + 1)
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
              // onClick={() => handleDelete(row._id)}
            >
              Delete
            </DropdownMenuItem>
    
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    ]

  return (
    <div>
      <div className='flex justify-center items-center mb-4 font-semibold'>
        Manage Departments
      </div>
      <Card className='shadow-none p-8'>
        <CardHeader className='p-0'>
          <TableToolbar
          search={""}
          // setSearch={}
          // setPage={}
          addLink=''
          addLabel='Add Department'
          />
        </CardHeader>

        <Card className='p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'>
            <CardContent>
                  <DataTable
                  columns={columns}
                  data={-1}
                  />
            </CardContent>
        </Card>

        <CardFooter className='flex justify-end p-0'>
          <TablePagination
          page={1}
          // setPage={}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
