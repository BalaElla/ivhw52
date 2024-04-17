import React from "react";

function Bars(props) {
    const {data, xScale, yScale, height,selectedStation, setSelectedStation} = props;

    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const handleMouseEnter = (station) => {
        setSelectedStation(station);
    };

    const handleMouseOut = () => {
        setSelectedStation(null);
    };

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if (data) {
        return (
            <g>
                {data.map((d, index) => (
                    <rect
                        key={index}
                        x={xScale(d.station)}
                        y={yScale(d.start)}
                        width={xScale.bandwidth()}
                        height={height - yScale(d.start)}
                        fill={getColor(selectedStation, d)}
                        stroke="black"
                        strokeWidth="1"
                        onMouseEnter={() => handleMouseEnter(d)}
                        onMouseOut={handleMouseOut}
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>
    };

    
}
export default Bars;