'use client'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NavBarTextButton from "./nav_bar_text_button";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AppDrawer from "./app_drawer";
import { AppColorsHex } from "@/const/colors";
export default function AppNavBar({title}:{title:string}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box height={{ sm: "65px", xs: "65px", md: "70px" }} >
      <AppBar sx={{ bgcolor: AppColorsHex.white }}>
        <AppDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={(x) => setDrawerOpen(x)}
        />
        
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-between', px: { xs: 1, sm: 2 }}}>
            
            <Box display={'flex'} alignItems={'center'} gap={{ xs: 1, sm: 2, md: 3 }}>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ p: { xs: 0.5, sm: 1 } }}
              >
                <MenuIcon color="primary" />
              </IconButton>
              <Typography 
                variant="h1" 
                color={AppColorsHex.black} 
                textTransform={'capitalize'}
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: { xs: '150px', sm: '300px', md: '100%' }
                }}
              >
                {title}
              </Typography>
            </Box>
              
            <Box
             padding={0}
             margin={0}
             display={"flex"}
             flexDirection={"row"}
             justifyContent={"end"}
             position={"relative"}
             height={{ xs: "40px", sm: "45px", md: "50px" }}
             width={{ xs: "80px", sm: "120px", md: "150px" }}
             flexShrink={0}
            >
              <Image
                objectPosition="right center"
                objectFit="contain"
                fill
                src="/cms/marca/logo.png"
                alt="logo Living"
                priority
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
