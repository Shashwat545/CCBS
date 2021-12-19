import { useEffect, useState } from 'react';
import React from 'react';

// material-ui
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import User_DP from 'assets/images/User_Profile.png';
import App from './App';
import FormikForm from './FormikForm';

// =========================z=====|| PROFILE PAGE ||============================== //

const ProfilePage = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={4}>
                    <SubCard>
                        <Grid container direction="column" spacing={1}>
                            <Grid item align="center">
                                <img src={User_DP} alt="User Profile" width="100px" style={{ borderRadius: '50%' }} />
                                <MuiTypography variant="h1" gutterBottom></MuiTypography>
                            </Grid>
                            <Grid item>
                                <App />
                                <MuiTypography variant="h1" gutterBottom></MuiTypography>
                            </Grid>
                            <Grid item>
                                <MuiTypography variant="h3" gutterBottom></MuiTypography>
                            </Grid>
                            <Grid item>
                                <MuiTypography variant="h3" gutterBottom></MuiTypography>
                            </Grid>
                            <Grid item>
                                <MuiTypography variant="h3" gutterBottom></MuiTypography>
                            </Grid>
                            <Grid item>
                                <MuiTypography variant="h3" gutterBottom></MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <SubCard title="Booking History">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                </MuiTypography>
                            </Grid>
                            <Grid item>
                                <MuiTypography variant="subtitle2" gutterBottom>
                                    subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ProfilePage;
