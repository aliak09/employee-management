import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup,SelectItem } from "@/components/ui/select";
import { Pagination, PaginationContent,PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface EmployeePaginationProp{
    page:number
    totalPages:number
    setPage:(value:number) => void
    setRowsPerPage:(value:number) =>void
}

export default function EmployeePagination({page,totalPages,setPage, setRowsPerPage}:EmployeePaginationProp) {
  return (
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
  )
}
