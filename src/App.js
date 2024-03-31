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
  const [mode, setMode] = useState("");
  const[editMarkerData,setEditMarkerData]=useState()
  const columns = useMemo(
    () => [
      {
        accessorKey: "nickName", 
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
          <IconButton
            onClick={() => {
              setMode("edit");
              setEditMarkerData(row.original);
              setIsOpen(true);
            }}
          >
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
        className="button-add-new"
          onClick={() => {
            setIsOpen(true);
            setMode("add");
          }}
        >
          Add New
        </button>
      </div>
      <MaterialReactTable table={table} />
      <div className="button-center-container">
        <button
        className="button-view"
          onClick={() => {
            setMode("view");
            setIsOpen(true);
          }}
        >
          View All
        </button>
      </div>
      {isOpen && (
        <Popup
          setIsOpen={setIsOpen}
          setFormData={setFormData}
          formData={formData}
          editMarkerData={editMarkerData}
          mode={mode}
        />
      )}
    </>
  );
}

export default App;
