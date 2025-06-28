'use client'
import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartData {
    name: string,
    total_views: number,
}

interface CategoryProps {
    data: ChartData[];
}

export default class CategoryView extends PureComponent<CategoryProps> {
    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="90%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, Math.max(...data.map(item => item.total_views))]} />
                    <Tooltip />
                    <Radar name="total_views" dataKey="total_views" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        );
    }
}
