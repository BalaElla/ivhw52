import React from "react";

function Routes(props){
    const {projection, routes, selectedAirlineID} = props;
    // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.
    if (selectedAirlineID === null) {
        return <g></g>; // No airline selected, return empty group
    } else {
        // let target_routes = routes.filter(a => a.AirlineID === selectedAirlineID);
        // return <g>
        //     {
        //         target_routes.map( d => <line key={d.ID}
        //                     x1={ projection([d.SourceLongitude, d.SourceLatitude])[0]}
        //                     y1={ projection([d.SourceLongitude, d.SourceLatitude])[1]}
        //                     x2={ projection([d.DestLongitude, d.DestLatitude])[0]}
        //                     y2={ projection([d.DestLongitude, d.DestLatitude])[1]}
        //                     stroke={"#992a2a"} //Use the same color as the bar
        //                     opacity={0.3}>
        //             </line>
        //         )}   
        // </g>
        const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);
        return (<g>
        {selectedRoutes.map((route, index) => (
            <line
                key={index}
                x1={projection([route.SourceLongitude, route.SourceLatitude])[0]}
                y1={projection([route.SourceLongitude, route.SourceLatitude])[1]}
                x2={projection([route.DestLongitude, route.DestLatitude])[0]}
                y2={projection([route.DestLongitude, route.DestLatitude])[1]}
                stroke="#992a2a"
                opacity = {0.3}
            />
        ))}
    </g>
        );
    }
}

export { Routes};