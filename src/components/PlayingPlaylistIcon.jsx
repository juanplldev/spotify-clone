import React from "react";
import {usePlayerStore} from "@/store/playerStore";
import {Equalizer} from "@/icons/MainIcons";
import {Volume} from "@/icons/AsideIcons";


function PlayingPlaylistIcon(props)
{
    const {id, type, title} = props;
    const {isPlaying, currentMusic} = usePlayerStore(state => state);
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
    
    if(type === "title")
    {
        return <h2 className={`line-clamp-1 ${isPlayingPlaylist && "text-[#1ed760]"}`}>{title}</h2>
    }
    else if(type === "aside")
    {
        return isPlayingPlaylist && <Volume styles="h-4 w-4 fill-[#1DB954]"/>;
    }
    else if(type === "top")
    {
        return isPlayingPlaylist && <Equalizer styles="h-4 w-4 fill-[#1DB954]"/>;
    };
};


export default PlayingPlaylistIcon;