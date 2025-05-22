import React from 'react';
import { Outlet } from 'react-router-dom';
import { MenuNavegacion } from './MenuNavegacion';

const Layout = () => {
    return (
        <>
            <MenuNavegacion />
            <Outlet />
        </>
    );
};

export default Layout;