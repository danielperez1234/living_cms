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
  Button
} from "@mui/material";
import Link from "next/link";
//Icons
import AddIcon from "@mui/icons-material/Add";
import SimplePagination from "../common/paginado";
import { Banner } from "@/service/banners/interface";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import AgregarBannerModal from "./add_banner";
import useBannerStore from "@/service/banners/store";
import BannerImageModal from "./banner_image";

const BannerTable = ({
  banners,
  location
}: {
  banners: Banner[];
  location: string;
}) => {
  // zustandHooks
  const postBanner = useBannerStore((state) => state.addBanner);
  const deleteBanner = useBannerStore((state) => state.deleteBanner);
  const getBanners = useBannerStore((state) => state.getBanners);

  //local hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageModal, setImageModal] = useState('');

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
      <AgregarBannerModal
      accept= {location=="mega_banner"? "image/*,video/*": "image/*"}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (asset) => {
          await postBanner({ Location: location, ...asset });
          getBanners(location);
        }}
      />
      <BannerImageModal open={openImageModal} onClose={()=>setOpenImageModal(false)} file={imageModal}/>
      <Box
        display={"flex"}
        width={"96%"}
        marginX={"2%"}
        justifyContent={"end"}
        bottom={100}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setOpenAddModal(true)}
        >
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
              <TableCell>Descripción</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((banner) => (
              <TableRow
                key={banner.id}
                onClick={() => handleClick(banner)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{banner.assetName ?? "Sin nombre"}</TableCell>
                <TableCell>
                  {banner.assetDescription ?? "Sin descripcion"}
                </TableCell>
                <TableCell>
                  {
                  banner.link && banner.link != "" ?
                   (<Link href={""}>{banner.link}</Link>) : "no link"}
                </TableCell>
                <TableCell>
                <Button
                    variant="text"
                    onClick={ () => {
                    setImageModal(banner.assetUrl ?? '');
                    setOpenImageModal(true);
                    }}
                  >
                    <ImageIcon />
                  </Button>
                  <Button
                    variant="text"
                    onClick={async () => {
                      await deleteBanner(banner.id);
                      getBanners(location);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
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
