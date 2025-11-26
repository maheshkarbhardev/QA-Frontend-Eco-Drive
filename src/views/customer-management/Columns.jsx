import React from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { ArrowUpDown } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { deleteCustomer, getAllCustomers } from "../../features/customerManagement/customerSlice";

export const useCustomerColumns = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    { accessorKey: "name", header: "Name" },
    { accessorKey: "mobile", header: "Contact No." },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status" },

    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex space-x-2">

            {/* EDIT BUTTON */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/edit-customer/${id}`)}
                >
                  <MdOutlineEdit />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            {/* DELETE BUTTON – FIXED NESTED BUTTON ERROR */}
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <HiOutlineTrash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>

                <TooltipContent>Delete</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are You Sure You Want To Delete This Customer?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/* WORKING DELETE BUTTON */}
                  <AlertDialogAction
                    onClick={async () => {
                      try {
                        await dispatch(deleteCustomer(id)).unwrap();
                        toast.success("Customer deleted successfully!");

                        // refresh list
                        setTimeout(()=>{
                          dispatch(getAllCustomers());
                        },300)
                      } catch (error) {
                        toast.error("Delete failed",error);
                      }
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        );
      },
    },
  ];
};
