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
          <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-between'}}>
            
            <Box display={'flex'} >
              <IconButton
              sx={{mr:5}}
                onClick={() => setDrawerOpen(true)}
                >
                <MenuIcon color="primary" />
              </IconButton>
            <Typography variant="h1" color={AppColorsHex.black} textTransform={'capitalize'}>
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

             height={"50px"}
             width={{ sm: "30%", md: "20%", xs: "50%" }}
            >
              <Image
                
                objectPosition="right center"
                objectFit="contain"
                fill
                src="/web/marca/logo.png"
                alt="logo Living"
              />
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
