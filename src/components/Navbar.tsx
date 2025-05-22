"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent !important",
        backdropFilter: "none",
      }}
    >
      <Toolbar>
        <Link href="/" passHref legacyBehavior>
          <Typography
            component="a"
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "white",
              textDecoration: "none",
              "&:hover": { opacity: 0.8 },
            }}
          >
            Astrosoul
          </Typography>
        </Link>

        {/* Right: Take Quiz */}
        <Link href="/quiz" passHref legacyBehavior>
          <Button
            component="a"
            color="inherit"
            sx={{
              textTransform: "none",
              borderBottom: "2px solid transparent",
              "&:hover": {
                borderBottom: "2px solid white",
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Take Quiz
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
