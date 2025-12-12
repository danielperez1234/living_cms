"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { WholesaleRequest } from "@/service/contact/interface";
import EditWholesaleModal from "./edit_wholesale_modal";
import SimplePagination from "../common/paginado";
import useContactStore from "@/service/contact/store";
import { useSnackbar } from "../common/snackbar_provider";

const WholesaleTable: React.FC = () => {
  const {
    wholesaleRequests,
    wholesaleTotalPages,
    wholesaleLoading: isLoading,
    getWholesaleRequests,
    updateResponse,
  } = useContactStore((state) => state);

  const { showSnackbar } = useSnackbar();
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WholesaleRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAndSetRequests = async (page?: number | undefined) => {
    setError(null);
    try {
      getWholesaleRequests(page ?? 1);
    } catch (err) {
      setError("Error al cargar las solicitudes de mayorista.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAndSetRequests();
  }, []);

  useEffect(() => {
    if (updateResponse) {
      showSnackbar(updateResponse, "success");
      fetchAndSetRequests(page);
    }
  }, [updateResponse]);

  const handleOpenModal = (request: WholesaleRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const getStatusChipColor = (
    status: string
  ): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Contacted":
        return "info";
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      Pending: "Pendiente",
      Contacted: "Contactado",
      Approved: "Aprobado",
      Rejected: "Rechazado",
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: "20px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            p: { xs: 1.5, sm: 2 },
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: "bold",
          }}
        >
          Solicitudes de Mayorista
        </Typography>
        <TableContainer sx={{ maxHeight: { xs: "70vh", sm: 600 }, overflowX: "auto" }}>
          <Table
            stickyHeader
            aria-label="tabla de solicitudes de mayorista"
            sx={{ minWidth: { xs: 500, sm: 650 } }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", md: "table-cell" },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Teléfono
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Fecha
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Estado
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wholesaleRequests?.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, py: { xs: 1.5, sm: 2 } }}
                  >
                    No hay solicitudes para mostrar.
                  </TableCell>
                </TableRow>
              ) : (
                wholesaleRequests?.map((request) => (
                  <TableRow
                    hover
                    key={request.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, py: { xs: 0.75, sm: 1 } }}
                    >
                      {request.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", md: "table-cell" },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        py: { xs: 0.75, sm: 1 },
                      }}
                    >
                      {request.email}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, py: { xs: 0.75, sm: 1 } }}
                    >
                      {request.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        py: { xs: 0.75, sm: 1 },
                      }}
                    >
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ py: { xs: 0.75, sm: 1 } }}>
                      <Chip
                        label={getStatusLabel(request.status)}
                        color={getStatusChipColor(request.status)}
                        size="small"
                        sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: { xs: 0.75, sm: 1 } }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleOpenModal(request)}
                        sx={{ minWidth: { xs: 32, sm: 40 }, p: { xs: 0.5, sm: 1 } }}
                      >
                        <EditIcon sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <EditWholesaleModal
          open={isModalOpen}
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      </Paper>
      <SimplePagination
        totalPages={wholesaleTotalPages}
        onChange={(i) => {
          setPage(i);
          getWholesaleRequests(i);
        }}
      />
    </Box>
  );
};

export default WholesaleTable;
