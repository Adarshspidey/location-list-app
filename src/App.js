import "./App.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo, useState } from "react";
import Popup from "./Components/Popup";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "nickName", //access nested data with dot notation
        header: "Nick Name",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 200,
      },
      {
        accessorKey: "time",
        header: "Time",
        size: 150,
      },
      {
        accessorKey: "positions.lat",
        header: "Latitude",
        size: 150,
      },
      {
        accessorKey: "positions.lng",
        header: "Longitude",
        size: 150,
      },
    ],
    []
  );

  useEffect(() => {
    console.log(formData, "Form Data");
  }, [formData]);

  const handleDelete = (id) => {
    setFormData((prevFormData) =>
      prevFormData.filter((item) => item.id !== id)
    );
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDelete(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: formData,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <>
      <div className="top-button-wrapper">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New
        </button>
      </div>
      <MaterialReactTable table={table} />
      {isOpen && (
        <Popup
          setIsOpen={setIsOpen}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </>
  );
}

export default App;
