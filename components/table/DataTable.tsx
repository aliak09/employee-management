"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

interface Column {
    header: string
    accessor: string
    className?: string
    cell?: (row: any, index:number) => React.ReactNode
}

interface DataTableProps {
    columns: Column[]
    data: any[]
}

export default function DataTable({columns, data}:DataTableProps) {

  return (
    <Table>
        <TableHeader>
            <TableRow>
                {columns.map((col)=>(
                    <TableHead key={col.accessor} className={col.className}>
                        {col.header}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.length > 0 ? (
                data.map((row, index)=>(
                    <TableRow key={index}>
                        {columns.map((col)=>(
                            <TableCell key={col.accessor} className={col.className}>
                                {col.cell ? col.cell(row, index) : row[col.accessor]}
                            </TableCell>
                        ))}
                    </TableRow>
                    ))
                ):( 
                <TableRow>
                        <TableCell
                        colSpan={columns.length}
                        className="text-center py-6 text-gray-500"
                        >
                        No records found
                        </TableCell>
                </TableRow>
        )}
        </TableBody>
    </Table> 
  )
}
