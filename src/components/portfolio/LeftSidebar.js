// @/components/layout/LeftSidebar.js

import React from 'react';
import { Grid, List, ListItem, ListItemText } from '@mui/material';

const LeftSidebar = () => {
    return (
        <Grid item xs={1.6} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <List>
                <ListItem>
                    <ListItemText primary="Admin" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Portfolio Assets" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Portfolio History" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Portfolio Evolution" />
                </ListItem>
            </List>
        </Grid>
    );
};

export default LeftSidebar;
