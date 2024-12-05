import * as Realm from "realm-web";

export type TournamentDay = {
  _id: string | Realm.BSON.ObjectID;
  date?: string | Date;
  day?: number | Realm.BSON.Int32;
  rounds?: any[];
  ownerId: string;
  label?: string;
  category?: string;
};
export type Round = {
  _id: string | Realm.BSON.ObjectID;
  ownerId: string;
  name: string;
  startingHole: number | Realm.BSON.Long;
  handicapAdjustment: number;
  inverseHcp: boolean;
  course?: Course | Realm.BSON.ObjectID;
  best_ball_bets?: any[];
  betConfig?: any;
  dateCreated?: string | Date;
  medal_bets?: any[];
  nassau_bets?: any[];
  nassau_teams_bets?: any[];
  rabit_bets?: any[];
  scores?: any[];
  skins_bets?: any[];
  units_bet?: any[];
  wolf_bets?: any[];
  round_to_compare?: string;
  inverseMedalHcp?: boolean;
  inverseNassauHcp?: boolean;
  inverseRabbitsHcp?: boolean;
  inverseSkinsHcp?: boolean;
  inverseWolfHcp?: boolean;
  inverseBBallHcp?: boolean;
  roundAdmins?: string[];
  tournamentPlayers?: string[];
  betManagers?: string[];
};

export type Player = {
  _id: string | Realm.BSON.ObjectID;
  earnings_per_round?: PlayerEarningsInRound[];
  handicap_index: number | Realm.BSON.Double;
  name: string;
  nickname: string;
  ownerId: string;
  ghin?: string;
  email?: string;
  category?: string;
  phone_number?: string;
  club?: string;
};

export type Course = {
  _id: string;
  alias: string;
  city: string;
  country: string;
  name: string;
  ownerId: string;
  tees?: any[];
};
export type Oyes = {
  _id: string | Realm.BSON.ObjectID;
  ownerId: string;
  hole: string;
  distance: string;
  place: string;
  player: Player | Realm.BSON.ObjectID;
};

export type Tee = {
  ownerId: string;
  holes: Hole[];
  name: string;
  rating: Realm.BSON.Double;
  slope: Realm.BSON.Double;
};

export type Hole = {
  ownerId: string;
  par: Realm.BSON.Long;
  yards: Realm.BSON.Long;
  number: Realm.BSON.Long;
  advantage: Realm.BSON.Long;
};

export type Tournament = {
  date?: string | Date;
  ownerId: string;
  tournamentDays?: TournamentDay[];
  poolOfPlayers?: Player[];
  poolOfCourses?: Course | Realm.BSON.ObjectID;
  poolOfCoursesArray?: Course[];
  oyesList?: any[];
  tournamentName?: string;
  _id: string | Realm.BSON.ObjectID;
};

export type Score = {
  _id: string | Realm.BSON.ObjectID;
  ownerId: string;
  handicap: Realm.BSON.Long;
  tee: string;
  hole_strokes_list?: HoleScore[];
  player?: Realm.BSON.ObjectID;
  onlineLinkedScore?: Realm.BSON.ObjectID;
};

export type HoleScore = {
  number: string;
  ownerId: string;
  strokes?: number;
};

export type PlayerEarningsInRound = {
  _id: string | Realm.BSON.ObjectID;
  ownerId: string;
  player_id: string | Realm.BSON.ObjectID;
  round_id: string | Realm.BSON.ObjectID;
  best_ball: Realm.BSON.Long;
  match_ind: Realm.BSON.Long;
  match_teams: Realm.BSON.Long;
  medal: Realm.BSON.Long;
  nassau: Realm.BSON.Long;
  nassauPair: Realm.BSON.Long;
  rabbits: Realm.BSON.Long;
  skins: Realm.BSON.Long;
  total: Realm.BSON.Long;
  units: Realm.BSON.Long;
  wolf: Realm.BSON.Long;
};
