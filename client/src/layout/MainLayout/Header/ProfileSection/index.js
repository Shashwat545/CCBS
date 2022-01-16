import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';
import IITBBS from 'assets/images/IITBBS.png';
import logoutUser from 'services/logoutUser';
// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import LogOut from './LogOut';
import { createTheme } from '@mui/material/styles';
// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#f44336',
                contrastText: '#fff'
            },
            error: {
                light: '#FFFFFF',
                main: '#2196f3'
            },
            onHover: {
                borderColor: '',
                mainColor: '',
                backgroundColor: ''
            }
        }
    });
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/free/pages/login/login3');
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    function handleOnclick(e) {
        console.log(e);
    }
    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.neutral.light,
                    backgroundColor: theme.palette.neutral.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.error.main,
                        background: `${theme.palette.error.main}!important`,
                        color: theme.palette.error.light,
                        '& svg': {
                            stroke: theme.palette.error.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={IITBBS} //google image will be here
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<LogOut theme={theme.palette.neutral.light} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleLogout}
                color="primary"
            />
            {console.log('okie', theme.palette.error.main)}
        </>
    );
};

export default ProfileSection;
