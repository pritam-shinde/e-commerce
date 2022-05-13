import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const Review = ({ checkoutToken }) => {
    return (
        <>
            <Box p={3}>
                <Typography variant='h6'>Order Summary</Typography>
                <List disablePadding>
                    {
                        checkoutToken.live.line_items.map(product => {
                            return (<>
                                <ListItem key={product.product_name} style={{ padding: "10px 0" }} >
                                    <ListItemAvatar>
                                        <Avatar src={product.image.url} alt={product.product_name} variant="square" />
                                    </ListItemAvatar>
                                    <ListItemText primary={product.product_name} secondary={`Quantity: ${product.quantity}`} />
                                    <Typography variant='body'>{product.line_total.formatted_with_symbol}</Typography>
                                </ListItem>
                            </>)
                        }
                        )
                    }
                    <ListItem style={{ padding: "10px 0" }}>
                        <ListItemText primary="Total" />
                        <Typography variant='body' style={{fontWeight: 700}} >{checkoutToken.live.total.formatted_with_symbol}</Typography>
                    </ListItem>
                </List>
            </Box>
        </>
    )
}

export default Review