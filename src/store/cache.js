export const state = () => ({
  songlist: null,
  currentSong: null,
  songs: {},
  transition: {
    display: "black",
    type: "fade"
  }
})

export const mutations = {
  setSonglist (state, songlist) {
    state.songlist = songlist;
  },
  setSong (state, song) {
    state.songs[song.meta.id] = song;
  },
  setCurrentSong(state, id) {
    state.currentSong = id;
  },
  setTransitionDisplay (state, value) {
    state.transition.display = value;
  },
  setTransitionType (state, value) {
    state.transition.type = value;
  }
}