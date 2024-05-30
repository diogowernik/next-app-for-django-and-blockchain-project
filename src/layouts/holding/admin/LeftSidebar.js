// @/layouts/holding/admin/LeftSidebar

import React from 'react';
import { List, ListItem, ListItemText} from '@mui/material';
import { FlexibleSidebarWrapper } from '@/layouts/shared/FlexibleSideBarWrapper';

export const LeftSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <FlexibleSidebarWrapper 
            isOpen={isOpen} 
            toggleSidebar={toggleSidebar} 
            anchor="left" 
            width={240}
        >   
            
                <List>
                    <ListItem><ListItemText primary="Admin" /></ListItem>
                    <ListItem button><ListItemText primary="Portfolio Assets" /></ListItem>
                    <ListItem button><ListItemText primary="Portfolio History" /></ListItem>
                    <ListItem button><ListItemText primary="Portfolio Evolution" /></ListItem>
                </List>
        </FlexibleSidebarWrapper>
    );
};
