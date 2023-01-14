import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function Chart({title, data}) {

    return (
        <div className='chart-container'>
            <div className="chart-wrapper">
                <h6>{title}</h6>

                <div className="chart-content">
                    <div className="row">
                        <div className="left">
                            <ResponsiveContainer width="100%"  height={250} >
                                <LineChart
                                    data={data}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke='#f45d48' />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Active User" stroke="#f45d48" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart;