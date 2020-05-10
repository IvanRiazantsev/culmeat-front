import React, {useState} from "react";
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
import * as UserService from '../service/UserService'
import {useTranslation} from 'react-i18next';
// import {IconButton} from "@material-ui/core";
import {FlagIcon} from "react-flag-kit";
import switchLanguage from '../service/i18nService';
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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    },
    language: {
        margin: theme.spacing(2, 0, 2),
    }
}));

export default function Login(props) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('Sign In')}
                </Typography>
                <form className={classes.form} noValidate onSubmit={(event) => {
                    event.preventDefault();
                    AuthService.signIn({
                        username: username,
                        password: password
                    }).then(res => {
                        localStorage.setItem('jwtToken', res.token);
                        localStorage.setItem('userId', res.id);
                        localStorage.setItem('isAdmin', (res.role === 'ADMIN').toString());
                        UserService.getUser(res.id).then(res => {
                            localStorage.setItem('username', res.username);
                            localStorage.setItem('firstName', res.firstName);
                            localStorage.setItem('lastName', res.lastName);
                            let accessLevel = ''
                            switch (res.accessLevel) {
                                case 'ONE':
                                    accessLevel = t('AL_ONE');
                                    break;
                                case 'TWO':
                                    accessLevel = t('AL_TWO');
                                    break;
                                case 'THREE':
                                    accessLevel = t('AL_THREE');
                                    break;
                            }
                            localStorage.setItem('accessLevel', accessLevel);
                        });
                        props.history.push("/")
                    }).catch(error => {
                        alert(t('Error occurred'));
                    })
                }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('Username')}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('Password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <IconButton className={classes.language} onClick={() => switchLanguage()}>
                                <FlagIcon code={i18n.language === 'en' ? 'US' : 'UA'} size={32}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {t('Sign In')}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Link href="" variant="body2" onClick={() => props.history.push("/signup")}>
                                {t('No account')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
