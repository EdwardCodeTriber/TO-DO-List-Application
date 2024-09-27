import React from "react";
import { Container, Typography, Link } from "@mui/material";

const Footer = () => (
  <Container maxWidth="lg" component="footer">
    <Typography variant="body1">© 2024 My To-Do App</Typography>
    <Link href="https://twitter.com" target="_blank" rel="noopener">Twitter</Link> | 
    <Link href="https://facebook.com" target="_blank" rel="noopener">Facebook</Link>
  </Container>
);

export default Footer;
