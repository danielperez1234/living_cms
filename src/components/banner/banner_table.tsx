"use cliente";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Fab,
} from "@mui/material";
import Link from "next/link";
//Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
interface Banner {
  id: number;
  title: string;
  image: string;
}
const banners = [
  { id: 1, title: "Banner 1", image: "/path/to/image1.jpg" },
  { id: 2, title: "Banner 2", image: "/path/to/image2.jpg" },
  { id: 3, title: "Banner 3", image: "/path/to/image3.jpg" },
  { id: 4, title: "Banner 4", image: "/path/to/image4.jpg" },
  { id: 5, title: "Banner 5", image: "/path/to/image5.jpg" },
  { id: 6, title: "Banner 6", image: "/path/to/image6.jpg" },
  { id: 7, title: "Banner 7", image: "/path/to/image7.jpg" },
  { id: 8, title: "Banner 8", image: "/path/to/image8.jpg" },
  { id: 9, title: "Banner 9", image: "/path/to/image9.jpg" },
  { id: 10, title: "Banner 10", image: "/path/to/image10.jpg" },
  // Agrega más banners aquí
];

const BannerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBanners = banners.filter((banner) =>
    banner.title.toLowerCase().includes(searchTerm)
  );
  const handleClick = (banner: Banner) => {
    console.log(`Banner clickeado: ${banner.title}`);
    // Aquí puedes hacer cualquier otra cosa, como redirigir a una página, abrir un modal, etc.
  };
  return (
    <Box>
      <Box
        display={"flex"}
        width={"96%"}
        marginX={"2%"}
        justifyContent={"end"}
        bottom={100}
      >
        <Fab variant="extended" color="primary" aria-label="add">
          <AddIcon sx={{ mr: 1 }} />
          Agregar
        </Fab>
        <Box width={"10px"} />
      </Box>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((banner) => (
              <TableRow
                key={banner.id}
                onClick={() => handleClick(banner)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{banner.title}</TableCell>
                <TableCell>
                  <Link href={`liga${banner.image}`}>{banner.image}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BannerTable;
