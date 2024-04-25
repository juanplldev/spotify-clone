import React, {useState, useEffect} from "react";
import {ArrowLeft, ArrowRight, GitHub} from "@/icons/MainIcons";


function MainHeader(props)
{
    const color = props.color || "#222222";
    
    function handleNavigate(e, to)
    {
        e.preventDefault();
        
        if(to === "back") return window.history.back();
        if(to === "forward") return window.history.forward();
    };
    
    
    return (
        <div className="h-14 w-full py-2">
            <div id="gradient-container" className={`h-96 absolute inset-0 rounded-lg -z-10`} style={{backgroundImage: `linear-gradient(to bottom, ${color} 10%, #121212`}}></div>
            
            <div className="flex items-center justify-between">
                <div className="h-8 w-[72px] flex justify-between">
                    {
                        // window.history.length > 1 ?
                        // <button className="size-8 flex items-center justify-center rounded-full border-none bg-[#000000b3]" onClick={e => handleNavigate(e, "back")}>
                        //     <ArrowLeft styles="size-4 fill-[#fff]"/>
                        // </button>
                        // :
                        <button className="size-8 flex items-center justify-center rounded-full border-none bg-[#0f0f0f] cursor-not-allowed">
                            <ArrowLeft styles="size-4 fill-[#b3b3b3]"/>
                        </button>
                    }
                    {
                        // window.history.length < window.history.length - 1 ?
                        // <button className="size-8 flex items-center justify-center rounded-full border-none bg-[#000000b3]" onClick={e => handleNavigate(e, "forward")}>
                        //     <ArrowRight styles="size-4 fill-[#fff]"/>
                        // </button>
                        // :
                        <button disabled className="size-8 flex items-center justify-center rounded-full border-none bg-[#0f0f0f] cursor-not-allowed">
                            <ArrowRight styles="size-4 fill-[#b3b3b3]"/>
                        </button>
                    }
                </div>
                <div className="h-8 flex justify-between items-center">
                    <a href="https://github.com/juanplldev/spotify-clone" className="size-8 flex items-center justify-center rounded-full border-none bg-[#0f0f0f] hover:scale-105">
                        <GitHub styles="size-7 fill-[#b3b3b3] hover:fill-[#fff] transition duration-100"/>
                    </a>
                </div>
            </div>
        </div>
    );
};


export default MainHeader;