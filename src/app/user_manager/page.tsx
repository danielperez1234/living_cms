"use client"; // Necesario para MUI Tabs y useState

import React, { useState, Suspense } from 'react';
import { Box, Tabs, Tab, Paper, Typography, CircularProgress, Container } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import AppNavBar from '@/components/common/app_nav_bar/main';
import OrdersTable from '@/components/user_manager/orders_table';
import UsersTable from '@/components/user_manager/users_table';
import WholesaleTable from '@/components/user_manager/wholesale_table';
import ContactTable from '@/components/user_manager/contact_table';

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
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          <Suspense fallback={<Box sx={{display: 'flex', justifyContent: 'center', p: { xs: 3, sm: 5 }}}><CircularProgress /></Box>}>
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
      
      <Paper elevation={0} sx={{ mx: { xs: 0, sm: 1, md: 2 } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 0, sm: 1 } }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="Pestañas de administración" 
            variant="scrollable" 
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                minHeight: { xs: 48, sm: 60 },
                px: { xs: 1, sm: 2 }
              }
            }}
          >
            <Tab icon={<ShoppingCartIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />} iconPosition="start" label="Pedidos Recientes" {...a11yProps(0)} />
            <Tab icon={<BusinessIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />} iconPosition="start" label="Mayorista" {...a11yProps(1)} />
            <Tab icon={<EmailIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />} iconPosition="start" label="Contacto" {...a11yProps(2)} />
            <Tab icon={<PeopleIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />} iconPosition="start" label="Gestión de Usuarios" {...a11yProps(3)} />
            <Tab icon={<InventoryIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />} iconPosition="start" label="News Letter" {...a11yProps(4)} />
            <Tab icon={<SettingsIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />} iconPosition="start" label="Configuración" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OrdersTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WholesaleTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ContactTable />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UsersTable />
        </TabPanel>
        <TabPanel value={value} index={4}>
          {/* <ProductsAdmin /> */}
        </TabPanel>
        <TabPanel value={value} index={5}>
          {/* <SiteSettings /> */}
        </TabPanel>
      </Paper>
    </>
  );
}