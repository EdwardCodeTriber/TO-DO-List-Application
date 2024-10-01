import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed', 
        bottom: 0,
        left: 0,
        py: 2,
        textAlign: 'center',
        backgroundColor: '#94a3b8',
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
