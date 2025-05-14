"use client"; // Necesario para MUI Tabs y useState

import React, { useState, Suspense } from 'react';
import { Box, Tabs, Tab, Paper, Typography, CircularProgress, Container } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import AppNavBar from '@/components/common/app_nav_bar/main';
import OrdersTable from '@/components/user_manager/orders_table';
import UsersTable from '@/components/user_manager/users_table';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Suspense fallback={<Box sx={{display: 'flex', justifyContent: 'center', p:5}}><CircularProgress /></Box>}>
            {children}
          </Suspense>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

export default function AdminManagementPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppNavBar title={'Mis Clientes'}/>
      
      <Paper elevation={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Pestañas de administración" variant="scrollable" scrollButtons="auto">
            <Tab icon={<ShoppingCartIcon />} iconPosition="start" label="Pedidos Recientes" {...a11yProps(0)} />
            <Tab icon={<PeopleIcon />} iconPosition="start" label="Gestión de Usuarios" {...a11yProps(1)} />
            <Tab icon={<InventoryIcon />} iconPosition="start" label="News Letter" {...a11yProps(2)} />
            <Tab icon={<SettingsIcon />} iconPosition="start" label="Configuración" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OrdersTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UsersTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <ProductsAdmin /> */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {/* <SiteSettings /> */}
        </TabPanel>
      </Paper>
    </>
  );
}