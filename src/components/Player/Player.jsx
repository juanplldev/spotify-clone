import {useEffect, useRef, useState} from "react";
import {usePlayerStore} from "@/store/playerStore";
import {AddSong, Play, Pause, Previous, Next, Shuffle, Repeat, Volume} from "@/icons/PlayerIcons";
import {Slider} from "@/components/Player/Slider";


function Player()
{
    const {isPlaying, currentMusic, volume, setIsPlaying, setVolume} = usePlayerStore(state => state);
    const {playlist, song} = currentMusic;
    const audioRef = useRef();
    const volumeRef = useRef();
    const [volumeLevel, setVolumeLevel] = useState();
    const [currentTime, setCurrentTime] = useState(0)
    
    useEffect(() => {
        if(isPlaying) audioRef.current.play();
        else audioRef.current.pause();
    }, [isPlaying]);
    
    useEffect(() => {
        volumeRef.current = volume.current / 100;
        audioRef.current.volume = volumeRef.current;
        
        if(volumeRef.current > 0 && volumeRef.current <= 0.3)
        {
            setVolumeLevel("low");
        }
        else if(volumeRef.current >= 0.3 && volumeRef.current <= 0.6)
        {
            setVolumeLevel("medium");
        }
        else if(volumeRef.current >= 0.6)
        {
            setVolumeLevel("high");
        }
        else
        {
            setVolumeLevel("muted");
        };
    }, [volume]);
    
    useEffect(() => {
        if(song)
        {
            audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
            audioRef.current.play();
        };
    }, [currentMusic]);
    
    useEffect(() => {
        audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
        
        return () => audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);
    
    function handleMuteVolume()
    {
        if(volumeLevel !== "muted")
        {
            setVolume({
                current: 0,
                last: volume.current,
            });
        }
        else
        {
            setVolume({
                current: volume.last,
                last: 0,
            });
        };
    };
    
    function handleOnClick()
    {
        setIsPlaying(!isPlaying);
    };
    
    function handleFormatTime(time)
    {
        if(time === 0) return "0:00";
        
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60);
        
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    
    function handleTimeUpdate(value)
    {
        if(Array.isArray(value))
        {
            const [newTime] = value;
            audioRef.current.currentTime = newTime;
        }
        else
        {
            setCurrentTime(audioRef.current.currentTime);
        };
    };
    
    function handleVolumeOnChange(value)
    {
        const [newVolume] = value;
        setVolume({
            current: newVolume,
            last: volume.current,
        });
    };
    
    
    return (
        <div className="h-full w-full bg-black rounded-lg grid grid-cols-3">
            <div className="gap-4 p-2 flex items-center">
                <picture className="size-14">
                    <img src={playlist?.cover} alt={`${song?.title} cover`} className="size-full rounded-[4px]" />
                </picture>
                
                <div className="gap-0.5 flex flex-col justify-center">
                    <a href={`/playlist/${playlist?.id}`} className="text-sm font-normal line-clamp-1 hover:underline">{song?.title}</a>
                    
                    <div className="text-xs text-secondary truncate">
                        {
                            playlist?.artists.map((artist, index) => {
                                return (
                                    <span className="inline-flex" key={artist}>
                                        <a href={`/playlist/${playlist?.id}`} className="hover:underline hover:text-primary">{artist}</a>
                                        {
                                            index + 1 < playlist?.artists.length && <>,&nbsp;</>
                                        }
                                    </span>
                                );
                            })
                        }
                    </div>
                </div>
                
                <button>
                    <AddSong styles="size-4 fill-secondary hover:fill-primary transition duration-100 hover:scale-105"/>
                </button>
            </div>
            
            <div className="mb-5 flex flex-col justify-center items-center">
                <div className="flex">
                    <button className="m-3 group">
                        <Shuffle styles="fill-tertiary size-4 group-hover:fill-primary group-active:fill-[#1DB954]"/>
                    </button>
                    <button className="m-4 group">
                        <Previous styles="fill-tertiary size-4 group-hover:fill-primary"/>
                    </button>
                    <button className="bg-white rounded-full p-2 m-2" onClick={handleOnClick}>
                        {
                            isPlaying ? <Pause styles="fill-black size-4"/>
                            :
                            <Play styles="fill-black size-4"/>
                        }
                    </button>
                    <button className="m-4 group">
                        <Next styles="fill-tertiary size-4 group-hover:fill-primary"/>
                    </button>
                    <button className="m-3 group">
                        <Repeat styles="fill-tertiary size-4 group-hover:fill-primary group-active:fill-[#1DB954]"/>
                    </button>
                </div>
                    
                <div className="size-full flex flex-row justify-between items-center">
                    <span className="w-8 text-xs text-secondary text-right">{handleFormatTime(currentTime)}</span>
                    
                    <div className="w-full px-2">
                        <Slider
                            value={[currentTime]}
                            min={0}
                            max={audioRef.current?.duration ?? 0}
                            className="w-full"
                            onValueChange={value => handleTimeUpdate(value)}
                        />
                    </div>
                    
                    <span className="w-8 text-xs text-secondary text-left">{song?.duration}</span>
                </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mr-8">
                <button className="m-1 group" onClick={handleMuteVolume}>
                    <Volume styles="fill-tertiary size-4 group-hover:fill-primary" type={volumeLevel}/>
                </button>
                
                <Slider
                    value={[volume.current]}
                    min={0}
                    max={100}
                    className="w-24"
                    onValueChange={value => handleVolumeOnChange(value)}
                />
            </div>
            
            <audio ref={audioRef} />
        </div>
    );
};


export default Player;