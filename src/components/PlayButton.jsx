import {usePlayerStore} from "@/store/playerStore";
import {getPlaylistData} from "@/lib/api";
import {Play, Pause} from "@/icons/PlayerIcons";


function PlayButton(props)
{
    const {id, size} = props;
    const {isPlaying, currentMusic, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state);
    const isPlayingPlaylist = isPlaying && currentMusic.playlist.id === id;
    
    async function handleOnClick()
    {
        if(isPlayingPlaylist)
        {
            setIsPlaying(false);
        }
        else
        {
            const {playlist, playlistSongs} = await getPlaylistData(id);
            
            setIsPlaying(true);
            setCurrentMusic({playlist, songs: playlistSongs, song: playlistSongs[0]});
        };
    };
    
    
    return (
        <button className={`bg-[#1ed760] rounded-full ${size === "lg" ? "p-[18px]" : "p-[14px]"} shadow-lg shadow-[#0000004d] hover:bg-[#1fdf64] hover:scale-105`} onClick={handleOnClick}>
            {
                isPlayingPlaylist ? <Pause styles="fill-black size-5"/>
                :
                <Play styles="fill-black size-5"/>
            }
        </button>
    )
};


export default PlayButton;