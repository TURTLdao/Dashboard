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
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Made with ♥ by {' '}
          <Link
            href="https://turtledao.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TurtleDAO
          </Link>
          {' \u{1F422}'}
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
