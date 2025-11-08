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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Columns = [
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

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "mobile",
    header: "Contact No.",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline " size="sm">
                <MdOutlineEdit />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Edit</TooltipContent>
          </Tooltip>

          {/* Delete Button with Confirmation */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="destructive" size="sm">
                    <HiOutlineTrash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are You Sure You Want To Delete This Customer?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. The customer will be permanently
                  removed from your list.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
