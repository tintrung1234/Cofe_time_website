'use client'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    month: string;
    total_views: number;
}

interface MonthlyProps {
    data: ChartData[];
}

export default class MonthlyView extends PureComponent<MonthlyProps> {
    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="90%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_views" fill="#7AB2D3" activeBar={<Rectangle fill="#B9E5E8" stroke="#7AB2D3" />} />

                </BarChart>
            </ResponsiveContainer>
        );
    }
}
