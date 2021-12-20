import { useEffect, useState } from 'react';


import Form from './Form';

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
