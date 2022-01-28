import * as React from 'react';
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/lab/AlertTitle';
import { Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import DeviceIdentifier from './DeviceIdentifier';
import { Card, CardContent, Divider } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios';
export default function MaterialUIPickers() {
    var localDate = new Date();
    const navigate = useNavigate();

    const [ReasonForRegistration, setReasonForRegistration] = React.useState('');
    const [DisplayNotificationDate, setDisplayNotificationDate] = React.useState(false);

    const [DisplayNotificationReason, setDisplayNotificationReason] = React.useState(false);
    const [DisplayNotificationTime, setDisplayNotificationTime] = React.useState(false);
    const [StartTimeTouch, setStartTimeTouch] = React.useState(false);
    const [ReasonTouch, setReasonTouch] = React.useState(true);
    const [ButtonValidator, setButtonValidator] = React.useState(false);
    const [ButtonValidator1, setButtonValidator1] = React.useState(false);
    const [EndTimeTouch, setEndTimeTouch] = React.useState(false);
    const [StartDateTouch, setStartDateTouch] = React.useState(false);
    const [EndDateTouch, setEndDateTouch] = React.useState(false);
    const [isFormValidate, setFormValidate] = React.useState(false);
    const [StartDateForEvent, setStartDateForEvent] = React.useState(
        new Date(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            localDate.getHours(),
            localDate.getMinutes(),
            localDate.getSeconds()
        )
    );
    const [EndDateForEvent, setEndDateForEvent] = React.useState(
        new Date(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            localDate.getHours(),
            localDate.getMinutes(),
            localDate.getSeconds()
        )
    );
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setDisplayNotificationDate(false);
    };
    const handleCloseTime = (event, reason) => {
        if (reason === 'clickaway') return;
        setDisplayNotificationTime(false);
    };

    const ValidatorForDates = (StartDate, EndDate) => {
        var Possiblilty = true;
        if (StartDate.getFullYear() > EndDate.getFullYear()) Possiblilty = false;
        else if (StartDate.getFullYear() === EndDate.getFullYear()) {
            if (StartDate.getMonth() > EndDate.getMonth()) Possiblilty = false;
            else if (StartDate.getMonth() === EndDate.getMonth()) {
                if (StartDate.getDate() > EndDate.getDate()) {
                    Possiblilty = false;
                } else {
                    Possiblilty = true;
                }
            } else {
                Possiblilty = true;
            }
        } else {
            Possiblilty = true;
        }
        if (Possiblilty) {
            setDisplayNotificationDate(false);
            setButtonValidator1(false);
        } else {
            setDisplayNotificationDate(true);

            setButtonValidator1(true);
        }

        ValidatorForTime(StartDate, EndDate, Possiblilty);
    };
    const ValidatorForTime = (StartDate, EndDate, Possiblilty) => {
        const StartHour = StartDate.getHours();
        Possiblilty = true;
        const EndHour = EndDate.getHours();
        const StartMinute = StartDate.getMinutes();
        const EndMinute = EndDate.getMinutes();
        const StartSecond = StartDate.getHours();
        const EndSecond = EndDate.getMinutes();
        if (StartDate.getDate() >= EndDate.getDate()) {
            if (StartHour > EndHour) Possiblilty = false;
            else if (StartHour === EndHour) {
                if (StartMinute > EndMinute) Possiblilty = false;
                else if (StartMinute === EndMinute) {
                    if (StartSecond >= EndSecond) Possiblilty = false;
                    else Possiblilty = true;
                } else {
                    Possiblilty = true;
                }
            } else Possiblilty = true;
        }
        if (Possiblilty) {
            setDisplayNotificationTime(false);
            setButtonValidator(false);
        } else {
            setDisplayNotificationTime(true);

            setButtonValidator(true);
        }
    };

    const SetHandleChangeForStartEvent = (newValue) => {
        setStartDateForEvent(newValue);
        setStartDateTouch(true);
        setEndDateTouch(false);

        if (newValue && EndDateForEvent) ValidatorForDates(newValue, EndDateForEvent);
    };
    const SetHandleChangeForEndEvent = (newValue) => {
        setEndDateForEvent(newValue);
        setEndDateTouch(true);
        setStartDateTouch(false);
        if (newValue && StartDateForEvent) ValidatorForDates(StartDateForEvent, newValue);
    };
    const SetHandleChangeForStartEventForTime = (newValue) => {
        setStartDateForEvent(newValue);
        setStartTimeTouch(true);
        setEndTimeTouch(false);

        if (newValue && EndDateForEvent) ValidatorForDates(newValue, EndDateForEvent);
    };
    const SetHandleChangeForEndEventForTime = (newValue) => {
        setEndDateForEvent(newValue);
        setEndTimeTouch(true);
        setStartTimeTouch(false);
        if (newValue && StartDateForEvent) ValidatorForDates(StartDateForEvent, newValue);
    };
    const handleOnchangeTextBox = (event) => {
        setReasonForRegistration(event.target.value);
        setReasonTouch(true);
    };

    const submitFormBtnHandler = async () => {
        const body = {
            startTime: StartDateForEvent,
            endTime: EndDateForEvent,
            reason: ReasonForRegistration
        };

        const isFormValidated =
            !DisplayNotificationDate &&
            !StartDateTouch &&
            !DisplayNotificationDate &&
            !EndDateTouch &&
            !DisplayNotificationTime &&
            !StartTimeTouch &&
            !DisplayNotificationTime &&
            !EndTimeTouch &&
            DisplayNotificationReason;

        if (!ReasonForRegistration) return;

        try {
            const data = await axios.post('http://localhost:8000/api/v1/bookings/createBooking', body);

            //Add in the userBooking also
        } catch (err) {
            //Navigate on error page
            console.log(err, 'EERRR');
        }
        setFormValidate(isFormValidated);
    };
    function requestSubmitted() {
        if (!ReasonForRegistration) {
            setDisplayNotificationReason(true);
        } else {
            setDisplayNotificationReason(false);
        }
        // console.log(StartDateForEvent, EndDateForEvent, ReasonForRegistration);
        submitFormBtnHandler();
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <div style={{ display: 'flex', justifyContent: 'left', paddingLeft: '18px' }}>
                    {' '}
                    <Typography variant="h1">Slot Booking</Typography>
                </div>
                <Grid item sx={{ backgroundColor: '', width: '100%' }}>
                    <DeviceIdentifier isMobile={true} isTablet={true}>
                        <Card>
                            <CardContent style={{}} xs={12} sm={12}>
                                <Stack spacing={4}>
                                    <MobileDatePicker
                                        label="Start Date For the event"
                                        inputFormat="dd/MM/yyyy"
                                        value={StartDateForEvent}
                                        onChange={SetHandleChangeForStartEvent}
                                        variant="outlined"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {DisplayNotificationDate && StartDateTouch ? (
                                        <>
                                            {' '}
                                            <Alert sx={{ mt: 0, mx: 'auto', mb: 0, border: 'blue' }} severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                Start Date is more than End Date
                                            </Alert>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <MobileDatePicker
                                        label="End Date For the event"
                                        inputFormat="dd/MM/yyyy"
                                        value={EndDateForEvent}
                                        onChange={SetHandleChangeForEndEvent}
                                        variant="outlined"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {DisplayNotificationDate && EndDateTouch ? (
                                        <>
                                            {' '}
                                            <Alert sx={{ mt: 2, mx: 'auto', mb: '0' }} severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                End Date is less than Start Date
                                            </Alert>
                                            {/* {console.log(DisplayNotificationDate, 'ok', EndDateTouch)} */}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <MobileTimePicker
                                        label="Start Time for the event"
                                        value={StartDateForEvent}
                                        onChange={SetHandleChangeForStartEventForTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {DisplayNotificationTime && StartTimeTouch ? (
                                        <>
                                            {' '}
                                            <Alert sx={{ mt: 2, mx: 'auto', mb: '0' }} severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                Start Time more than End Time
                                            </Alert>
                                            {/* {console.log(DisplayNotificationTime, 'ok start Time', EndDateTouch)} */}
                                        </>
                                    ) : (
                                        <></>
                                    )}{' '}
                                    <MobileTimePicker
                                        label="End Time for the event"
                                        value={EndDateForEvent}
                                        onChange={SetHandleChangeForEndEventForTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {DisplayNotificationTime && EndTimeTouch ? (
                                        <>
                                            {' '}
                                            <Alert sx={{ mt: 2, mx: 'auto', mb: '0' }} severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                End Time is less than Start Time
                                            </Alert>
                                            {/* {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)} */}
                                        </>
                                    ) : (
                                        <></>
                                    )}{' '}
                                    {/* {console.log('TEXT FOR MOBILE =', ReasonForRegistration)} */}
                                    <TextField
                                        id="outlined-textarea"
                                        onChange={(e) => handleOnchangeTextBox(e)}
                                        label="Reason for booking slot"
                                        variant="outlined"
                                        multiline
                                        value={ReasonForRegistration}
                                    />
                                    {DisplayNotificationReason && ReasonTouch ? (
                                        <>
                                            {' '}
                                            <Alert sx={{ mt: 2, mx: 'auto', mb: '0' }} severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                Reason Can't be empty
                                            </Alert>
                                            {/* {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)} */}
                                        </>
                                    ) : (
                                        <></>
                                    )}{' '}
                                    <Divider />
                                    <ListItem style={{ justifyContent: 'center' }}>
                                        {' '}
                                        <Button
                                            disabled={ButtonValidator || ButtonValidator1}
                                            variant="contained"
                                            // href="www.iitbbs.ac.in"
                                            onClick={requestSubmitted}
                                            style={{ maxWidth: '500px', minWidth: '300px' }}
                                        >
                                            Submit
                                        </Button>
                                    </ListItem>
                                </Stack>
                            </CardContent>
                        </Card>
                    </DeviceIdentifier>
                </Grid>
                <Grid item xs={3}>
                    <DeviceIdentifier isDesktop={true}>
                        <Card style={{ maxWidth: '750px', backgroundColor: '' }}>
                            <CardContent>
                                <Stack direction="column" spacing={3} style={{ width: 'auto', backgroundColor: 'white' }}>
                                    <ListItem>
                                        <Grid container spacing={7}>
                                            <Grid item xs={6} md={6}>
                                                <DatePicker
                                                    label="Start date for the event"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={StartDateForEvent}
                                                    onChange={SetHandleChangeForStartEvent}
                                                    variant="outlined"
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                                {DisplayNotificationDate && StartDateTouch ? (
                                                    <>
                                                        <div style={{ paddingLeft: '0px', paddingRight: '35px', backgroundColor: '' }}>
                                                            {' '}
                                                            <Alert
                                                                sx={{ mt: 2, mx: 'auto', mb: '0', maxWidth: '270px', paddingLeft: '4px' }}
                                                                severity="error"
                                                            >
                                                                <AlertTitle>Error</AlertTitle>
                                                                Start Date is more than End Date
                                                            </Alert>
                                                            {/* {console.log(DisplayNotificationDate, StartDateTouch)}{' '} */}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}

                                                {/* {console.log(TextField)} */}
                                            </Grid>
                                            <Grid item md={6} xs={6}>
                                                <DatePicker
                                                    label="End date for the event"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={EndDateForEvent}
                                                    onChange={SetHandleChangeForEndEvent}
                                                    variant="outlined"
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                {DisplayNotificationDate && EndDateTouch ? (
                                                    <>
                                                        <div style={{ paddingLeft: '0px', paddingRight: '35px', backgroundColor: '' }}>
                                                            {' '}
                                                            <Alert
                                                                sx={{ mt: 2, mx: 'auto', mb: '0', maxWidth: '270px', paddingLeft: '4px' }}
                                                                severity="error"
                                                            >
                                                                <AlertTitle>Error</AlertTitle>
                                                                End Date is less than Start Date
                                                            </Alert>
                                                            {/* {console.log(DisplayNotificationDate, 'ok', EndDateTouch)} */}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <TimePicker
                                                    label="Start Time for the Event"
                                                    value={StartDateForEvent}
                                                    onChange={SetHandleChangeForStartEventForTime}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                {DisplayNotificationTime && StartTimeTouch ? (
                                                    <>
                                                        <div style={{ paddingLeft: '0px', paddingRight: '35px', backgroundColor: '' }}>
                                                            {' '}
                                                            <Alert
                                                                sx={{ mt: 2, mx: 'auto', mb: '0', maxWidth: '270px', paddingLeft: '4px' }}
                                                                severity="error"
                                                            >
                                                                <AlertTitle>Error</AlertTitle>
                                                                Start Time more than End time
                                                            </Alert>
                                                            {/* {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)} */}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}{' '}
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <TimePicker
                                                    label="End Time for the Event"
                                                    value={EndDateForEvent}
                                                    onChange={SetHandleChangeForEndEventForTime}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                {DisplayNotificationTime && EndTimeTouch ? (
                                                    <div style={{ paddingLeft: '0px', paddingRight: '35px', backgroundColor: '' }}>
                                                        {' '}
                                                        <Alert
                                                            sx={{ mt: 2, mx: 'auto', mb: '0', maxWidth: '270px', paddingLeft: '4px' }}
                                                            severity="error"
                                                        >
                                                            <AlertTitle>Error</AlertTitle>
                                                            End Time is less than Start Time
                                                        </Alert>
                                                        {/* {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)} */}
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}{' '}
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem style={{ backgroundColor: '', maxWidth: '671px' }}>
                                        {/* {console.log('TEXT FOR DESKTOP =', ReasonForRegistration)} */}
                                        <TextField
                                            id="outlined-textarea"
                                            onChange={(e) => handleOnchangeTextBox(e)}
                                            value={ReasonForRegistration}
                                            label="Reason for booking slot"
                                            variant="outlined"
                                            multiline
                                            style={{ width: '100%' }}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        {DisplayNotificationReason && ReasonTouch ? (
                                            <>
                                                {' '}
                                                <Alert sx={{ mt: 2, mx: 'auto', mb: '0' }} severity="error">
                                                    <AlertTitle>Error</AlertTitle>
                                                    Reason Can't be empty
                                                </Alert>
                                                {/* {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)} */}
                                            </>
                                        ) : (
                                            <></>
                                        )}{' '}
                                    </ListItem>
                                    <Divider dark />
                                    <ListItem style={{ justifyContent: 'center' }}>
                                        {' '}
                                        <Button
                                            variant="contained"
                                            // href="www.iitbbs.ac.in"
                                            style={{ maxWidth: '500px', minWidth: '300px' }}
                                            disabled={ButtonValidator || ButtonValidator1}
                                            onClick={requestSubmitted}
                                        >
                                            Submit
                                        </Button>
                                    </ListItem>
                                </Stack>
                            </CardContent>
                        </Card>
                    </DeviceIdentifier>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}
