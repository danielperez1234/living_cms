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
import { ContactMessage } from "@/service/contact/interface";
import EditContactModal from "./edit_contact_modal";
import SimplePagination from "../common/paginado";
import useContactStore from "@/service/contact/store";
import { useSnackbar } from "../common/snackbar_provider";

const ContactTable: React.FC = () => {
  const {
    contactMessages,
    contactTotalPages,
    contactLoading: isLoading,
    getContactMessages,
    updateResponse,
  } = useContactStore((state) => state);

  const { showSnackbar } = useSnackbar();
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAndSetMessages = async (page?: number | undefined) => {
    setError(null);
    try {
      getContactMessages(page ?? 1);
    } catch (err) {
      setError("Error al cargar los mensajes de contacto.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAndSetMessages();
  }, []);

  useEffect(() => {
    if (updateResponse) {
      showSnackbar(updateResponse, "success");
      fetchAndSetMessages(page);
    }
  }, [updateResponse]);

  const handleOpenModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const getStatusChipColor = (
    status: string
  ): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Read":
        return "info";
      case "Replied":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      Pending: "Pendiente",
      Read: "Leído",
      Replied: "Respondido",
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
          Mensajes de Contacto
        </Typography>
        <TableContainer sx={{ maxHeight: { xs: "70vh", sm: 600 }, overflowX: "auto" }}>
          <Table
            stickyHeader
            aria-label="tabla de mensajes de contacto"
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
                    display: { xs: "none", sm: "table-cell" },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Teléfono
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                  }}
                >
                  Mensaje
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
              {contactMessages?.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, py: { xs: 1.5, sm: 2 } }}
                  >
                    No hay mensajes para mostrar.
                  </TableCell>
                </TableRow>
              ) : (
                contactMessages?.map((message) => (
                  <TableRow
                    hover
                    key={message.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, py: { xs: 0.75, sm: 1 } }}
                    >
                      {message.fullName}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", md: "table-cell" },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        py: { xs: 0.75, sm: 1 },
                      }}
                    >
                      {message.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        py: { xs: 0.75, sm: 1 },
                      }}
                    >
                      {message.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        py: { xs: 0.75, sm: 1 },
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {message.message}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        py: { xs: 0.75, sm: 1 },
                      }}
                    >
                      {new Date(message.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ py: { xs: 0.75, sm: 1 } }}>
                      <Chip
                        label={getStatusLabel(message.status)}
                        color={getStatusChipColor(message.status)}
                        size="small"
                        sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: { xs: 0.75, sm: 1 } }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleOpenModal(message)}
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
        <EditContactModal open={isModalOpen} message={selectedMessage} onClose={handleCloseModal} />
      </Paper>
      <SimplePagination
        totalPages={contactTotalPages}
        onChange={(i) => {
          setPage(i);
          getContactMessages(i);
        }}
      />
    </Box>
  );
};

export default ContactTable;
