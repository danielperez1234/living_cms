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
  const [errorMsg,setErrorMsg] = useState<string|undefined>();
  var user: UserLoginRequest = {
    email: "",
    password: ""
  };
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
          onChange={(e) => {
            user.email = e.target.value;
          }}
        />
        <Box height={20} />
        <TextField
          fullWidth
          id="standard-helperText"
          label="Contraseña"
          
          onChange={(e) => {
            user.password = e.target.value;
          }}
          variant="standard"
        />
        {
          errorMsg &&
          <Typography color={'error'} variant="body1">
            {errorMsg}
          </Typography>
        }
        <Box height={20} />
        <Button
          onClick={async () => {
            const response = await Login(user);
            console.log( typeof response);
            console.log('response');
            if(typeof response === "number"){
              if(response == 401)
              setErrorMsg('Usuario o contraseña incorrectos.')
            }else if ( response  ) {
              localStorage.setItem(storageKeys.token,response.token)
              localStorage.setItem(storageKeys.email,response.email)
              localStorage.setItem(storageKeys.userName,response.userName)
              router.push("/banners");
            }
          }}
        >
          Entrar
        </Button>
      </Box>
    </main>
  );
}
