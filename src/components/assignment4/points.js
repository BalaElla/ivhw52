
function Points(props) {
    const {data, xScale, yScale, height, width, selectedStation,setSelectedStation, setTooltipX, setTooltipY} = props;
    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const getRadius = (station) => {
        return station === selectedStation ? 10 : 5;
    };

    const handleMouseEnter = (station, event) => {

        setSelectedStation(station);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
    };

    const handleMouseOut = () => {
        setSelectedStation(null);
        setTooltipX(null);
        setTooltipY(null);
    };
    
    if(data){
    return (
        <g>
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.tripdurationS)}
                    cy={yScale(d.tripdurationE)}
                    r={getRadius(d)}
                    fill={getColor(d)}
                    stroke="black"
                    strokeWidth="1"
                    onMouseEnter={(event) => handleMouseEnter(d, event)}
                />
            ))}
            {selectedStation && (
                <rect
                    x={0}
                    y={0}
                    width="90%"
                    height="90%"
                    fill="yellow"
                    fillOpacity="0.5"
                />
            )}
            {selectedStation && (
                <circle
                    cx={xScale(selectedStation.tripdurationS)}
                    cy={yScale(selectedStation.tripdurationE)}
                    r={10}
                    fill="red"
                    stroke="black"
                    strokeWidth="1"
                    onMouseOut={handleMouseOut}
                />
            // Because the red point is stated at the end of the svg, it automatically appears on top
            )}
        </g>

        );
    }else{
        return <g></g>
    }
}



export default Points; // Export the component for use in other files
