import * as React from 'react';
import Stack from '@mui/material/Stack';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import DeviceIdentifier from './DeviceIdentifier';
import { withStyles } from '@mui/material';
import { Card, CardContent, Divider } from '@mui/material';

export default function MaterialUIPickers() {
    const styles = (muiBaseTheme) => ({
        card: {
            margin: 'auto',
            transition: '0.3s',
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
            '&:hover': {
                boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
            }
        },
        media: {
            paddingTop: '56.25%'
        },
        content: {
            textAlign: 'left',
            padding: muiBaseTheme.spacing.unit * 3
        },
        divider: {
            margin: `${muiBaseTheme.spacing.unit * 3}px 0`
        },
        heading: {
            fontWeight: 'bold'
        },
        subheading: {
            lineHeight: 1.8
        }
    });

    var localDate = new Date();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    var MessageForAlert1 = "End of Event Date can't be less than Start of Event Date";
    var MessageForAlert = "Event End Time can't be less than Event Start time";
    const [ReasonForRegistration, setReasonForRegistration] = React.useState('');
    const [DisplayNotificationDate, setDisplayNotificationDate] = React.useState(false);
    const [DisplayNotificationTime, setDisplayNotificationTime] = React.useState(false);
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
        console.log('ok', EndDate.getDate(), StartDate.getDate());
        const Possiblilty = EndDate.getDate() >= StartDate.getDate();
        if (Possiblilty) {
            if (EndDate.getDate() > StartDate.getDate());
            setDisplayNotificationDate(false);

            if (EndDate.getDate() === StartDate.getDate()) {
                console.log('OK TIME CHECK');
                ValidatorForTime(StartDate, EndDate);
            }
        } else {
            setDisplayNotificationDate(true);
            setEndDateForEvent(StartDate);
        }
    };
    const ValidatorForTime = (StartDate, EndDate) => {
        var Possiblilty = true;
        const StartHour = StartDate.getHours();
        const EndHour = EndDate.getHours();
        const StartMinute = StartDate.getMinutes();
        const EndMinute = EndDate.getMinutes();
        const StartSecond = StartDate.getHours();
        const EndSecond = EndDate.getMinutes();
        if (StartDate.getDate() === EndDate.getDate())
            if (StartHour > EndHour) Possiblilty = false;
            else if (StartMinute > EndMinute) Possiblilty = false;
            else if (StartSecond > EndSecond) Possiblilty = false;
        if (Possiblilty) setDisplayNotificationDate(false);
        else {
            setDisplayNotificationTime(true);
            console.log('SSS', 'StartDate= ', StartDate, 'EndDate =', EndDate);
            setEndDateForEvent(StartDate);
        }
    };

    const SetHandleChangeForStartEvent = (newValue) => {
        setStartDateForEvent(newValue);
        ValidatorForDates(newValue, EndDateForEvent);
    };
    const SetHandleChangeForEndEvent = (newValue) => {
        setEndDateForEvent(newValue);
        ValidatorForDates(StartDateForEvent, newValue);
    };
    const handleOnchangeTextBox = (event) => {
        console.log(event.target.value);
        setReasonForRegistration(event.target.value);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DeviceIdentifier isMobile={true} isTablet={true}>
                <Card className={styles.card} style={{ display: 'inline-block' }}>
                    <CardContent className={styles.content}>
                        <Stack spacing={4}>
                            <MobileDatePicker
                                label="Start Date For the event"
                                inputFormat="dd/MM/yyyy"
                                value={StartDateForEvent}
                                onChange={SetHandleChangeForStartEvent}
                                variant="outlined"
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <MobileDatePicker
                                label="End Date For the event"
                                inputFormat="dd/MM/yyyy"
                                value={EndDateForEvent}
                                onChange={SetHandleChangeForEndEvent}
                                variant="outlined"
                                renderInput={(params) => <TextField {...params} />}
                            />

                            <MobileTimePicker
                                label="Start Time for the event"
                                value={StartDateForEvent}
                                onChange={SetHandleChangeForStartEvent}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <MobileTimePicker
                                label="End Time for the event"
                                value={EndDateForEvent}
                                onChange={SetHandleChangeForEndEvent}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TextField
                                id="outlined-textarea"
                                onChange={(e) => handleOnchangeTextBox(e)}
                                label="Reason for booking slot"
                                variant="outlined"
                                multiline
                            />
                            <Divider className={styles.divider} dark />
                            <ListItem style={{ justifyContent: 'center' }}>
                                <Button variant="contained" href="www.iitbbs.ac.in" style={{ maxWidth: '500px', minWidth: '300px' }}>
                                    Submit
                                </Button>
                            </ListItem>
                        </Stack>
                    </CardContent>
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={DisplayNotificationDate}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '60%' }}>
                        {MessageForAlert1}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={DisplayNotificationTime}
                    autoHideDuration={6000}
                    onClose={handleCloseTime}
                >
                    <Alert onClose={handleCloseTime} severity="error" sx={{ width: '60%' }}>
                        {MessageForAlert}
                    </Alert>
                </Snackbar>
            </DeviceIdentifier>
            {console.log(window.screen.width)}
            <DeviceIdentifier isDesktop={true}>
                <Card className={styles.card} style={{ display: 'inline-block' }}>
                    <CardContent className={styles.content}>
                        <Stack direction="column" spacing={4}>
                            <ListItem>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            label="Start Date For the event"
                                            inputFormat="dd/MM/yyyy"
                                            value={StartDateForEvent}
                                            onChange={SetHandleChangeForStartEvent}
                                            variant="outlined"
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            label="End Date For the event"
                                            inputFormat="dd/MM/yyyy"
                                            value={EndDateForEvent}
                                            onChange={SetHandleChangeForEndEvent}
                                            variant="outlined"
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TimePicker
                                            label="Start Time for the event"
                                            value={StartDateForEvent}
                                            onChange={SetHandleChangeForStartEvent}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TimePicker
                                            label="End Time for the event"
                                            value={EndDateForEvent}
                                            onChange={SetHandleChangeForEndEvent}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-textarea"
                                            fullWidth
                                            label="Reason for booking slot"
                                            variant="outlined"
                                            multiline
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem style={{ justifyContent: 'center' }}>
                                <Button variant="contained" href="api/v1/booking" style={{ maxWidth: '500px', minWidth: '300px' }}>
                                    Submit
                                </Button>
                            </ListItem>
                        </Stack>
                    </CardContent>
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={DisplayNotificationDate}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '60%' }}>
                        {MessageForAlert1}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={DisplayNotificationTime}
                    autoHideDuration={6000}
                    onClose={handleCloseTime}
                >
                    <Alert onClose={handleCloseTime} severity="error" sx={{ width: '60%' }}>
                        {MessageForAlert}
                    </Alert>
                </Snackbar>
            </DeviceIdentifier>
        </LocalizationProvider>
    );
}
