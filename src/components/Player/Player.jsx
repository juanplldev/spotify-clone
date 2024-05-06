import {useEffect, useRef, useState} from "react";
import {usePlayerStore} from "@/store/playerStore";
import {AddSong, Play, Pause, Previous, Next, Shuffle, Repeat, Volume} from "@/icons/PlayerIcons";
import {Slider} from "@/components/Player/Slider";


function Player()
{
    const {isPlaying, currentMusic, setIsPlaying, volume, setVolume} = usePlayerStore(state => state);
    const {playlist, song} = currentMusic;
    const audioRef = useRef();
    const volumeRef = useRef();
    const [volumeLevel, setVolumeLevel] = useState();
    
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
    
    function handleMuteAndUnmute()
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
    
    function handleSliderOnChange(value)
    {
        const [newVolume] = value;
        setVolume({
            current: newVolume,
            last: volume.current,
        });
    };
    
    
    return (
        <div className="h-full w-full bg-[#000] rounded-lg grid grid-cols-3">
            <div className="gap-4 p-2 flex items-center">
                <picture className="size-14">
                    <img src={playlist?.cover} alt={`${song?.title} cover`} className="size-full rounded-[4px]" />
                </picture>
                
                <div className="gap-0.5 flex flex-col justify-center">
                    <a href={`/playlist/${playlist?.id}`} className="text-sm font-normal line-clamp-1 hover:underline">{song?.title}</a>
                    
                    <div className="text-xs text-[#b3b3b3] truncate">
                        {
                            playlist?.artists.map((artist, index) => {
                                return (
                                    <span className="inline-flex" key={artist}>
                                        <a href="/#" className="hover:underline hover:text-white">{artist}</a>
                                        {
                                            index + 1 < playlist?.artists.length && <>,&nbsp;</>
                                        }
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
                
                <button>
                    <AddSong styles="size-4 fill-[#b3b3b3] hover:fill-white transition duration-100 hover:scale-105"/>
                </button>
            </div>
            
            <div className="mb-5 flex flex-col justify-center items-center">
                <div className="flex">
                    <button className="m-3 group">
                        <Shuffle styles="fill-[#ffffffb3] size-4 group-hover:fill-white group-active:fill-[#1DB954]"/>
                    </button>
                    <button className="m-4 group">
                        <Previous styles="fill-[#ffffffb3] size-4 group-hover:fill-white"/>
                    </button>
                    <button className="bg-white rounded-full p-2 m-2" onClick={handleOnClick}>
                        {
                            isPlaying ? <Pause styles="fill-black size-4"/>
                            :
                            <Play styles="fill-black size-4"/>
                        }
                    </button>
                    <button className="m-4 group">
                        <Next styles="fill-[#ffffffb3] size-4 group-hover:fill-white"/>
                    </button>
                    <button className="m-3 group">
                        <Repeat styles="fill-[#ffffffb3] size-4 group-hover:fill-white group-active:fill-[#1DB954]"/>
                    </button>
                </div>
                    
                <div>
                    
                </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mr-8">
                <button className="m-1 group" onClick={handleMuteAndUnmute}>
                    <Volume styles="fill-[#ffffffb3] size-4 group-hover:fill-white" type={volumeLevel}/>
                </button>
                
                <Slider
                    value={[volume.current]}
                    min={0}
                    max={100}
                    className="w-24"
                    onValueChange={value => handleSliderOnChange(value)}
                />
            </div>
            
            <audio ref={audioRef} />
        </div>
    );
};


export default Player;