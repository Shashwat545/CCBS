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
import axiosInstance from '../../services/axiosInstance';
import BookingHistory from './BookingHistory';

// =========================z=====|| PROFILE PAGE ||============================== //

const ProfilePage = () => {
    const [isLoading, setLoading] = useState(true);
    const [fields, updateFields] = useState({});

    useEffect(() => {
        setLoading(false);
        const loadBookingHandler = async () => {
            //Fetching the data of user and it's booking

            //Dummy user
            const userId = '61cac6fe09d781b9ce072bf3';
            //Original user we will get original id from login page when user is loggedin
            const response = await axiosInstance.get('http://localhost:8000/api/v1/user/me/');
            updateFields(response.data);
        };
        loadBookingHandler();
    }, [updateFields]);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    let bookingContent = <p>Nothing to Show</p>;

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={4}>
                    <MainCard>
                        <Grid container direction="column" spacing={1}>
                            <Grid item align="center">
                                <MuiTypography variant="h1" gutterBottom>
                                    User Profile
                                </MuiTypography>
                                <br />
                                <img src={User_DP} alt="User Profile" width="100px" style={{ borderRadius: '50%' }} />
                                <MuiTypography variant="h1" gutterBottom></MuiTypography>
                            </Grid>
                            <Grid item>
                                <div className="container">
                                    <FormikForm fields={fields} updateFields={updateFields} />
                                </div>
                                <MuiTypography variant="h1" gutterBottom></MuiTypography>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {!isEmpty(fields) && fields.bookings.length > 0 ? (
                        <BookingHistory bookingData={fields.bookings} />
                    ) : (
                        <p>Nothing to show</p>
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ProfilePage;
