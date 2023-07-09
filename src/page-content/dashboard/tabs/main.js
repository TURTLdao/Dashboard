import { Grid, Typography } from '@mui/material';

import PropTypes from 'prop-types';


const MainTab = ({ data }) => {


  return (
    <Grid item xs={12} md={12}>
    <div align='center'>
      <Typography align='center' variant='h3' color={'#44a574'} sx={{ maxWidth: '65%', mt: 4}}>
        About TurtleDAO
      </Typography>

      <Typography align='center' variant='body1' sx={{ maxWidth: '80%', my: 2}} >
        Welcome to TurtleDAO, a pioneering platform dedicated to revolutionizing the world of decentralized finance (DeFi) and blockchain technology.<br/>
        At TurtleDAO, we believe in the power of transparency, community engagement, and trust. We are committed to creating an ecosystem where projects, investors, and enthusiasts come together to shape the future of finance and technology.<br/>
        Our mission is simple yet ambitious – to provide a secure, transparent, and inclusive environment for verified projects and passionate individuals to thrive. Through rigorous project verification processes, we ensure that only the most credible and innovative projects are supported within our ecosystem.<br/>
        We take pride in our community-driven approach, empowering individuals to actively participate in the decision-making process. Governance mechanisms enable token holders to contribute their ideas, vote on important matters, and collectively steer the direction of TurtleDAO. We believe that true decentralization is achieved when everyone has a voice.<br/>
        TurtleDAO also recognizes the importance of collaboration. By collaborating with other projects, industry experts, and thought leaders, we aim to boost awareness, visibility, and adoption of blockchain technology. Together, we can create a global network that drives innovation and transforms industries.<br/>
        Join us on this exciting journey as we pave the way for a decentralized future. Whether you are a project looking for support, an investor seeking trustworthy opportunities, or an enthusiast eager to learn and contribute, TurtleDAO welcomes you with open arms.<br/>
        Together, let's build a world where transparency, inclusivity, and innovation reign supreme. Together, let's shape the future with TurtleDAO.<br/>
      </Typography>

      <Typography align='center' variant='h3' color={'#44a574'} sx={{ maxWidth: '65%', mt: 4 }}>
        Building the Best Cardano Blockchain Tools for Unparalleled User Experience
      </Typography>

      <Typography align='center' variant='body1' sx={{ maxWidth: '80%', my: 2}}>
        At TurtleDAO, we are on a mission to provide the best Cardano blockchain tools that redefine the user experience and empower individuals in their journey through decentralized finance (DeFi). What sets us apart from our competitors is that we offer our services entirely for free, ensuring accessibility and inclusivity for all.<br/>
        We understand that navigating the complexities of blockchain technology can be daunting. That's why we are committed to developing user-friendly tools that simplify the process and make it accessible to users of all backgrounds. Our intuitive interface and streamlined design prioritize ease of use, allowing both beginners and experienced users to effortlessly interact with the Cardano blockchain.<br/>
        Unlike other platforms that charge fees for their services, we firmly believe in democratizing access to blockchain tools. By providing our services for free, we eliminate financial barriers and ensure that everyone has equal opportunities to participate in the Cardano ecosystem. We are driven by the vision of a truly inclusive and empowering environment where users can explore, transact, and engage without any limitations.<br/>
        But our commitment to excellence doesn't end with affordability. We strive for continuous improvement and are dedicated to building the best tools available. Our team of experienced developers, designers, and blockchain experts are tirelessly working behind the scenes to enhance the functionality, security, and performance of our tools.<br/>
        We listen to the needs and feedback of our community, taking their insights into account as we prioritize the development of new features and improvements. Through constant innovation, we aim to provide an unparalleled user experience that exceeds expectations and sets new standards in the Cardano ecosystem.<br/>
        By choosing TurtleDAO, you not only gain access to top-notch Cardano blockchain tools but also become part of a vibrant and supportive community. We believe in the power of collaboration and knowledge sharing, fostering an environment where users can connect, learn, and grow together.<br/>
      </Typography>
      </div>
    </Grid>
  );
}

MainTab.propTypes = {
  data: PropTypes.object
};

export default MainTab;
