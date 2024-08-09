import { Box } from "@mui/material";
import React, { ReactElement } from "react";

export default function AppBackgroundImage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundImage: "url(/marca/fondo.svg)",
          zIndex: -1,
        }}
      />
      
        {children}
      
    </Box>
  );
}
