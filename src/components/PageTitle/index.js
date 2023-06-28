import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';

const PageTitle = ({ heading = '', subHeading = '', subHeading2 = '', docs = '', ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
        {
          subHeading2 ? 
          <Typography variant="subtitle2"><i>{subHeading2}</i></Typography>
          :
          null
        }
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  subHeading2: PropTypes.string,
  docs: PropTypes.string
};

export default PageTitle;
