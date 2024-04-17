
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function YAxis(props){
    const { yScale, height, axisLabel} = props;
    const axisRef = useRef(null);

    useEffect(() => {
        if (yScale) {
            // Create the y-axis generator based on the scale type
            const yAxisGenerator = d3.axisLeft(yScale);
            yAxisGenerator.tickFormat(d => d.toString()).tickSizeOuter(0);

            // Select the ref and call the y-axis generator to create the axis
            d3.select(axisRef.current).call(yAxisGenerator);
        }
    }, [yScale]);

    if(yScale){

        return (
            <g ref={axisRef} transform={`translate(0, 0)`}>
                <text
                    style={{ textAnchor: 'end', fontSize: '15px', fill: 'black'}}
                    transform={`translate(20, 0)rotate(-90)`}>
                    {axisLabel}
                </text>
            </g>
        );
    } else {
        return<g></g>
    }
}

export default YAxis;