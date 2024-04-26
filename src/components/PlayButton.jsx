import React from "react";
import {usePlayerStore} from "@/store/playerStore";
import {Play, Pause} from "@/icons/PlayerIcons";


function PlayButton(props)
{
    const {id, size} = props;
    const {isPlaying, currentMusic, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state);
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
    
    function handleOnCLick()
    {
        setCurrentMusic({
            playlist: {id}
        });
        
        if(isPlaying && !isPlayingPlaylist)
        {
            // setCurrentMusic({
            //     playlist: {id}
            // });
        }
        else
        {
            setIsPlaying(!isPlaying);
        };
    };
    
    
    return (
        <button className={`bg-[#1ed760] rounded-full ${size === "lg" ? "p-[18px]" : "p-[14px]"} shadow-lg shadow-[#0000004d] hover:bg-[#1fdf64] hover:scale-105`} onClick={handleOnCLick}>
            {
                isPlayingPlaylist ? <Pause styles="fill-black size-5"/>
                :
                <Play styles="fill-black size-5"/>
            }
        </button>
    )
};


export default PlayButton;