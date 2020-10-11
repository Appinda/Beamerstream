export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
  console.error(graphQLErrors, networkError, operation, forward)
}