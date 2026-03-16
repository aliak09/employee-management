import { useState } from "react";

export default function useTable(){
    
    const [page, setPage]=useState<number>(1);
    const [rowsPerPage, setRowsPerPage]= useState<number>(5);
    const [search, setSearch] =useState<string>("");

    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        search,
        setSearch
    };
}