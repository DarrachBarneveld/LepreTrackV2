export function getPercentInRelationToAverage(input: number, average: number) {
  const result = (input / average) * 100;

  return result;
}

export function calculateInvertedPercentage(percent: number) {
  const invertedPercentage = 100 - percent;
  return invertedPercentage;
}

const DUMMY_DATA = {
  // this is the average milage/carbon per week of a car
  averageKM: 327,
  averageFlights: 6.5,
  averageFlightKM: 6850,
  tonnesPerKM: 0.0002582,
  flightKperWeek: 34,
  carKperWeek: 36,
  communterKperWeek: 29,
  averageTravelMethod: {
    car: 65,
    carpool: 8,
    walkCycle: 15,
    bus: 6,
    train: 6,
  },
};

export function IrishAverageTravelMethodTotal() {
  const { averageTravelMethod } = DUMMY_DATA;

  const averageCarbonSum =
    averageTravelMethod.car * 1 +
    averageTravelMethod.carpool * 0.5 +
    averageTravelMethod.walkCycle * 0 +
    averageTravelMethod.train * 0.2 +
    averageTravelMethod.bus * 0.6;

  return averageCarbonSum;
}

export function dietScoreComparedToIrishAverage(
  diet: string,
  calories: number
) {
  // Object for raw scores
  let scores = {
    carnivore: 100,
    omnivore: 80.5,
    pescatarian: 62.5,
    vegetarian: 52.7,
    vegan: 40.2,
  };

  const irishNationalAverage = 2307;
  const score = (calories / irishNationalAverage) * scores[diet];

  return score;
}

export function calcFarmingPercent({
  local,
  produce,
  crop,
  seasonal,
  organic,
}) {
  let value = 0;

  local ? (value += 20) : value;
  seasonal ? (value += 20) : value;
  crop ? (value += 20) : value;
  produce ? (value += (20 / 100) * produce) : value;
  organic ? (value += (20 / 100) * organic) : value;

  return value;
}
