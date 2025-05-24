import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import './CSS/MenuNavegacion.css';


const settings = [

    { label: 'Cerrar sesión', path: '/login' }];

const pages = [
    { label: 'Inicio', path: '/Home' },
    { label: 'Usuarios', path: '/Usuarios' },
    { label: 'Proyectos', path: '/Proyectos' }
];

function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let j = 0; j < 3; j++) {
        const value = (hash >> (j * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-1);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name.charAt(0).toUpperCase(),
    };
}

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser || null);
        });

        return () => unsubscribe();
    }, []);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (

        <AppBar position="static">
            <Container className='Navegacion' maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar-nav"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar-nav"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.label}
                                    component={Link}
                                    to={page.path}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                component={Link}
                                to={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <div className='MenuAvatar'>
                            <Typography className='Saludo' variant="h6">
                                {user ? `Hola ${user.displayName} ` : 'No has iniciado sesión'}
                            </Typography>
                            <Tooltip title="Abrir configuración">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {user && user.displayName ? (
                                        <Avatar {...stringAvatar(user.displayName)} />
                                    ) : (
                                        <Avatar>?</Avatar>
                                    )}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar-user"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.label}
                                    component={Link}
                                    to={setting.path}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

export const MenuNavegacion = () => {
    return (
        <div>
            <ResponsiveAppBar />
            
        </div>
    );
};