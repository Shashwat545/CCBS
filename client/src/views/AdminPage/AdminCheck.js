import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DeviceIdentifier from './DeviceIdentifier';
import { Card, CardContent, Divider } from '@mui/material';
import Cardx from './Card';
import { Typography } from '@mui/material';
import { Zoom } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { TransitionGroup } from 'react-transition-group';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function MaterialUIPickers() {
    const [InputArr, setInputArr] = React.useState(['Prateek', 'Sashwat', 'Omkar', 'Ritik']);
    const [CollapseChecker1, setCollapseChecker1] = React.useState(false);
    const [requestFromAdmins, setrequestFromAdmins] = React.useState([]);
    const [requestFromNonAdmins, setrequestFromNonAdmins] = React.useState([]);
    const [adminDisplay, setadminDisplay] = React.useState(false);
    const [nonAdminDisplay, setNonAdminDisplay] = React.useState(false);
    const [CollapseChecker2, setCollapseChecker2] = React.useState(false);

    useEffect(() => {
        const getData = () => {
            axios
                .get('http://localhost:8000/api/v1/bookings/', { withCredentials: true })
                .then((res) => {
                    setrequestFromAdmins(res.data);
                    console.log(res.data);
                    var dk = [];
                    for (let i in res.data) {
                        console.log(res.data[i], 'hello ');
                        var hasmap = {};
                        hasmap['pending'] = 0;
                        hasmap['accepted'] = 0;
                        for (let j in res.data[i].approvedBy) {
                            hasmap[res.data[i].approvedBy[j]] += 1;
                            console.log(typeof res.data[i].approvedBy[j], 'hue');
                        }
                        console.log(hasmap);
                        if (hasmap['pending'] != 3) dk.push(res.data[i]);
                    }
                    var nonAdmin = [];
                    var admin = [];
                    for (let i in dk) {
                        if (dk[i].bookedBy.role === 'student') nonAdmin.push(dk[i]);
                        else admin.push(dk[i]);
                    }
                    console.log('dk=', dk);
                    setrequestFromAdmins(admin);
                    setrequestFromNonAdmins(nonAdmin);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getData();
    }, []);

    const handleRemoveItem = async (event) => {
        const value = event.nativeEvent.target.value;
        if (value) {
            const status = value.split(' ')[0];
            const bookingId = value.split(' ')[1];
            const data = await axios.get(`http://localhost:8000/api/v1/approval/${status}/${bookingId}`);

            //This is not working in any case delete only last booking
            // setrequestFromAdmins((prev) => [...prev.filter((i) => i._id.toString() !== bookingId)]);
        }
    };
    let dk = 0;
    function renderItem({ item, handleRemoveItem }) {
        dk += 1;
        return (
            <Collapse style={{ paddingBottom: '10px' }} in={adminDisplay} easing={{ enter: `${dk * 10} `, exit: `${dk * 10}` }}>
                <Cardx
                    el={
                        <>
                            {' '}
                            <Button variant="outlined" value={`reject ${item._id}`} onClick={() => handleRemoveItem(item)}>
                                {' Reject Request     '} &nbsp;
                                <DeleteIcon />
                            </Button>
                        </>
                    }
                    el2={
                        <>
                            <Button variant="outlined" value={`accept ${item._id}`} onClick={() => handleRemoveItem(item)}>
                                {'Accept Request'} &nbsp; <CheckIcon />
                            </Button>
                        </>
                    }
                    data={item}
                />
            </Collapse>
        );
    }
    function renderItemForNonAdmins({ item, handleRemoveItem }) {
        dk += 1;

        return (
            <Collapse style={{ paddingBottom: '10px' }} in={nonAdminDisplay} easing={{ enter: `${dk * 10} `, exit: `${dk * 10}` }}>
                <Cardx
                    el={
                        <>
                            {' '}
                            <Button variant="outlined" onClick={() => handleRemoveItem(item)}>
                                {' Reject Request     '} &nbsp;
                                <DeleteIcon />
                            </Button>
                        </>
                    }
                    el2={
                        <>
                            {' '}
                            <Button variant="outlined" onClick={() => handleRemoveItem(item)}>
                                {'Accept Request'} &nbsp;
                                <CheckIcon />
                            </Button>
                        </>
                    }
                    data={item}
                />
            </Collapse>
        );
    }

    function CallBackFunc(el) {
        return (
            <>
                <ListItem>{/*<Cardx /> */}</ListItem>
            </>
        );
    }
    function AnotherCallBackFunc(el) {
        return (
            <>
                <Grid item xs={11}>
                    {/* <Cardx />*/}
                </Grid>
            </>
        );
    }
    function handleClickAdmins() {
        dk = 0;
        console.log('handle click admin pressed');
        setadminDisplay(!adminDisplay);
    }
    return (
        <>
            <DeviceIdentifier isMobile={true} isTablet={true}>
                <Grid container justifyContent="center">
                    <Card style={{ display: 'inline-block', maxWidth: '345' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'left', paddingLeft: '18px' }}>
                                {' '}
                                <Typography variant="h1">Pending Requests </Typography>
                            </div>
                            <div
                                style={{
                                    paddingLeft: '18px',
                                    justifyContent: 'right',
                                    paddingTop: '20px',
                                    paddingBottom: '20px'
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        handleClickAdmins();
                                    }}
                                    variant="outlined"
                                >
                                    Pending Requests from Profs
                                </Button>
                            </div>
                            <Stack spacing={1} style={{ backgroundColor: '' }}>
                                <TransitionGroup>
                                    {requestFromAdmins.map((item) => adminDisplay && item && renderItem({ item, handleRemoveItem }))}
                                </TransitionGroup>
                            </Stack>
                            <div
                                style={{
                                    paddingLeft: '20px',
                                    justifyContent: 'right',
                                    paddingTop: '20px',
                                    paddingBottom: '20px'
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        dk = 0;
                                        setNonAdminDisplay(!nonAdminDisplay);
                                    }}
                                    variant="outlined"
                                >
                                    Pending Requests from non-Admins
                                </Button>
                            </div>
                            <Stack spacing={1}>
                                <TransitionGroup>
                                    {requestFromNonAdmins.map((item) =>
                                        adminDisplay && item ? renderItem({ item, handleRemoveItem }) : <></>
                                    )}
                                </TransitionGroup>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </DeviceIdentifier>
            <DeviceIdentifier isDesktop={true}>
                {console.log('FOR DESKTOP')}
                <div style={{ alignItems: 'center', backgroundColor: '', justifyContent: 'center', display: 'flex' }}>
                    <Card style={{ backgroundColor: '', display: 'inline-block' }}>
                        <CardContent style={{ backgroundColor: '', display: 'inline-block' }}>
                            <Stack direction="column" spacing={1} style={{ maxWidth: '950px', backgroundColor: '' }}>
                                <div style={{ display: 'flex', paddingLeft: '1px' }}>
                                    {' '}
                                    <Typography variant="h1">Pending Requests</Typography>
                                </div>
                                <Grid
                                    container
                                    spacing={9}
                                    style={{ backgroundColor: '', paddingLeft: '', width: 'auto', backgroundColor: '' }}
                                >
                                    <Grid item xs={6} style={{ backgroundColor: '', paddingLeft: '0px', width: 'auto' }}>
                                        <Grid container spacing={9}></Grid>
                                        <Grid
                                            container
                                            spacing={2}
                                            style={{
                                                backgroundColor: ''
                                            }}
                                        >
                                            <Grid item xs={12}>
                                                <div
                                                    style={{
                                                        display: '',
                                                        paddingRight: '2vw',
                                                        justifyContent: 'right',
                                                        paddingTop: '20px'
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            handleClickAdmins();
                                                        }}
                                                        variant="outlined"
                                                    >
                                                        Pending Requests from Profs
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} style={{ backgroundColor: '' }}>
                                                <TransitionGroup>
                                                    {requestFromAdmins.map((item) =>
                                                        adminDisplay && item
                                                            ? renderItem({ item, handleRemoveItem })
                                                            : adminDisplay && <p>No to Show</p>
                                                    )}
                                                </TransitionGroup>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} style={{ backgroundColor: '', paddingTop: '0px' }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            style={{
                                                backgroundColor: ''
                                            }}
                                        >
                                            <Grid item xs={12}>
                                                <div
                                                    style={{
                                                        display: '',
                                                        paddingRight: '2vw',
                                                        justifyContent: 'right',
                                                        paddingTop: '20px'
                                                    }}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => {
                                                            dk = 0;
                                                            setNonAdminDisplay(!nonAdminDisplay);
                                                        }}
                                                    >
                                                        Pending Requests from non-Admins
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} style={{ backgroundColor: '' }}>
                                                <TransitionGroup>
                                                    {requestFromNonAdmins.map((item) =>
                                                        adminDisplay && item ? renderItemForNonAdmins({ item, handleRemoveItem }) : <></>
                                                    )}
                                                </TransitionGroup>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                </div>
            </DeviceIdentifier>
        </>
    );
}
