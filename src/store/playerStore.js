import {create} from "zustand";
import {playlists, songs} from "@/lib/data";

const playlistSongs = songs.filter(song => song.albumId === playlists[0].albumId);

export const usePlayerStore = create(set => ({
    isPlaying: false,
    currentMusic: {
        playlist: playlists[0],
        songs: playlistSongs,
        song: playlistSongs[0],
    },
    setIsPlaying: (isPlaying) => set({isPlaying}),
    setCurrentMusic: (currentMusic) => set({currentMusic}),
}));