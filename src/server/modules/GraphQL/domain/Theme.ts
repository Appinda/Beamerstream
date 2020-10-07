type ThemeMeta = {
  id: string,
  name: string,
  filename: string
}
type Theme = {
  meta: ThemeMeta,
  fontSize: number
}

export default Theme;
export { ThemeMeta };