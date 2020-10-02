let queueLength = 0;

export default (isLoading, countModifier, nuxtContext) => {
  queueLength += countModifier;
}