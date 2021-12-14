import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Form from './Form';
import DeviceIdentifier from './DeviceIdentifier';
const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <DeviceIdentifier isMobile={true} isTablet={true}>
                <Grid item xs={12}>
                    <Form />
                </Grid>
            </DeviceIdentifier>
            <DeviceIdentifier isDesktop={true}>
                <Grid item xs={6}>
                    <Form />
                </Grid>
            </DeviceIdentifier>
        </Grid>
    );
};

export default Dashboard;
