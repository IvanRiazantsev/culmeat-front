import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 55),
    createData('03:00', 58),
    createData('06:00', 80),
    createData('09:00', 65),
    createData('12:00', 60),
    createData('15:00', 90),
    createData('18:00', 70),
    createData('21:00', 60),
    createData('24:00', undefined),
];

export default function Chart(props) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={props.data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 40,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            {props.axisY}
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}