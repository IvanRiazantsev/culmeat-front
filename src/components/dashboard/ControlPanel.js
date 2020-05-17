import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Container, Typography} from "@material-ui/core";
import MaterialTable from "material-table";
import Title from './Title';
import '../../service/IoTService'
import {getAllMachines, updateMachine} from "../../service/IoTService";
import {getProducts} from "../../service/ProductService";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    avatar: {
        margin: '10px auto',
        backgroundColor: theme.palette.primary.main,
        height: '100px',
        width: '100px'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

// const
export default function ControlPanel(props) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [machines, setMachines] = useState([])
    const [products, setProducts] = useState([])
    const [machineId, setMachineId] = useState(-1)
    const [measurementFrequency, setMeasurementFrequency] = useState(0)
    // sensibility: machine2.sensibility,
    useEffect(effect => {
        getAllMachines().then(res => {
            setMachines(res.map(machine2 => {
                return {
                    id: machine2.id,
                    name: machine2.name,
                    status: machine2.status,
                    measurementFrequency: machine2.measurementFrequency,
                    temperatureSensibility: machine2.sensibility.temperatureSensibility,
                    nutrientsSensibility: machine2.sensibility.nutrientsSensibility,
                    humiditySensibility: machine2.sensibility.humiditySensibility,
                    electrolytesSensibility: machine2.sensibility.electrolytesSensibility,
                    products: machine2.products
                }
            }))
        })
        // getProducts().then(res => {
        //     setProducts(res.map(pr => {
        //         return {
        //             machine: pr.smartDevice,
        //             status: pr.status,
        //             temperature: pr.temperature,
        //             nutrientsLevel: pr.nutrientsLevel,
        //             humidityLevel: pr.humidityLevel,
        //             electrolytesLevel: pr.electrolytesLevel
        //         }
        //     }))
        // })
    }, []);

    const handleChange = (event) => {
        setMachineId(event.target.value)
        let machine1 = machines.find(m => {return m.id === parseInt(event.target.value)})
        setMeasurementFrequency(machine1.measurementFrequency)
        console.log(measurementFrequency)
    }


    return (
        <Grid container spacing={1} className={classes.paper}>
            <Container style={{textAlign: 'center'}}>
                <Avatar className={classes.avatar}>
                    <SettingsIcon style={{height: '70px', width: '70px'}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('Control Panel')}
                </Typography>
            </Container>
            <Grid item xs={12} sm={12} style={{width: '100%'}}>
                <Paper>
                    <MaterialTable
                        options={{
                            search: true,
                            filtering: false,
                            sorting: true,
                            draggable: false,
                            actionsColumnIndex: 7
                        }}
                        title={<Title>{t('Machines')}</Title>}
                        columns={[
                            {title: t("Name"), field: "name"},
                            {title: t("Measurement frequency"), field: "measurementFrequency", editComponent: props => (
                                <input type='number' onChange={e => props.onChange(e.target.value)} value={props.value} max={24} min={0.5} step={0.5}/>
                                )
                            },
                            {title: t("temperatureSensibility"), field: "temperatureSensibility", editComponent: props => (
                                <input type='number' onChange={e => props.onChange(e.target.value)} value={props.value} max={5} min={1} step={0.1}/>
                                )
                            },
                            {title: t("nutrientsSensibility"), field: "nutrientsSensibility", editComponent: props => (
                                <input type='number' onChange={e => props.onChange(e.target.value)} value={props.value} max={6} min={1} step={0.1}/>
                                )
                            },
                            {title: t("humiditySensibility"), field: "humiditySensibility", editComponent: props => (
                                <input type='number' onChange={e => props.onChange(e.target.value)} value={props.value} max={10} min={3} step={0.1}/>
                                )
                            },
                            {title: t("electrolytesSensibility"), field: "electrolytesSensibility", editComponent: props => (
                                <input type='number' onChange={e => props.onChange(e.target.value)} value={props.value} max={5} min={1} step={0.1}/>
                                )
                            },
                            {title: t("status"), field: 'status', editable: "never"}
                        ]}
                        data={machines}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    updateMachine(oldData.id, {
                                        name: newData.name,
                                        measurementFrequency: newData.measurementFrequency,
                                        temperatureSensibility: newData.temperatureSensibility,
                                        nutrientsSensibility: newData.nutrientsSensibility,
                                        humiditySensibility: newData.humiditySensibility,
                                        electrolytesSensibility: newData.electrolytesSensibility
                                    }).then(res => {
                                        getAllMachines().then(res1 => {
                                            setMachines(res1.map(machine2 => {
                                                return {
                                                    id: machine2.id,
                                                    name: machine2.name,
                                                    status: machine2.status,
                                                    measurementFrequency: machine2.measurementFrequency,
                                                    temperatureSensibility: machine2.sensibility.temperatureSensibility,
                                                    nutrientsSensibility: machine2.sensibility.nutrientsSensibility,
                                                    humiditySensibility: machine2.sensibility.humiditySensibility,
                                                    electrolytesSensibility: machine2.sensibility.electrolytesSensibility,
                                                    products: machine2.products
                                                }
                                            }))
                                            resolve()
                                        })
                                    })
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve, reject) => {

                                })
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

            {/*<Grid item xs={12} sm={12} style={{width: '100%'}}>*/}
            {/*    <Paper>*/}
            {/*        <MaterialTable*/}
            {/*            options={{*/}
            {/*                search: true,*/}
            {/*                filtering: false,*/}
            {/*                sorting: false,*/}
            {/*                draggable: false,*/}
            {/*                actionsColumnIndex: 6*/}
            {/*            }}*/}
            {/*            title={<Title>{t('Products')}</Title>}*/}
            {/*            columns={[*/}
            {/*                {title: t("Machine"), field: "machine"},*/}
            {/*                {title: t("Measurement frequency"), field: "temperature", editComponent: props1 => (*/}
            {/*                        <input type='number' defaultValue={props1.value} max={24} min={0.5} step={0.5}/>*/}
            {/*                    )*/}
            {/*                },*/}
            {/*                {title: t("nutrientsLevel"), field: "nutrientsLevel", editComponent: props1 => (*/}
            {/*                        <input type='number' defaultValue={props1.value} max={5} min={1} step={0.1}/>*/}
            {/*                    )*/}
            {/*                },*/}
            {/*                {title: t("humidityLevel"), field: "humidityLevel", editComponent: props1 => (*/}
            {/*                        <input type='number' defaultValue={props1.value} max={6} min={1} step={0.1}/>*/}
            {/*                    )*/}
            {/*                },*/}
            {/*                {title: t("electrolytesLevel"), field: "electrolytesLevel", editComponent: props1 => (*/}
            {/*                        <input type='number' defaultValue={props1.value} max={10} min={3} step={0.1}/>*/}
            {/*                    )*/}
            {/*                },*/}
            {/*                {title: t("status"), field: "status", editComponent: props1 => (*/}
            {/*                        <input type='number' defaultValue={props1.value} max={5} min={1} step={0.1}/>*/}
            {/*                    )*/}
            {/*                },*/}
            {/*            ]}*/}
            {/*            data={products}*/}
            {/*            editable={{*/}
            {/*                onRowUpdate: (newData, oldData) =>*/}
            {/*                    new Promise((resolve, reject) => {*/}

            {/*                    }),*/}
            {/*                onRowDelete: (oldData) =>*/}
            {/*                    new Promise((resolve, reject) => {*/}

            {/*                    })*/}
            {/*            }}*/}
            {/*            localization={{*/}
            {/*                header: {*/}
            {/*                    actions: t('Actions')*/}
            {/*                },*/}
            {/*                body: {*/}
            {/*                    deleteTooltip: t('Delete'),*/}
            {/*                    addTooltip: t('Add'),*/}
            {/*                    editTooltip: t('Edit'),*/}
            {/*                    editRow: {*/}
            {/*                        deleteText: t('Delete Row?'),*/}
            {/*                        cancelTooltip: t('Cancel'),*/}
            {/*                        saveTooltip: t('Save')*/}
            {/*                    },*/}
            {/*                    emptyDataSourceMessage: t('emptyDataSourceMessage')*/}
            {/*                },*/}
            {/*                toolbar: {*/}
            {/*                    searchPlaceholder: t('Search')*/}
            {/*                },*/}
            {/*                pagination: {*/}
            {/*                    labelRowsSelect: t('Rows'),*/}
            {/*                    labelRowsPerPage: t('Rows per page'),*/}
            {/*                    firstTooltip: t('First Page'),*/}
            {/*                    previousTooltip: t('Previous Page'),*/}
            {/*                    nextTooltip: t('Next Page'),*/}
            {/*                    lastTooltip: t('Last Page'),*/}
            {/*                    labelDisplayedRows: t('Displayed Rows')*/}
            {/*                }*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </Paper>*/}
            {/*</Grid>*/}
        </Grid>
    )
}
