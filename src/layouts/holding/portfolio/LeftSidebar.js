import React from 'react';
import { LeftSidebarWrapper } from '@/layouts/shared/LeftSidebarWrapper';
import { List, ListItem, ListItemText, Typography } from '@mui/material';


export const LeftSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <LeftSidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar} width={200}>
            <List sx={{ width: '100%' }}>
                <ListItem>
                    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>Meu Portfolio</Typography>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Categorias" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Corretoras" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Dividendos" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Evolução" />
                </ListItem>
            </List>          
        </LeftSidebarWrapper>
    );
};
