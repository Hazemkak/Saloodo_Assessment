import React from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Template({children}:{children:React.ReactNode}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minHeight: "100vh",
        "& > :not(style)": {
          m: "auto",
          width: 500,
          height: 500,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
              </Box>
{children}
      </Paper>
    </Box>
  )
}

export default Template