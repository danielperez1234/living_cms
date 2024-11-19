import { Box, Divider, Drawer, List } from "@mui/material";
import NavBarTextButton from "./nav_bar_text_button";
import { useRouter } from "next/navigation";
//Icons
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { LocalLibraryRounded, LocationOn } from "@mui/icons-material";
interface PropsAppDrawer {
  drawerOpen: boolean;
  setDrawerOpen: (x: boolean) => void;
}
export default function AppDrawer({
  drawerOpen,
  setDrawerOpen,
}: PropsAppDrawer) {
  const router = useRouter();
  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box width={250}>
        <List>
          <NavBarTextButton
            icon={<ViewCarouselIcon />}
            title={"Banners"}
            onClick={() => router.push("/banners")}
          />
          <NavBarTextButton
            icon={<LocalOfferIcon />}
            title={"Ofertas"}
            onClick={() => router.push("/ofertas")}
          />
          <NavBarTextButton
            icon={<LocationOn />}
            title={"Sucursales"}
            onClick={() => router.push("/sucursales")}
          />
          <NavBarTextButton
            icon={<LocalOfferIcon />}
            title={"Quiénes Somos"}
            onClick={() => {}}
          />
          <NavBarTextButton
            icon={<LocalLibraryRounded />}
            title={"Categorias"}
            onClick={() => router.push("/categorias")}
          />
          <Divider />
          <NavBarTextButton
            icon={<LogoutIcon />}
            title={"Cerrar sesión"}
            onClick={() => {
              localStorage.clear();
              router.replace("/");
            }}
          />
        </List>
      </Box>
    </Drawer>
  );
}
