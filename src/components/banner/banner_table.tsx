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
  Fab
} from "@mui/material";
import Link from "next/link";
//Icons
import AddIcon from "@mui/icons-material/Add";
import SimplePagination from "../common/paginado";
import { Banner } from "@/service/banners/interface";
import ImageIcon from "@mui/icons-material/Image";
import AgregarBannerModal from "./add_banner";
import useBannerStore from "@/service/banners/store";

const BannerTable = ({ banners,location }: { banners: Banner[],location:string }) => {
  // zustandHooks
  const postBanner = useBannerStore(state=>state.addBanner);
  
  //local hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBanners = banners.filter((banner) =>
    banner.assetName?.toLowerCase().includes(searchTerm)
  );
  const handleClick = (banner: Banner) => {
    console.log(`Banner clickeado: ${banner.assetName}`);
    // Aquí puedes hacer cualquier otra cosa, como redirigir a una página, abrir un modal, etc.
  };
  return (
    <Box>
      <AgregarBannerModal open={openAddModal} onClose={()=>setOpenAddModal(false)} onSubmit={(asset =>{
        postBanner({Location: location,...asset});
        })}/>
      <Box
        display={"flex"}
        width={"96%"}
        marginX={"2%"}
        justifyContent={"end"}
        bottom={100}
      >
        <Fab variant="extended" color="primary" aria-label="add" onClick={()=>setOpenAddModal(true)}>
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
                <TableCell>{banner.assetName ?? "no name"}</TableCell>
                <TableCell>
                  <Link href={`${banner.assetUrl}`}>
                    <ImageIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box height={"20px"} />
      <SimplePagination />
    </Box>
  );
};

export default BannerTable;
