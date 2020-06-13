type SongMeta = {
  id: string,
  name: string,
  filename: string,
  author: string,
  ccli: string
}
type Lyrics = {
  order: string,
  verses: Verse[]
}
type Verse = {
  name: string,
  text: string
}
type Song = {
  meta: SongMeta,
  lyrics: Lyrics,
  themeid: 0
}


export default Song;
export { SongMeta, Lyrics };