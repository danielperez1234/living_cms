"use client";
import { storageKeys } from "@/const/storage_keys";
import { UserLoginRequest } from "@/service/token/interface";
import Login from "@/service/token/service";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [user, setUser] = useState<UserLoginRequest>({
    email: "",
    password: ""
  });
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
        <form style={{ width: "100%" }}>
          <TextField
            fullWidth
            id="standard-helperText"
            label="Correo"
            type="email"
            variant="standard"
            onChange={(e) => {+
              setUser((value) => {
                return {
                  ...value,
                  email: e.target.value
                };
              });
            }}
          />
          <Box height={20} />

          <TextField
            fullWidth
            type="password"
            id="standard-helperText"
            label="Contraseña"
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
            <Typography color={"error"} variant="body1">
              {errorMsg}
            </Typography>
          )}
          <Box height={20} />
          <Button
            onClick={async () => {
              const response = await Login(user);

              if (response.status == 401) {
                setErrorMsg("Usuario o contraseña incorrectos.");
              } else if (response.status == 200 && response.data) {
                localStorage.setItem(storageKeys.token, response.data.token);
                localStorage.setItem(storageKeys.email, response.data.email);
                localStorage.setItem(
                  storageKeys.userName,
                  response.data.userName
                );
                router.push("/banners");
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
