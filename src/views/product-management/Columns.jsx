import React from "react";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  deleteProduct,
  getAllProducts,
} from "../../features/productManagement/productSlice";
import { toast } from "sonner";

export const Columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "usage_unit",
    header: "Usage Unit",
  },
  {
    accessorKey: "hsn",
    header: "HSN Code",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.original.status === "Active"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleDelete = async () => {
        try {
          await dispatch(deleteProduct(product.id))
            .unwrap()
            .then(() => dispatch(getAllProducts()));
          toast.success("Product deleted successfully!");
          // Refresh product list without page reload
        } catch (error) {
          console.error("Delete error:", error);
          toast.error("Failed to delete product.");
        }
      };

      return (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/edit-product/${product.id}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          {/* Delete Button with Confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this product?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The product will be permanently
                  removed from your list.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
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
