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
import axios from 'axios';

// =========================z=====|| PROFILE PAGE ||============================== //

const ProfilePage = () => {
    const [isLoading, setLoading] = useState(true);
    const [fields, updateFields] = useState({});

    useEffect(() => {
        setLoading(false);
        const loadBookingHandler = async () => {
            //Fetching the data of user and it's booking

            //Dummy user
            const userId = '61b9d1dd4ce21a9d62a0f2a2';
            //Original user we will get original id from login page when user is loggedin
            const response = await axios.get(`http://localhost:8000/api/v1/user/getUser/${userId}`);
            updateFields(response.data);
        };
        loadBookingHandler();
    }, [updateFields]);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    let bookingContent = <p>Nothing to Show</p>;
    if (!isEmpty(fields))
        bookingContent = fields.bookings.map((booking) => {
            let status =" Accepted";
            for (const superAdmin in booking.approvedBy) {
                if (booking.approvedBy[superAdmin] === 'pending') {
                    status = 'Pending';
                    break;
                }
            }
            return (
                <Grid item xs={12} sm={8}>
                    <Grid container direction="column" spacing={1} key={booking._id}>
                        <Grid item>
                            <MuiTypography variant="subtitle1" gutterBottom>
                                {booking.startTime} {booking.endTime}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="subtitle2" gutterBottom>
                                {booking.reason}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="subtitle2" gutterBottom>
                                {status}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });

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
                                <div className="container">
                                    <FormikForm fields={fields} updateFields={updateFields} />
                                </div>
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
                <SubCard title="Booking History">{bookingContent}</SubCard>
            </Grid>
        </MainCard>
    );
};

export default ProfilePage;
