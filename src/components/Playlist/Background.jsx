import React from "react";


function Background(props)
{
    const color = props.color || "#222222";
    
    return <div id="gradient-container" className={`h-[600px] absolute inset-0 rounded-lg -z-10`} style={{backgroundImage: `linear-gradient(to bottom, ${color} 10%, #121212`}}></div>;
};


export default Background;