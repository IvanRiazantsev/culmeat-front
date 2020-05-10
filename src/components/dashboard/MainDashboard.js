import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import ShowChartIcon from '@material-ui/icons/ShowChart'
import {Container, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
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
}));

function createData(time, amount) {
    return {time, amount};
}

export default function MainDashboard() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Grid container spacing={1} className={classes.paper}>
            <Container style={{textAlign: 'center'}}>
                <Avatar className={classes.avatar}>
                    <ShowChartIcon style={{height: '70px', width: '70px'}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('Statistics')}
                </Typography>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart data={[
                            createData('09:00', 6),
                            createData('12:00', 3),
                            createData('15:00', 9),
                            createData('18:00', 5)
                        ]} title={t("today temperature")} axisY={t("°C")}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart data={[
                            createData('09:00', 6),
                            createData('12:00', 3),
                            createData('15:00', 9),
                            createData('18:00', 5)
                        ]} title={t("today nutrientsLevel")} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart data={[
                            createData('09:00', 6),
                            createData('12:00', 3),
                            createData('15:00', 9),
                            createData('18:00', 5)
                        ]} title={t("today humidityLevel")} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart data={[
                            createData('09:00', 6),
                            createData('12:00', 3),
                            createData('15:00', 9),
                            createData('18:00', 5)
                        ]} title={t("today electrolytesLevel")} />
                    </Paper>
                </Grid>

            </Grid>
        </Grid>

    )
}
