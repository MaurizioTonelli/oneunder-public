export class MedalTournamentManager {
  tournament: any;

  constructor(tournament) {
    this.tournament = tournament;
  }

  getAllPlayerScores() {}

  static hasDisqualifyingStrokes(player, tournamentDays) {
    tournamentDays;
    // let hasDisquilifyingStrokes = false;
    return player.ghin == "777";
    // tournamentDays.map((tournamentDay) => {
    //   tournamentDay.rounds.map((round) => {
    //     round.scores
    //       .filter((score) => score.player._id == player._id)
    //       .map((score) => {
    //         score.hole_strokes_list.forEach((holeStroke) => {
    //           if (holeStroke.strokes == 99) hasDisquilifyingStrokes = true;
    //         });
    //       });
    //   });
    // });
    // return hasDisquilifyingStrokes;
  }

  static getPlayerScoresPerTournamentDay(
    tournamentDays,
    player,
    scoreType = "net"
  ) {
    let scoreObj = {
      playerName: player.name,
      days: {},
      get totalScore() {
        return Object.values(this.days).reduce(
          (sum: number, current: any) => sum + current,
          0
        );
      },
      get last9Score() {
        return Object.values(this.days)
          .slice(-9) // Get the last 9 holes
          .reduce((sum: number, current: any) => sum + current, 0);
      },
      get last6Score() {
        return Object.values(this.days)
          .slice(-6) // Get the last 6 holes
          .reduce((sum: number, current: any) => sum + current, 0);
      },
      get last3Score() {
        return Object.values(this.days)
          .slice(-3) // Get the last 3 holes
          .reduce((sum: number, current: any) => sum + current, 0);
      },
      get last1Score() {
        return Object.values(this.days)
          .slice(-1) // Get the last hole
          .reduce((sum: number, current: any) => sum + current, 0);
      },
      holeStrokes: {},
      strokes: 0,
    };
    const playerId = player._id;

    tournamentDays.map((tournamentDay) => {
      tournamentDay.rounds.map((round) => {
        const course = round.course;
        round.scores
          .filter((score) => score.player._id == playerId)
          .map((score) => {
            if (scoreObj.days[tournamentDay.day]) {
              scoreObj.holeStrokes[tournamentDay.day] = score.hole_strokes_list;
              scoreObj.days[tournamentDay.day] += Number(
                getTotalScore(
                  score,
                  course.tees[0].holes,
                  tournamentDay.category == "D" ||
                    tournamentDay.category == "D-E" ||
                    tournamentDay.category == "DamasC" ||
                    tournamentDay.category == "E" ||
                    tournamentDay.category == "Damas2da"
                    ? "stableford"
                    : scoreType,
                  tournamentDay.category == "D" ||
                    tournamentDay.category == "D-E" ||
                    tournamentDay.category == "DamasA" ||
                    tournamentDay.category == "DamasB" ||
                    tournamentDay.category == "DamasC" ||
                    tournamentDay.category == "E" ||
                    tournamentDay.category == "Damas2da" ||
                    tournamentDay.category == "Damas1ra" ||
                    tournamentDay.category == "Senior" ||
                    tournamentDay.category == "SuperSenior"
                    ? false
                    : true
                )
              );
            } else {
              scoreObj.holeStrokes[tournamentDay.day] = score.hole_strokes_list;
              scoreObj.days[tournamentDay.day] = getTotalScore(
                score,
                course.tees[0].holes,
                tournamentDay.category == "D" ||
                  tournamentDay.category == "E" ||
                  tournamentDay.category == "DamasC" ||
                  tournamentDay.category == "D-E" ||
                  tournamentDay.category == "Damas2da"
                  ? "stableford"
                  : scoreType,
                tournamentDay.category == "D" ||
                  tournamentDay.category == "E" ||
                  tournamentDay.category == "D-E" ||
                  tournamentDay.category == "DamasA" ||
                  tournamentDay.category == "DamasB" ||
                  tournamentDay.category == "DamasC" ||
                  tournamentDay.category == "Damas2da" ||
                  tournamentDay.category == "Damas1ra" ||
                  tournamentDay.category == "Senior" ||
                  tournamentDay.category == "SuperSenior"
                  ? false
                  : true
              );
            }
            scoreObj.strokes += score.hole_strokes_list.reduce(
              (acc, curr) => acc + Number(curr.strokes),
              0
            );
          });
      });
    });
    return scoreObj;
    //score por dia
  }
}

export const getScores = (
  playerAStrokes: any[],
  playerBStrokes: any[],
  playerAHandicap: string,
  playerBHandicap: string,
  holeAdvantages: { number: string; advantage: string }[]
): (number | null)[] => {
  let gameStops: boolean = false;

  let scores: (number | null)[] = [];
  for (let index = 0; index < playerAStrokes.length; index++) {
    const holeA = playerAStrokes[index];
    const holeB = playerBStrokes[index];
    if (
      parseInt(holeA.strokes) == 0 ||
      parseInt(holeB.strokes) == 0 ||
      gameStops
    )
      scores.push(null);
    else {
      const strokesA =
        parseInt(holeA.strokes) -
        getStrokesToReduce(
          Number(playerAHandicap) -
            Math.min(Number(playerAHandicap), Number(playerBHandicap)),
          Number(
            holeAdvantages.find(
              (holeAdv) => Number(holeAdv.number) == index + 1
            )?.advantage
          )
        );
      const strokesB =
        parseInt(holeB.strokes) -
        getStrokesToReduce(
          Number(playerBHandicap) -
            Math.min(Number(playerAHandicap), Number(playerBHandicap)),
          Number(
            holeAdvantages.find(
              (holeAdv) => Number(holeAdv.number) == index + 1
            )?.advantage
          )
        );

      if (strokesA < strokesB) scores.push(1);
      else if (strokesA > strokesB) scores.push(-1);
      else scores.push(0);
    }
    const currentDifferential = Math.abs(
      scores.reduce((acc: number, cv: number | null) => {
        if (cv != null) {
          return acc + cv;
        }
        return acc;
      }, 0)
    );
    const currentHolesLeft = 18 - index - 1;
    if (currentDifferential > currentHolesLeft) {
      gameStops = true;
    }
  }
  return scores;
};
export const getCourseTeeHoles = (
  roundsWithScores: any[] | undefined,
  preferentialRound: string | null = null
) => {
  if (preferentialRound) {
    return roundsWithScores?.find((round) => round.id == preferentialRound)
      .round_tees[0].holes;
  }
  if (roundsWithScores) {
    for (let i = 0; i < roundsWithScores.length; i++) {
      for (let j = 0; j < roundsWithScores[i].round_tees.length; j++) {
        return roundsWithScores[i].round_tees[j].holes;
      }
    }
  }
};

export const getTeeHoleInfo = (courseTeeHoles: any[], holeNumber: number) => {
  if (courseTeeHoles)
    return courseTeeHoles.find((tee: any) => tee.number == holeNumber);
};

export const getFirst9TeeAdvantageSum = (courseTeeHoles: any[]) => {
  const result = courseTeeHoles
    .filter((tee) => Number(tee.number) <= 9)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.advantage,
      0
    );
  return result;
};
export const getBack9TeeAdvantageSum = (courseTeeHoles: any[]) => {
  const result = courseTeeHoles
    .filter((tee) => Number(tee.number) >= 10)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.advantage,
      0
    );
  return result;
};
export const getTeeAdvantageSum = (courseTeeHoles: any[]) => {
  const result = courseTeeHoles.reduce(
    (accumulator, currentValue) => accumulator + currentValue.advantage,
    0
  );
  return result;
};
export const getFirst9TeeParSum = (courseTeeHoles: any[]) => {
  const result = courseTeeHoles
    .filter((tee) => Number(tee.number) <= 9)
    .reduce((accumulator, currentValue) => accumulator + currentValue.par, 0);
  return result;
};
export const getBack9TeeParSum = (courseTeeHoles: any[]) => {
  const result = courseTeeHoles
    .filter((tee) => Number(tee.number) >= 10)
    .reduce((accumulator, currentValue) => accumulator + currentValue.par, 0);
  return result;
};
export const getTeeParSum = (courseTeeHoles: any[]) => {
  const result = courseTeeHoles.reduce(
    (accumulator, currentValue) => accumulator + currentValue.par,
    0
  );
  return result;
};
export const getTeePar = (courseTeeHoles?: any[], holeNumber?: Number) => {
  return courseTeeHoles?.find((tee) => Number(tee.number) == Number(holeNumber))
    ?.par;
};

export const getParSymbolValues = (
  hole_strokes_list: any[],
  courseTeeHoles: any[],
  holeNumber: number
): { symbol: "square" | "circle" | null; double: boolean } => {
  const teePar = getTeePar(courseTeeHoles, holeNumber);
  const holeScore = getHoleScore(hole_strokes_list, holeNumber.toString());

  const result = Number(holeScore) - Number(teePar);
  if (result == 0 || holeScore == 0) {
    return {
      symbol: null,
      double: false,
    };
  }
  if (result == 1) {
    return {
      symbol: "square",
      double: false,
    };
  }
  if (result == -1) {
    return {
      symbol: "circle",
      double: false,
    };
  }
  if (result > 1) {
    return {
      symbol: "square",
      double: true,
    };
  }
  if (result < -1) {
    return {
      symbol: "circle",
      double: true,
    };
  }
  return {
    symbol: null,
    double: false,
  };
};

export const getPureScores = (roundsWithScores: any[] | undefined) => {
  let result: any[] = [];
  if (roundsWithScores) {
    roundsWithScores.forEach((roundWithScores) => {
      roundWithScores.scores.forEach((score: any) => {
        result.push(score);
      });
    });
  }
  return result;
};

//MARK: - Get total stokes depending hole adv and player hcp
const getStrokesToReduce = (
  player_hcp: number,
  hole_adv: number,

  hole_count: number = 18
) => {
  //        print("Player hcp: " + String(player_hcp))
  //        print("Hole adv: " + String(hole_adv))
  let strokes_minus_hcp = 0;

  let reminder = player_hcp % hole_count; // Here I have the residue
  let times_in = Number(Math.floor(player_hcp / hole_count));

  strokes_minus_hcp += times_in;

  if (reminder >= hole_adv) {
    strokes_minus_hcp += 1;
  }
  //        print("Strokes minus: " + String(strokes_minus_hcp))
  return strokes_minus_hcp;
};

const getStableFordHoleScore = (strokes: number, par: number) => {
  if (par - strokes <= -3) return 0;
  return par - strokes + 2;
};

export const getNetScoreToDate = (score: any, courseTeeHoles: any[]) => {
  const totScore = score.hole_strokes_list.reduce(
    (accumulator: number, currentValue: any) => {
      const teeHole = courseTeeHoles.find(
        (tee) => tee.number == Number(currentValue.number)
      );

      if (currentValue.strokes == 0) return accumulator;
      let result = 0;

      result = accumulator + Number(currentValue.strokes);

      result -= getStrokesToReduce(
        Math.round(score.handicap * 0.8),
        teeHole.advantage
      );

      return result;
    },
    0
  );
  return totScore;
};

export const getTotalScore = (
  score: any,
  courseTeeHoles: any[],
  scoreType: string,
  disableHandicap: boolean = false
) => {
  const totScore = score.hole_strokes_list.reduce(
    (accumulator: number, currentValue: any) => {
      const teeHole = courseTeeHoles.find(
        (tee) => tee.number == Number(currentValue.number)
      );

      if (currentValue.strokes == 0) return accumulator;
      let result = 0;
      if (scoreType == "net" || scoreType == "gross") {
        result =
          Number(accumulator) +
          Number(currentValue.strokes) -
          Number(teeHole.par);
      }
      if (scoreType == "stableford") {
        result =
          accumulator +
          Number(
            getStableFordHoleScore(
              currentValue.strokes -
                (disableHandicap
                  ? 0
                  : getStrokesToReduce(
                      Math.round(score.handicap * 0.8),
                      teeHole.advantage
                    )),
              teeHole.par
            )
          );
      }
      if (scoreType == "net" && !disableHandicap) {
        result -= Number(
          getStrokesToReduce(
            Math.round(score.handicap * 0.8),
            teeHole.advantage
          )
        );
      }

      return result;
    },
    0
  );
  return totScore;
};
export const getThruScore = (hole_strokes_list: any[]) => {
  const lastHole = hole_strokes_list.find((hole) => hole.strokes == 0);
  if (!lastHole) return "F";
  let thruScore = 0;
  for (let i = hole_strokes_list.length - 1; i >= 0; i--) {
    if (hole_strokes_list[i].strokes != 0) {
      thruScore =
        hole_strokes_list[i].number % 18 == 0
          ? 18
          : hole_strokes_list[i].number % 18;
      break;
    }
  }
  for (let i = 0; i < hole_strokes_list.length; i++) {
    if (i == 0 && hole_strokes_list[i].strokes == 0) break;
    if (hole_strokes_list[i].strokes == 0) {
      thruScore = hole_strokes_list[i].number - (1 % 18);
      break;
    }
  }
  return thruScore;
};

export const getHoleScore = (hole_strokes_list: any[], holeNumber: string) => {
  return hole_strokes_list?.find(
    (hole_stroke) => hole_stroke.number == holeNumber
  ).strokes;
};

export const getFirst9 = (hole_strokes_list: any[]) => {
  const result = hole_strokes_list
    .filter((hole_stroke) => Number(hole_stroke.number) <= 9)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.strokes,
      0
    );
  return result;
};

export const getBack9 = (hole_strokes_list: any[]) => {
  const result = hole_strokes_list
    .filter((hole_stroke) => Number(hole_stroke.number) >= 10)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.strokes,
      0
    );
  return result;
};
export const getTotal = (hole_strokes_list: any[]) => {
  const result = hole_strokes_list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.strokes,
    0
  );
  return result;
};
export const getNet = (hole_strokes_list: any[], handicap: number) => {
  const result = hole_strokes_list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.strokes,
    0
  );
  return result - handicap;
};
export const getPosition = (place: number) => {
  if (place.toString().endsWith("1") && !place.toString().endsWith("11"))
    return `${place}st`;
  if (place.toString().endsWith("2") && !place.toString().endsWith("12"))
    return `${place}nd`;
  if (place.toString().endsWith("3") && !place.toString().endsWith("13"))
    return `${place}rd`;

  return `${place}th`;
};
export const getPositionColor = (place: number) => {
  if (place.toString() == "1") return "gold";
  if (place.toString() == "2") return "silver";
  if (place.toString() == "3") return "orange";
};

export const getSortedScores = (
  scores: any[],
  courseTeeHoles: any[],
  scoreType: string
) => {
  return scores.sort((scoreA, scoreB) => {
    if (scoreType == "gross" || scoreType == "net")
      return (
        getTotalScore(scoreA, courseTeeHoles, scoreType) -
        getTotalScore(scoreB, courseTeeHoles, scoreType)
      );
    else {
      //stableford
      return (
        getTotalScore(scoreB, courseTeeHoles, scoreType) -
        getTotalScore(scoreA, courseTeeHoles, scoreType)
      );
    }
  });
};
