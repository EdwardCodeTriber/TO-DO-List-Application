import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed', // Fixed position to stick at the bottom
        bottom: 0,
        left: 0,
        py: 2,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 TO DO List by CodeTriber. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
