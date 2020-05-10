import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import {deleteUser, getUsers, updateUserAccessLevel} from '../../service/UserService'
import MaterialTable from "material-table";
import Title from './Title';
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import GroupIcon from '@material-ui/icons/Group'

const useStyles = makeStyles(theme => ({
    paper: {
        // padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: "center"
    },
    avatar: {
        margin: '10px auto',
        backgroundColor: theme.palette.primary.main,
        height: '100px',
        width: '100px'
    },
    fixedHeight: {
        height: 240,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Permissions(props) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [users, setUsers] = useState();

    useEffect(effect => {
        getUsers().then(res => {
            setUsers(res.map(user => {
                return {
                    id: user.id,
                    username: user.username,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    accessLevel: user.accessLevel
                }
            }))
        });
    }, []);
    return (
        <Grid container spacing={1} className={classes.paper}>
            <Container style={{textAlign: 'center'}}>
                <Avatar className={classes.avatar}>
                    <GroupIcon style={{height: '70px', width: '70px'}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('Permissions')}
                </Typography>
            </Container>
            <Grid item xs={12} sm={12} style={{width: '100%'}}>
                <Paper>
                    <MaterialTable
                        options={{
                            search: true,
                            filtering: false,
                            sorting: false,
                            draggable: false,
                            actionsColumnIndex: 5
                        }}
                        title={<Title>{t('Users')}</Title>}
                        columns={[
                            {title: t("Username"), field: "username", editable: "never"},
                            {title: t("First name"), field: "firstname", editable: "never"},
                            {title: t("Last name"), field: "lastname", editable: "never"},
                            {title: t("Access level"), field: "accessLevel", lookup: {'ONE': t('AL_ONE'), 'TWO': t('AL_TWO'), 'THREE': t('AL_THREE')}},
                        ]}
                        data={users}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    updateUserAccessLevel(oldData.id, newData.accessLevel).then(() => {
                                        getUsers().then(res => {
                                            setUsers(res.map(user => {
                                                return {
                                                    id: user.id,
                                                    username: user.username,
                                                    firstname: user.firstName,
                                                    lastname: user.lastName,
                                                    accessLevel: user.accessLevel
                                                }
                                            }))
                                            resolve()
                                        });
                                    })
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    deleteUser(oldData.id).then(() => {
                                        getUsers().then(res => {
                                            setUsers(res.map(user => {
                                                return {
                                                    id: user.id,
                                                    username: user.username,
                                                    firstname: user.firstName,
                                                    lastname: user.lastName,
                                                    accessLevel: user.accessLevel
                                                }
                                            }))
                                            resolve()
                                        });
                                    })
                                }),
                        }}
                        localization={{
                            header: {
                                actions: t('Actions')
                            },
                            body: {
                                deleteTooltip: t('Delete'),
                                addTooltip: t('Add'),
                                editTooltip: t('Edit'),
                                editRow: {
                                    deleteText: t('Delete Row?'),
                                    cancelTooltip: t('Cancel'),
                                    saveTooltip: t('Save')
                                },
                                emptyDataSourceMessage: t('emptyDataSourceMessage')
                            },
                            toolbar: {
                                searchPlaceholder: t('Search')
                            },
                            pagination: {
                                labelRowsSelect: t('Rows'),
                                labelRowsPerPage: t('Rows per page'),
                                firstTooltip: t('First Page'),
                                previousTooltip: t('Previous Page'),
                                nextTooltip: t('Next Page'),
                                lastTooltip: t('Last Page'),
                                labelDisplayedRows: t('Displayed Rows')
                            }
                        }}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}
