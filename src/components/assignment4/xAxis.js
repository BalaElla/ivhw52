//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate


import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function XAxis(props){
    const {xScale, height, width, axisLabel} = props;
    const axisRef = useRef();
    useEffect(() => {
        // Decide the axis based on the scale type
        const xAxisGenerator = d3.axisBottom(xScale);
        
        // Modify the font size of ticks
        xAxisGenerator.tickFormat(d => d.toString()).tickSizeOuter(0);

        d3.select(axisRef.current).call(xAxisGenerator)
         // Check if xScale is scaleBand (used in bar charts) to apply conditional formatting
         
        if (xScale.bandwidth) {
                    
            d3.select(axisRef.current).selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", ".75em")
                .attr("dy", "-.3em")
                .attr("transform", "rotate(70)");
        } else {
            // Ensure text formatting is suitable for scatter plot
            d3.select(axisRef.current).selectAll("text")
                .style("textAnchor", "middle");
        }
    }, [xScale, width, axisLabel]);

    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    {/* //the if(xScale){...} means when xScale is not null, the component will return the x-axis; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete. */}

    if (xScale){
        return (
            <g ref={axisRef} transform={`translate(0,${height})`}>
                <text
                    style={{textAnchor: 'end', fontSize: '15px', fill: 'black'}}
                    transform={`translate(550, -10)`}>
                    {axisLabel}
                </text>
            </g>
        );
    }else{
        return<g></g>
    }
    }

export default XAxis;
