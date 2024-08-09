'use client'
import { AppColorsHex } from "@/const/colors";
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactElement, ReactHTMLElement } from "react";

export default function AppTheme({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){

    return (
        <ThemeProvider theme={createTheme({
            palette:{
                primary: {
                    main: AppColorsHex.blue
                },
                secondary: {
                    main:AppColorsHex.white
                },
                info: {
                    main:AppColorsHex.black
                }
            },
            typography:{
                h1:{
                    fontSize: 35,
                    fontWeight:500,
                },
                h6:{
                    fontWeight:200,
                }
            },
            // components: {
            //     MuiTypography: {
            //       defaultProps: {
            //         variantMapping: {
            //           h1: 'h2',
            //           h2: 'h2',
            //           h3: 'h2',
            //           h4: 'h2',
            //           h5: 'h2',
            //           h6: 'h2',
            //           subtitle1: 'h2',
            //           subtitle2: 'h2',
            //           body1: 'span',
            //           body2: 'span',
            //         },
            //       },
            //     },
            //   },
        })}>
            
        {children}
        </ThemeProvider>
    )
}