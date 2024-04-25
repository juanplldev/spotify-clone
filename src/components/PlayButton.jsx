import React from "react";
import {Play, Pause} from "@/icons/PlayerIcons";


function PlayButton(props)
{
    const {id, isPlaying} = props;
    
    return (
        <button class="bg-[#1ed760] rounded-full p-[14px] shadow-lg shadow-[#0000004d] hover:bg-[#1fdf64] hover:scale-105">
            {
                isPlaying ? <Pause styles="fill-black size-5"/>
                :
                <Play styles="fill-black size-5"/>
            }
        </button>
    )
};


export default PlayButton;