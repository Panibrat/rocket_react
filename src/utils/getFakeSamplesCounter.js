export const getFakeSamplesCounter = () => {
  return Math.floor(Date.now() / 100)
    .toString()
    .slice(-6);
};
