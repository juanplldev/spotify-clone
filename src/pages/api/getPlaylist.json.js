import {playlists, songs} from "@/lib/data";

export async function GET({params, request})
{
    const {url} = request;
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get("id");
    
    const playlist = playlists.find(p => p.id === id);
    const playlistSongs = songs.filter(song => song.albumId === playlist?.albumId);
    
    return new Response(JSON.stringify({playlist, playlistSongs}), {
        headers: {"content-type": "application/json"},
    });
};