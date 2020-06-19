export const state = () => ({
  songlist: null,
  songs: {}
})

export const mutations = {
  setSonglist (state, songlist) {
    state.songlist = songlist;
  },
  setSong (state, song) {
    state.songs[song.meta.id] = song;
  }
}