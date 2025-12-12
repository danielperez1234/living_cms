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
  Button,
} from "@mui/material";
import Link from "next/link";
//Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SimplePagination from "../common/paginado";
import { Banner } from "@/service/banners/interface";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import AgregarBannerModal from "./add_banner";
import useBannerStore from "@/service/banners/store";
import BannerImageModal from "./banner_image";
import UpdateBannerModal from "./update_banner";
import { UpdateBannersLocation } from "@/service/banners/service";

const BannerTable = ({
  banners,
  location,
}: {
  banners: Banner[];
  location: string;
}) => {
  // zustandHooks
  const postBanner = useBannerStore((state) => state.addBanner);
  const deleteBanner = useBannerStore((state) => state.deleteBanner);
  const getBanners = useBannerStore((state) => state.getBanners);
  const selectBanner = useBannerStore((state) => state.selectBanner);

  //local hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageModal, setImageModal] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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
    <Box sx={{ width: '100%', maxWidth: '100vw', px: { xs: 0.5, sm: 1, md: 2 }, pb: 3, boxSizing: 'border-box' }}>
      <AgregarBannerModal
        accept={location == "mega_banner" ? "image/*,video/*" : "image/*"}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (asset) => {
          await postBanner({ Location: location, ...asset });
          getBanners(location);
        }}
      />
      <UpdateBannerModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onSubmit={async (asset) => {
          if (asset) {
            await UpdateBannersLocation({ ...asset });
          }
          getBanners(location);
        }}
      />
      <BannerImageModal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        file={imageModal}
      />
      <Box
        display={"flex"}
        width={"-webkit-fill-available"}
        justifyContent={"end"}
        mb={2}
        mt={{ xs: 1, sm: 2 }}
        px={{ xs: 0.5, sm: 0 }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setOpenAddModal(true)}
          size="medium"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            px: { xs: 1.5, sm: 2, md: 3 },
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: 36, sm: 40 }
          }}
        >
          <AddIcon sx={{ mr: { xs: 0.5, sm: 1 }, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
          Agregar
        </Fab>
      </Box>
      <Box sx={{ px: { xs: 0.5, sm: 0 } }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearchChange}
          size="small"
          sx={{ mb: 2, width: '100%' }}
        />
      </Box>

      <Box sx={{ px: { xs: 0.5, sm: 0 }, width: '100%' }}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
          <Table sx={{ width: '100%' }} size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, width: { xs: '35%', sm: '25%' } }}>Título</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, display: { xs: 'none', sm: 'table-cell' }, width: '30%' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, display: { xs: 'none', md: 'table-cell' }, width: '25%' }}>Link</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, width: { xs: '65%', sm: '20%', md: '20%' } }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((banner) => (
              <TableRow
                key={banner.id}
                onClick={() => handleClick(banner)}
                style={{ cursor: "pointer" }}
                hover
              >
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 }, maxWidth: { xs: '100px', sm: '200px' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{banner.assetName ?? "Sin nombre"}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 }, display: { xs: 'none', sm: 'table-cell' }, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {banner.assetDescription ?? "Sin descripcion"}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 }, display: { xs: 'none', md: 'table-cell' }, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {banner.link && banner.link != "" ? (
                    <Link href={banner.link} style={{ fontSize: 'inherit' }}>{banner.link}</Link>
                  ) : (
                    "no link"
                  )}
                </TableCell>
                <TableCell sx={{ py: { xs: 0.5, sm: 1 } }}>
                  <Box sx={{ display: 'flex', gap: { xs: 0.25, sm: 0.5 }, flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
                    <Button
                      variant="text"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageModal(banner.assetUrl ?? "");
                        setOpenImageModal(true);
                      }}
                      size="small"
                      sx={{ minWidth: { xs: '28px', sm: '36px' }, p: { xs: 0.25, sm: 0.5 } }}
                    >
                      <ImageIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                    </Button>
                    <Button
                      variant="text"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectBanner(banner);
                        setOpenUpdateModal(true);
                      }}
                      size="small"
                      sx={{ minWidth: { xs: '28px', sm: '36px' }, p: { xs: 0.25, sm: 0.5 } }}
                    >
                      <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                    </Button>
                    <Button
                      variant="text"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await deleteBanner(banner.id);
                        getBanners(location);
                      }}
                      size="small"
                      sx={{ minWidth: { xs: '28px', sm: '36px' }, p: { xs: 0.25, sm: 0.5 } }}
                    >
                      <DeleteIcon color="error" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Box sx={{ mt: 2, px: { xs: 0.5, sm: 0 } }}>
        <SimplePagination />
      </Box>
    </Box>
  );
};

export default BannerTable;
