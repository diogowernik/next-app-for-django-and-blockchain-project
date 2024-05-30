// @/layouts/holding/admin/LeftSidebar

import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { LeftSidebarWrapper } from '@/layouts/shared/LeftSidebarWrapper';

export const LeftSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <LeftSidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar} width={240}>
            <List sx={{ width: '100%' }}>
                <ListItem>
                    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>Admin</Typography>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Portfolio Assets" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Portfolio History" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Portfolio Evolution" />
                </ListItem>
            </List>
        </LeftSidebarWrapper>
    );
};
