import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Modal} from 'react-bootstrap'
import {Button} from '@material-ui/core'
import {Redirect, Route, withRouter} from 'react-router-dom'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowChartIcon from '@material-ui/icons/ShowChart'
import SettingsIcon from '@material-ui/icons/Settings'
import GroupIcon from '@material-ui/icons/Group'
import MainDashboard from "./MainDashboard";
import {FlagIcon} from "react-flag-kit";
import switchLanguage from '../../service/i18nService';
import {useTranslation} from "react-i18next";
import ListSubheader from "@material-ui/core/ListSubheader";
import ControlPanel from "./ControlPanel";
import Permissions from "./Permissions";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Ivan Ryazantsev
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: '#fff'
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        color: "#fff"
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function ProfileModal(props) {
    const {t, i18n} = useTranslation();
    let username = localStorage.getItem("username");
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let accessLevel = localStorage.getItem("accessLevel");
    if (username === "null") {
        username = ''
    }
    if (firstName === "null") {
        firstName = ''
    }
    if (lastName === "null") {
        lastName = ''
    }
    if (accessLevel === "null") {
        accessLevel = ''
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("Profile")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6><b>{t("Username")}:</b> {username}</h6>
                    <h6><b>{t("First name")}:</b> {firstName}</h6>
                    <h6><b>{t("Last name")}:</b> {lastName}</h6>
                    <h6><b>{t("Access level")}:</b> {accessLevel}</h6>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{t("Close")}</Button>
            </Modal.Footer>
        </Modal>
    );
}


function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {t, i18n} = useTranslation();


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            {localStorage.getItem("jwtToken") !== null ? '' : <Redirect to="/login"/>}
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {t("Dashboard")}
                    </Typography>
                    <IconButton edge={"end"}
                                className={clsx(classes.menuButton)}
                                onClick={() => {
                                    switchLanguage();
                                }}>
                        <FlagIcon code={i18n.language === 'en' ? 'US' : 'UA'} size={32}/>
                    </IconButton>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setModalShow(true)}
                        className={clsx(classes.menuButton)}>
                        <PersonIcon/>
                    </IconButton>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => {
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('userId');
                            localStorage.removeItem('username');
                            localStorage.removeItem('firstName');
                            localStorage.removeItem('lastName');
                            localStorage.removeItem('accessLevel');
                            props.history.push("/login")
                        }
                        }
                        className={clsx(classes.menuButton)}>
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <div>
                        <ListItem button selected={selectedIndex === 0} onClick={() => {
                            props.history.push("/");
                            setSelectedIndex(0);
                        }}>
                            <ListItemIcon>
                                <ShowChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("Statistics")}/>
                        </ListItem>
                        <ListItem button selected={selectedIndex === 1} onClick={() => {
                            props.history.push("/control_panel");
                            setSelectedIndex(1);
                        }}>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("Control Panel")}/>
                        </ListItem>
                        {localStorage.getItem("isAdmin") === 'true' ?
                            <>
                                <Divider variant={"fullWidth"}/>
                                <List subheader={<ListSubheader>{t("Admin")}</ListSubheader>}>
                                    <ListItem button selected={selectedIndex === 3} onClick={() => {
                                        props.history.push("/permissions");
                                        setSelectedIndex(3);
                                    }}>
                                        <ListItemIcon>
                                            <GroupIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={t("Permissions")}/>
                                    </ListItem>
                                </List>
                            </>
                            : ''}
                    </div>
                </List>

            </Drawer>
            <ProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Route path={"/"} exact component={MainDashboard}/>
                    <Route path={"/control_panel"} exact component={ControlPanel}/>
                    <Route path={"/permissions"} exact component={Permissions}/>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default withRouter(Dashboard);
