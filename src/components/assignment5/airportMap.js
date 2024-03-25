
import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'; 
import { count } from "d3";

function AirportMap(props){
    const {width, height, countries, airports, routes, selectedAirlineID} = props;
    //TODO: 
    // 1.Define a projection which is geoMercator; 
    // set .scale(97), and .translate([width/2, height/2+20]); 
    // 2. Define a path generator using geoPath();
    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 

    // Define a projection of Mercator
    let projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);
    
    // Define a path generator using geoPath
    let pathGenerator = geoPath().projection(projection);

    return (
        <svg width={width} height={height} id="map">
            <g>
                {/* Plot the world map */}
                {countries.features.map((feature, index) => (
                    <path
                        key={index}
                        d={pathGenerator(feature)}
                        fill="#eee"
                        stroke="#ccc"
                    />
                ))}
                {/* Plot the airports */}
                {airports.map(d => <circle key={d.AirportID} 
                                    cx={projection([d.Longitude, d.Latitude])[0]}
                                    cy={projection([d.Longitude, d.Latitude])[1]}
                                    r={1} 
                                    fill={"#2a5599"}>
                            </circle>)
                }
            </g>
            
            <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID} />
        </svg>
    );
}

export { AirportMap };
