import gql from 'graphql-tag';

export default {
  query: {
    songlist: gql`{songlist{id,name,author,ccli}}`,
    activeSong: gql`{activeSong{meta{id,name,author,ccli},lyrics{order,verses{name,text}},themeid}}`,
    liturgy: gql`{liturgy{items{id,name,author}}}`,
    transitionType: gql`{transitionType{display,ease}}`,
  },
  mutation: {
    setActiveSong: gql`mutation($id: String!){setActiveSong(id: $id)}`,
    setTransitionDisplay: gql`mutation($display: String!){setTransitionType(display: $display)}`,
    setTransitionEase: gql`mutation($ease: String!){setTransitionType(ease: $ease)}`
  },
  subscription: {
    activeSongSet: gql`subscription{activeSongSet{meta{id,name,author,ccli},lyrics{order,verses{name,text}},themeid}}`,
    liturgy: gql`subscription{liturgy{items{id,name,author}}}`,
    transitionType: gql`subscription{transitionType{display,ease}}`
  }
}