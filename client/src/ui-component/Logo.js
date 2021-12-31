// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 */ import logoDark from 'assets/images/logo-dark.svg';
import logo from '../assets/images/IITBBS.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
       
        <img src={logo} alt="IITBBS" width="70" height="70"  />
    );
};

export default Logo;
