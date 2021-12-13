import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { OAuth2Client } from 'google-auth-library';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// services
import getCodeChallenge from '../../../../services/getCodeChallenge';
import getLoginStatus from '../../../../services/getLoginStatus';

import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [oAuthUrl, setOAuthUrl] = useState('');
    const navigate = useNavigate();

    const googleHandler = async () => {
        console.error('Login');
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        getLoginStatus()
            .then(() => {
                navigate('/free');
            })
            .catch(() => {
                getCodeChallenge()
                    .then(({ codeChallenge }) => {
                        const oAuth2Client = new OAuth2Client({
                            clientId: '70554988672-2q8bqirlbfues4mak0u9novrl7e2u0rn.apps.googleusercontent.com',
                            redirectUri: 'http://localhost:3000/free/oauth/redirect'
                        });

                        setOAuthUrl(
                            oAuth2Client.generateAuthUrl({
                                access_type: 'offline',
                                code_challenge_method: 'S256',
                                code_challenge: codeChallenge,
                                scope: [
                                    'https://www.googleapis.com/auth/userinfo.email',
                                    'https://www.googleapis.com/auth/userinfo.profile',
                                    'openid'
                                ]
                            })
                        );
                    })
                    .catch((err) => console.error(err));
            });
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            component="a"
                            href={oAuthUrl}
                            rel="noreferrer"
                            disabled={!oAuthUrl}
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign in with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default FirebaseLogin;
