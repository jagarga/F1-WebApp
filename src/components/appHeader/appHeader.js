import * as React from "react";
import { Suspense } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import WaitSpinner from "../waitSpinner/waitSpinner";
import Logo from "./../../assets/img/formula-1-logo2.png";

/**
 * Component with app header in responsive design
 */
const AppHeader = () => {
  return (
    <>
      <Suspense fallback={<WaitSpinner />}>
        <AppBar position="static" sx={{ bgcolor: "white" }}>
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <img
                src={Logo}
                width="8%"
                height="5%"
                onClick={() => (window.location = "/")}
                style={{ cursor: "pointer" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="h3"
                sx={{
                  color: "blue",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginLeft: "1rem",
                  marginBottom: "0rem",
                }}
                onClick={() => (window.location = "/")}
              >
                F1 Web APP
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Suspense>
    </>
  );
};
export default AppHeader;
