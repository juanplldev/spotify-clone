export async function getPlaylistData(id)
{
    const res = await fetch(`/api/getPlaylist.json?id=${id}`);
    const data = await res.json();
    
    return data;
};