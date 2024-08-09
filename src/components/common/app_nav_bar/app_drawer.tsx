import { Box, Divider, Drawer, List, Typography } from "@mui/material";
import NavBarTextButton from "./nav_bar_text_button";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation";
interface PropsAppDrawer{
drawerOpen: boolean;
setDrawerOpen:  (x:boolean)=> void,
}
export default function AppDrawer({drawerOpen,setDrawerOpen}:PropsAppDrawer){
    const router = useRouter();
    return(
        <Drawer  open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box width={250}>
        <List >
          <NavBarTextButton icon={<LocalOfferIcon/>} title={"Catalogo"} onClick={() => {}} />
          <NavBarTextButton icon={<LocalOfferIcon/>} title={"Ofertas"} onClick={() => {}} />
          <NavBarTextButton icon={<LocalOfferIcon/>} title={"Servicios"} onClick={() => {}} />
          <NavBarTextButton icon={<LocalOfferIcon/>} title={"Quiénes Somos"} onClick={() => {}} />
          <Divider/>
          <NavBarTextButton icon={<LogoutIcon/>} title={"Cerrar sesión"} onClick={() => router.replace('/')} />
        </List>
        </Box>
      </Drawer>
    )
}