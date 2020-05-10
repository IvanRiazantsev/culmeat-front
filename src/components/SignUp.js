import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as AuthService from '../service/AuthService'
import {useTranslation} from "react-i18next";
import switchLanguage from "../service/i18nService";
import {FlagIcon} from "react-flag-kit";
import IconButton from "@material-ui/core/IconButton";

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

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    },
    language: {
        margin: theme.spacing(2, 0, 2),
    }
}));

export default function SignUp(props) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {t, i18n} = useTranslation();


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("Sign Up")}
                </Typography>
                <form className={classes.form} onSubmit={(event) => {
                    event.preventDefault();
                    AuthService.signUp({
                        username: username,
                        password: password,
                        firstName: firstName,
                        lastName: lastName
                    }).then(res => {
                        props.history.push("/login")
                    }).catch(error => {
                        alert("Error occurred")
                    })
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                id="username"
                                label={t("Username")}
                                name="username"
                                autoComplete="username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={t("First name")}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label={t("Last name")}
                                name="lastName"
                                autoComplete="lname"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={t("Password")}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>

                        <Grid xs={12} sm={2}>
                            <IconButton className={classes.language} onClick={() => switchLanguage()}>
                                <FlagIcon code={i18n.language === 'en' ? 'US' : 'UA'} size={32}/>
                            </IconButton>
                        </Grid>
                        <Grid xs={12} sm={10}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {t("Sign Up")}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="" variant="body2" onClick={() => props.history.push("/login")}>
                                {t("Has account")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
