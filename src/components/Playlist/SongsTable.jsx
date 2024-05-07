import {usePlayerStore} from "@/store/playerStore";
import {getPlaylistData} from "@/lib/api";
import {Clock, Play, Pause, AddPlaylist, ThreeDots} from "@/icons/PlaylistIcons";
import {Equalizer} from "@/icons/MainIcons";


function SongsTable(props)
{
    const id = props?.id;
    const songs = props?.songs;
    const {isPlaying, currentMusic, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state);
    const isPlayingPlaylist = isPlaying && currentMusic.playlist.id === id;
    
    async function handleOnClick(isPlayingSong, songId)
    {
        if(isPlayingSong)
        {
            setIsPlaying(false);
        }
        else
        {
            const {playlist, playlistSongs} = await getPlaylistData(id);
            
            setIsPlaying(true);
            setCurrentMusic({playlist, songs: playlistSongs, song: playlistSongs[songId]});
        };
    };
    
    return (
        <table className="table-auto text-left w-full">
            <thead className="border-b-[1px] border-b-[#ffffff1a]">
                <tr className="text-secondary text-sm">
                    <th className="font-normal text-[16px] text-center pb-2">#</th>
                    <th className="font-normal pb-2">Title</th>
                    <th className="font-normal pb-2">Album</th>
                    <th className="font-normal pb-2">Date added</th>
                    <th className="pb-2 absolute right-[75px]">
                        <Clock styles="fill-secondary size-4"/>
                    </th>
                </tr>
            </thead>
            
            <tbody>
                <tr className="h-4"></tr>
                {
                    songs.map((song, index) => {
                        const isPlayingSong = isPlayingPlaylist && song.id === currentMusic.song.id;
                        
                        return (
                            <tr className="hover:bg-[#ffffff1a] focus:bg-[#ffffff4d] duration-75 group relative" key={song.title}>
                                <td className="size-12 song-container py-[6px] text-secondary text-center align-middle rounded-tl-md rounded-bl-md">
                                    <div className="size-full flex justify-center items-center relative">
                                        {
                                            isPlayingSong ? <Equalizer styles="h-4 w-4 fill-[#1DB954] group-hover:opacity-0 transition-all duration-75"/>
                                            :
                                            <span className="group-hover:opacity-0 transition-all duration-75">{index + 1}</span>
                                        }
                                        
                                        <button className="absolute cursor-default" onClick={async () => await handleOnClick(isPlayingSong, song.id - 1)}>
                                            {
                                                isPlayingSong ? <Pause styles="fill-primary size-4 opacity-0 group-hover:opacity-100 transition-all duration-75"/>
                                                :
                                                <Play styles="fill-primary size-4 opacity-0 group-hover:opacity-100 transition-all duration-75"/>
                                            }
                                        </button>
                                    </div>
                                </td>
                                <td className="py-[6px] flex items-center gap-3">
                                    <picture className="size-10">
                                        <img src={song.image} alt={`${song} cover`} className="size-full rounded" />
                                    </picture>
                                    
                                    <div className="flex flex-col">
                                        <a href="" className={`${isPlayingSong && "text-[#1ed760]"} hover:underline`}>{song.title}</a>
                                        
                                        <span className="inline-flex text-sm text-secondary">
                                            {
                                                song.artists.map((artist, index) => {
                                                    return (
                                                        <a href="" className="inline-flex" key={index}>
                                                            <p className=" hover:underline group-hover:text-primary">{artist}</p>
                                                            {
                                                                index + 1 < song.artists.length && <>,&nbsp;</>
                                                            }
                                                        </a>
                                                    );
                                                })
                                            }
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <a href="" className="text-sm text-secondary hover:underline group-hover:text-primary">{song.album}</a>
                                </td>
                                <td className="py-[6px] text-sm text-secondary">Apr 26, 2024</td>
                                <td className="py-[6px]">
                                    <button>
                                        <AddPlaylist styles="size-4 fill-secondary absolute bottom-5 right-[100px] opacity-0 group-hover:opacity-100 hover:fill-primary transition duration-100 hover:scale-105"/>
                                    </button>
                                </td>
                                <td className="py-[6px]">
                                    <button>
                                        <ThreeDots styles="size-6 fill-secondary absolute bottom-4 right-2 opacity-0 group-hover:opacity-100 hover:fill-primary transition duration-100 hover:scale-105"/>
                                    </button>
                                </td>
                                <td className="py-[6px] text-center text-sm text-secondary rounded-tr-md rounded-br-md">{song.duration}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};


export default SongsTable;