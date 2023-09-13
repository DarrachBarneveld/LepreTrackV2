export function getPercentInRelationToAverage(input: number, average: number) {
  const result = (input / average) * 100;

  return result;
}

export function calculateInvertedPercentage(percent: number) {
  const invertedPercentage = 100 - percent;
  return invertedPercentage;
}
