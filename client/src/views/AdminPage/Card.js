import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import StarBorder from '@mui/icons-material/StarBorder';
import AccessTime from '@mui/icons-material/AccessTime';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowRight';
export default function RecipeReviewCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [obj, setObj] = React.useState(props.data);
    const [open, setOpen] = React.useState(false);
    var arraySplitForStartTime = obj.startTime.split('T');
    arraySplitForStartTime[1] = arraySplitForStartTime[1].substring(0, arraySplitForStartTime[1].length - 5).split(':');
    var arraySplitForEndTime = obj.endTime.split('T');
    arraySplitForEndTime[1] = arraySplitForEndTime[1].substring(0, arraySplitForEndTime[1].length - 5).split(':');
    arraySplitForStartTime[0] = arraySplitForStartTime[0].split('-').reverse();
    arraySplitForEndTime[0] = arraySplitForEndTime[0].split('-').reverse();
    console.log(arraySplitForEndTime[1], 'hue');
    if (arraySplitForStartTime[1][0] > '12') {
        arraySplitForStartTime[1][0] = (parseInt(arraySplitForStartTime[1][0]) - 12).toString();
        arraySplitForStartTime[1].push('PM');
    } else {
        arraySplitForStartTime[1].push('AM');
    }
    if (arraySplitForEndTime[1][0] > '12') {
        arraySplitForEndTime[1][0] = (parseInt(arraySplitForEndTime[1][0]) - 12).toString();
        arraySplitForEndTime[1].push('PM');
    } else {
        arraySplitForEndTime[1].push('AM');
    }
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            {console.log(arraySplitForStartTime, arraySplitForEndTime)}
            <Card sx={{ maxWidth: 345, backgroundColor: '#E3F2FD' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={obj.reason + ' ~~ Reason For Booking'}
                    subheader={`Booked by ${obj.bookedBy.userName}`}
                />
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <AccessTime />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="heading">Click to see booking timings</Typography>
                    </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText style={{ paddingLeft: '0px' }}>
                                <Typography variant="heading">{`Start Date for booking =  `}</Typography>

                                <Typography variant="subHeading">{`${arraySplitForStartTime[0][0]} : ${arraySplitForStartTime[0][1]} : ${arraySplitForStartTime[0][2]}`}</Typography>
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText style={{ paddingLeft: '0px' }}>
                                <Typography variant="heading">{`Start Time for booking =  `}</Typography>

                                <Typography variant="subHeading">
                                    {`${arraySplitForStartTime[1][0]}:${arraySplitForStartTime[1][1]}:${arraySplitForStartTime[1][2]} ${arraySplitForStartTime[1][3]}`}{' '}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText style={{ paddingLeft: '0px' }}>
                                <Typography variant="heading">{`End Date for booking =  `}</Typography>

                                <Typography variant="subHeading">{`${arraySplitForEndTime[0][0]} : ${arraySplitForEndTime[0][1]} : ${arraySplitForEndTime[0][2]}`}</Typography>
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText style={{ paddingLeft: '0px' }}>
                                <Typography variant="heading">{`End Time for booking =  `}</Typography>

                                <Typography variant="subHeading">
                                    {`${arraySplitForEndTime[1][0]}:${arraySplitForEndTime[1][1]}:${arraySplitForEndTime[1][2]} ${arraySplitForEndTime[1][3]}`}{' '}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Collapse>
                <CardActions disableSpacing>
                    {props.el} &nbsp;
                    {props.el2}
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp
                            and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large
                            plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                            salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and
                            remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until
                            most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels,
                            tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just
                            tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
}
