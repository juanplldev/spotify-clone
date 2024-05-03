import {useEffect, useRef} from "react";
import {usePlayerStore} from "@/store/playerStore";
import {AddSong, Play, Pause, Previous, Next, Shuffle, Repeat, Volume} from "@/icons/PlayerIcons";


function Player(props)
{
    const {isPlaying, currentMusic, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state);
    const {playlist, songs, song} = currentMusic;
    const audioRef = useRef();
    
    useEffect(() => {
        if(isPlaying) audioRef.current.play();
        else audioRef.current.pause();
    }, [isPlaying]);
    
    useEffect(() => {
        if(song)
        {
            audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
            audioRef.current.play();
            
            audioRef.current.volume = 0.3;
        }
    }, [currentMusic]);
    
    function handleOnClick()
    {
        setIsPlaying(!isPlaying);
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
                            song?.artists.map((artist, index) => {
                                return (
                                    <span className="inline-flex" key={artist}>
                                        <a href="/#" className="hover:underline hover:text-white">{artist}</a>
                                        {
                                            index + 1 < song?.artists.length && <>,&nbsp;</>
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
                        <Shuffle styles="fill-[#ffffffb3] h-4 w-4 group-active:fill-[#1DB954]"/>
                    </button>
                    <button className="m-4 group">
                        <Previous styles="fill-[#ffffffb3] h-4 w-4 group-hover:fill-white"/>
                    </button>
                    <button className="bg-white rounded-full p-2 m-2" onClick={handleOnClick}>
                        {
                            isPlaying ? <Pause styles="fill-black h-4 w-4"/>
                            :
                            <Play styles="fill-black h-4 w-4"/>
                        }
                    </button>
                    <button className="m-4 group">
                        <Next styles="fill-[#ffffffb3] h-4 w-4 group-hover:fill-white"/>
                    </button>
                    <button className="m-3 group">
                        <Repeat styles="fill-[#ffffffb3] h-4 w-4 group-active:fill-[#1DB954]"/>
                    </button>
                </div>
                    <audio ref={audioRef} />
                <div>
                
                </div>
            </div>
            
            <div className="">
                {/* <button className="m-3">
                    <Volume styles="fill-current h-4 w-4" type="high"/>
                </button> */}
            </div>
    </div>
    );
};


export default Player;