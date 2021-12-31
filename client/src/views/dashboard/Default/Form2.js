import * as React from 'react';
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
export default function MaterialUIPickers() {
    var localDate = new Date();
    console.log('L', localDate);
    const [ReasonForRegistration, setReasonForRegistration] = React.useState('');
    const [DisplayNotificationDate, setDisplayNotificationDate] = React.useState(false);
    const [DisplayNotificationTime, setDisplayNotificationTime] = React.useState(false);
    const [StartTimeTouch, setStartTimeTouch] = React.useState(false);
    const [ButtonValidator, setButtonValidator] = React.useState(false);
    const [ButtonValidator1, setButtonValidator1] = React.useState(false);
    const [EndTimeTouch, setEndTimeTouch] = React.useState(false);
    const [StartDateTouch, setStartDateTouch] = React.useState(false);
    const [EndDateTouch, setEndDateTouch] = React.useState(false);
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
        console.log('Pinch of salT', event.target.value);
        setReasonForRegistration(event.target.value);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DeviceIdentifier isMobile={true} isTablet={true}>
                <Grid container justify="center">
                    <Card style={{ display: 'inline-block' }}>
                        <CardContent>
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
                                        {console.log(DisplayNotificationDate, StartDateTouch)}{' '}
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
                                        {console.log(DisplayNotificationDate, 'ok', EndDateTouch)}
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
                                        {console.log(DisplayNotificationTime, 'ok start Time', EndDateTouch)}
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
                                        {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)}
                                    </>
                                ) : (
                                    <></>
                                )}{' '}
                                {console.log('TEXT FOR MOBILE =', ReasonForRegistration)}
                                <TextField
                                    id="outlined-textarea"
                                    onChange={(e) => handleOnchangeTextBox(e)}
                                    label="Reason for booking slot"
                                    variant="outlined"
                                    multiline
                                    value={ReasonForRegistration}
                                />
                                <Divider />
                                <ListItem style={{ justifyContent: 'center' }}>
                                    <Button
                                        disabled={ButtonValidator || ButtonValidator1}
                                        variant="contained"
                                        href="www.iitbbs.ac.in"
                                        style={{ maxWidth: '500px', minWidth: '300px' }}
                                    >
                                        Submit
                                    </Button>
                                </ListItem>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </DeviceIdentifier>
            <DeviceIdentifier isDesktop={true}>
                <Grid container justify="center">
                    <Card style={{ width: '750px' }}>
                        <CardContent>
                            <Stack direction="column" spacing={3} style={{ width: 'auto', backgroundColor: 'white' }}>
                                <ListItem>
                                    <Grid container spacing={7}>
                                        <Grid item xs={6} md={6}>
                                            <DatePicker
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
                                                    <Alert sx={{ mt: 2, mx: 'auto', mb: '0' }} severity="error">
                                                        <AlertTitle>Error</AlertTitle>
                                                        Start Date is more than End Date
                                                    </Alert>
                                                    {console.log(DisplayNotificationDate, StartDateTouch)}{' '}
                                                </>
                                            ) : (
                                                <></>
                                            )}

                                            {console.log(TextField)}
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <DatePicker
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
                                                    {console.log(DisplayNotificationDate, 'ok', EndDateTouch)}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TimePicker
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
                                                        Start Time more than End time
                                                    </Alert>
                                                    {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)}
                                                </>
                                            ) : (
                                                <></>
                                            )}{' '}
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TimePicker
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
                                                    {console.log(DisplayNotificationTime, 'ok End Time', EndDateTouch)}
                                                </>
                                            ) : (
                                                <></>
                                            )}{' '}
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    {console.log('TEXT FOR DESKTOP =', ReasonForRegistration)}
                                    <TextField
                                        id="outlined-textarea"
                                        onChange={(e) => handleOnchangeTextBox(e)}
                                        value={ReasonForRegistration}
                                        label="Reason for booking slot"
                                        variant="outlined"
                                        multiline
                                        style={{ width: '97%' }}
                                    />
                                </ListItem>
                                <Divider dark />
                                <ListItem style={{ justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        href="www.iitbbs.ac.in"
                                        style={{ maxWidth: '500px', minWidth: '300px' }}
                                        disabled={ButtonValidator || ButtonValidator1}
                                    >
                                        Submit
                                    </Button>
                                </ListItem>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </DeviceIdentifier>
        </LocalizationProvider>
    );
}
