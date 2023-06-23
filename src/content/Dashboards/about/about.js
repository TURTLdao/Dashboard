import { useRef, useState } from 'react';
import { Button, Card, Grid, Box, FormControl, CardActions, Typography,
  Divider, OutlinedInput, Chip, InputAdornment, styled, useTheme
} from '@mui/material';
import { formatDistance, subMonths, subDays } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import Link from 'src/components/Link';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

function AboutSection() {
  const theme = useTheme();

  const handleDelete = () => {};

  const handleClick = () => {};

  return (
    <>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <div align='center'>

          <Typography
            sx={{ pb: 2 }}
            color="primary"
            variant='h3'
          >
            About TurtleDAO
          </Typography>

          <Typography
            sx={{ pb: 2 }}
            color="text.secondary"
            variant='h5'
            align='center'
          >
            <i>You're lying to yourself if you say you don't like turtles.</i>
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '75%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            Inspiring trust in both TurtleDAO verified and supported projects.
            Step into a future where transparency and accountability reign supreme, propelling you towards success and unyielding confidence.
            A team built to verify new and upcoming projects to help avoid users investing in worthless assets.
          </Typography>

          <Typography
            sx={{ pb: 2 }}
            color="primary"
            variant='h4'
            align='center'
          >
            Why TurtleDAO?
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Regular Auditing
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            While most organizations typically conduct a single audit, our dedication lies in consistently monitoring and ensuring the continued compliance and positive conduct of our verified projects.
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Funding New Projects
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            In addition to project verification, we pledge our commitment to supporting their financial stability and future growth by assisting in fundraising for liquidity and development purposes.
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Community Driven
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            TurtleDAO prioritizes the well-being of the community, valuing their input and ensuring their voices are heard in every decision we make.
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Open-Source
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            We embrace a commitment to openness and transparency. Our unwavering dedication is reflected in our open-source approach, making every line of code and resource readily accessible under a GitHub license.
          </Typography>
          
          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Thorough Verification
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            Our rigorous project verification process ensures that projects endorsed by the platform have undergone careful scrutiny. This verification helps to mitigate risks and increase the likelihood of successful and reputable ventures.
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Transparency
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            TurtleDAO operates with a commitment to transparency, providing open-source code and making resources readily accessible. This level of transparency ensures that actions and decisions are visible, fostering trust and accountability.
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Community Involvement
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            Our values community input and actively involves stakeholders in decision-making processes. By giving individuals a voice and considering their perspectives, the project demonstrates a commitment to inclusivity and democratic governance.
          </Typography>
          
          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Financial Support
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            TurtleDAO goes beyond verification by dedicating resources to support verified projects. Through initiatives such as providing liquidity and development grants, TurtleDAO demonstrates a vested interest in the growth and success of the projects it endorses.
          </Typography>
          
          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Track Record
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            Assessing the past performance and track record of TurtleDAO can contribute to building trust. Reviewing the history of successfully supported projects, community feedback, and engagement can provide insights into the project's reliability and commitment to its mission.
          </Typography>

          <Typography
            sx={{ pb: 1 }}
            color="text.secondary"
            variant='caption'
            align='center'
          >
            Ecosystem Collaboration
          </Typography>

          <Typography
            sx={{ pb: 2, maxWidth: '50%' }}
            color="text.secondary"
            variant='body1'
            align='center'
          >
            TurtleDAO fosters a collaborative ecosystem, creating opportunities for projects to interact and benefit from synergies. This collaborative approach helps to build a network effect, where trust in the overall ecosystem enhances the credibility and potential of individual projects.
          </Typography>

          <Button>View Whitepaper</Button>

          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AboutSection;
