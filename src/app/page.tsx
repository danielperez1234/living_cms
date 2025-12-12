"use client";
import { storageKeys } from "@/const/storage_keys";
import { UserLoginRequest } from "@/service/token/interface";
import Login from "@/service/token/service";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSnackbar } from "@/components/common/snackbar_provider";

export default function Home() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [user, setUser] = useState<UserLoginRequest>({
    email: "",
    password: ""
  });
  return (
    <main>
      <Box
        my={{ xs: 3, sm: 5, md: 10 }}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        position={"relative"}
        height={{ xs: "60px", sm: "80px", md: "100px" }}
        width={{ xs: "100%", sm: "100%" }}
        px={{ xs: 2, sm: 0 }}
      >
        <Image
          objectPosition="center"
          objectFit="contain"
          fill
          src="/cms/marca/logo.png"
          alt="logo Living"
        />
      </Box>
      <Divider />
      <Box
        mt={{ xs: 3, sm: 5, md: 10 }}
        marginX={{ xs: "5%", sm: "20%", md: "30%" }}
        px={{ xs: 2, sm: 3 }}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, fontWeight: 'bold', textAlign: 'center' }}>Iniciar Sesión</Typography>
        <Box height={{ xs: 20, sm: 25, md: 30 }} />
        <form style={{ width: "100%" }}>
          <TextField
            fullWidth
            id="standard-helperText"
            label="Correo"
            type="email"
            variant="standard"
            size="small"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            onChange={(e) => {+
              setUser((value) => {
                return {
                  ...value,
                  email: e.target.value
                };
              });
            }}
          />
          <Box height={{ xs: 15, sm: 20 }} />

          <TextField
            fullWidth
            type="password"
            id="standard-helperText"
            label="Contraseña"
            size="small"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            onChange={(e) => {+
              setUser((value) => {
                return {
                  ...value,
                  password: e.target.value
                };
              });
            }}
            variant="standard"
          />
          {errorMsg && (
            <Typography color={"error"} variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, textAlign: 'center' }}>
              {errorMsg}
            </Typography>
          )}
          <Box height={{ xs: 15, sm: 20 }} />
          <Button
            fullWidth
            variant="contained"
            size="medium"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, py: { xs: 1, sm: 1.5 }, fontWeight: 'bold' }}
            onClick={async () => {
              const response = await Login(user);

              if (response.status == 401) {
                setErrorMsg("Usuario o contraseña incorrectos.");
                showSnackbar("Usuario o contraseña incorrectos", "error");
              } else if (response.status == 200 && response.data) {
                localStorage.setItem(storageKeys.token, response.data.token);
                localStorage.setItem(storageKeys.email, response.data.email);
                localStorage.setItem(
                  storageKeys.userName,
                  response.data.userName
                );
                showSnackbar(`¡Bienvenido ${response.data.userName}!`, "success");
                setTimeout(() => {
                  router.push("/banners");
                }, 1000);
              } else {
                showSnackbar("Error al iniciar sesión. Intenta de nuevo.", "error");
              }
            }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </main>
  );
}
