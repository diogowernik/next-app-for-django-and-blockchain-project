import React from 'react';
import { Grid, List, ListItem, ListItemText, Typography, Button } from '@mui/material';

const RightSidebar = ({ brokers, categories, handleFilterUpdate, clearAllFilters, clearBrokerFilters, clearCategoryFilters, filters }) => {
    const brokerFilter = filters && filters.broker;
    const categoryFilter = filters && filters.category;

    return (
        <Grid item xs={2} sx={{ borderLeft: 1, borderColor: 'divider' }}>
            <List sx={{ width: '80%' }}>
                <ListItem>
                    <Button variant="outlined" sx={{ width: '100%', mb: 1 }} onClick={clearAllFilters}>Clear All Filters</Button>
                </ListItem>
                <ListItem>
                    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>Brokers</Typography>} />
                    <Button variant="outlined" sx={{ width: '50%', mb: 1 }} onClick={clearBrokerFilters}>Clear</Button>
                </ListItem>
                {brokers.map(broker => (
                    <ListItem button key={broker} onClick={() => handleFilterUpdate('broker', broker)} sx={{ pl: 4, backgroundColor: brokerFilter === broker ? 'rgba(0, 0, 0, 0.04)' : 'inherit' }}>
                        <ListItemText primary={broker} />
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>Categories</Typography>} />
                    <Button variant="outlined" sx={{ width: '50%', mb: 1 }} onClick={clearCategoryFilters}>Clear</Button>
                </ListItem>
                {categories.map(category => (
                    <ListItem button key={category} onClick={() => handleFilterUpdate('category', category)} sx={{ pl: 4, backgroundColor: categoryFilter === category ? 'rgba(0, 0, 0, 0.04)' : 'inherit' }}>
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
};

export default RightSidebar;
