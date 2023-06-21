import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2023 - TurtleDAO Platform
          </Typography>
        </Box>
        <Typography textAlign="center" variant="subtitle1">
          Infused with passion by{' '}
          <Link
            href="https://www.turtle-dao.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TurtleDAO
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
