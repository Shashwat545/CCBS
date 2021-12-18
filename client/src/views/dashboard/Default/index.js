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
        <>
            <Form />
        </>
    );
};

export default Dashboard;
