"use client";
import BannerTable from "@/components/banner/banner_table";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <Box
        my={10}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        position={"relative"}
        height={"100px"}
        width={{ sm: "100%" }}
      >
        <Image
          objectPosition="center"
          objectFit="contain"
          fill
          src="/marca/logo.png"
          alt="logo Living"
        />
      </Box>
      <Divider />
      <Box
        mt={10}
        marginX={"30%"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h1">Iniciar Sesión</Typography>
        <Box height={30} />
        <TextField

          fullWidth
          id="standard-helperText"
          label="Correo"
          variant="standard"
        />
        <Box height={20} />
        <TextField fullWidth
          id="standard-helperText"
          label="Contraseña"
          variant="standard" />
          <Box height={20}/>
          <Button onClick={()=>router.push('/banner')}>
            Entrar
          </Button>
      </Box>
    </main>
  );
}
