
"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useSearch } from "./SearchContext";
import { useSession, signOut } from "next-auth/react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function DashBoard() {
  const [mounted, setMounted] = React.useState(false); // ← ajoute cette ligne
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setSearchTerm } = useSearch();
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ← évite l’hydratation côté serveur prématurée

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
      <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit" />
        <p>Profil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            TO DO LIST
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Rechercher…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" edge="end" onClick={handleProfileMenuOpen} color="inherit" />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit" />
          </Box>
          <Box>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-white bg-red-600 px-2.5 py-2 rounded-full font-bold">
                Se déconnecter
              </button>
            ) : (
              <Link href="/auth/login">
                <button className="text-white bg-green-600 px-2.5 py-2 rounded-full font-bold">
                  Se connecter
                </button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
