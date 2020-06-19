export const state = () => ({
  autoRefresh: false
})

export const mutations = {
  setAutoRefresh (state, value) {
    state.autoRefresh = value;
  },
}