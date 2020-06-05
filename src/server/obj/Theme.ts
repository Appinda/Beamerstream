type ThemeMeta = {
  id: string,
  name: string,
  filename: string,
  author: string,
}
type Theme = {
  meta: ThemeMeta
}

export default Theme;
export { ThemeMeta };