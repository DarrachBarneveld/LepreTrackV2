interface TravelData {
  flight: {
    yearlyKM: number;
    numFlights: number;
    class: string;
    score: number;
  };
  car: {
    weeklyKm: number;
    type: string;
    year2000: string;
    score: number;
  };
  transport: {
    drive: number;
    carpool: number;
    walk: number;
    cycle: number;
    train: number;
    bus: number;
    score: number;
  };
}

interface EnergyData {
  energy: {
    electric: number;
    gas: number;
    oil: number;
    coal: number;
    lpg: number;
    propane: number;
    wood: number;
    factor: number;
    score: number;
  };
}

interface FoodData {
  diet: {
    type: string;
    calories: number;
    score: number;
  };
  farm: {
    local: boolean;
    produce: number;
    organic: number;
    seasonal: boolean;
    crop: boolean;
    score: number;
  };
  dining: {
    out: boolean;
    waste: boolean;
    score: number;
  };
}

interface CommunityData {
  recycle: {
    metal: boolean;
    paper: boolean;
    plastic: boolean;
    glass: boolean;
    food: boolean;
    score: number;
  };
  volunteer: {
    tree: boolean;
    gardens: boolean;
    wildlife: boolean;
    ocean: boolean;
    other: boolean;
    donation: number;
    score: number;
  };
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  travel?: TravelData;
  food?: FoodData;
  energy?: EnergyData;
  community?: CommunityData;
}

export class User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  travel: TravelData;
  food: FoodData;
  energy: EnergyData;
  community: CommunityData;

  static defaultTravel: TravelData = {
    flight: {
      yearlyKM: 0,
      numFlights: 0,
      class: "economy",
      score: 0,
    },
    car: {
      weeklyKm: 0,
      type: "petrol",
      year2000: "before",
      score: 0,
    },
    transport: {
      drive: 0,
      carpool: 0,
      walk: 0,
      cycle: 0,
      train: 0,
      bus: 0,
      score: 0,
    },
  };

  static defaultEnergy: EnergyData = {
    energy: {
      electric: 0,
      gas: 0,
      oil: 0,
      coal: 0,
      lpg: 0,
      propane: 0,
      wood: 0,
      factor: 0,
      score: 0,
    },
    // ... (same as before)
  };

  static defaultFood: FoodData = {
    diet: {
      type: "carnivore",
      calories: 0,
      score: 0,
    },
    farm: {
      local: false,
      produce: 0,
      organic: 0,
      seasonal: false,
      crop: false,
      score: 0,
    },
    dining: {
      out: false,
      waste: false,
      score: 0,
    },
  };

  static defaultCommunity: CommunityData = {
    recycle: {
      metal: false,
      paper: false,
      plastic: false,
      glass: false,
      food: false,
      score: 0,
    },
    volunteer: {
      tree: false,
      gardens: false,
      wildlife: false,
      ocean: false,
      other: false,
      donation: 0,
      score: 0,
    },
  };

  constructor(data: UserData) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.travel = data.travel || User.defaultTravel;
    this.food = data.food || User.defaultFood;
    this.energy = data.energy || User.defaultEnergy;
    this.community = data.community || User.defaultCommunity;
  }

  // Rest of the class methods
}
