import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DataTable ({columns,data}) {
    //DataTable receives: columns: defines what to show in the table.  data: the actual product list.
    const [filtering,setFiltering]=useState(""); //filtering: state for the search box input.

    const navigate=useNavigate();
    const table = useReactTable({
        //useReactTable :- This creates a table instance using the useReactTable hook from @tanstack/react-table.
        data, //This is the array of data (rows) you want to show in your table.
        columns,  //This defines the structure of your table — which columns to display and how.

        state:{
            globalFilter:filtering,  //globalFilter tells React Table what the current search text is (typed by user in the search box).            
        },
        onGlobalFilterChange:setFiltering,  //This tells the table how to update the globalFilter value when user types in the search box.

        getCoreRowModel:getCoreRowModel(),  //Take my data array and convert it into table rows before any sorting, filtering, or pagination.

        getFilteredRowModel:getFilteredRowModel(),  //This enables search functionality.So when you type something in the search bar, React Table checks each row to see if it matches the search text — and only shows matching rows.

        getSortedRowModel:getSortedRowModel(),  //This enables sorting when user clicks on column headers.

        getPaginationRowModel:getPaginationRowModel(), //This enables pagination.It divides your data into pages (e.g., 10 items per page).
    });

  return (
    <div>
        {/* Search Box */}
        <div className='flex items-center justify-between py-4'>
            <Input
            placeholder="Search Customer"
            value={filtering ?? ""}
            onChange={(e)=> setFiltering(e.target.value)}
            className="max-w-sm"
            />

            <Button onClick={()=> navigate("/add-customer")}>
                Add Customer
            </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
        <Table>
          <TableHeader >
            {
              table.getHeaderGroups().map((headerGroup)=>(
                <TableRow key={headerGroup.id}>
                  {
                    headerGroup.headers.map((header)=>(
                      <TableHead key={header.id} className="text-center">
                          {
                            header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext())
                          }
                      </TableHead>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableHeader>

          <TableBody className="text-center">
            {
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) =>(
                  <TableRow key={row.id}>
                    {
                      row.getVisibleCells().map((cell) =>(
                        <TableCell key={cell.id}>
                          {
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              )
              :(
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No Results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" onClick={()=> table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>

            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
      </div>

    </div>
  )
}

