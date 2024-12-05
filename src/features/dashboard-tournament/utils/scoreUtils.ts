export const getCourseTeeHoles = (
  roundsWithScores: any[] | undefined,
  preferentialRound: string | null = null
) => {
  if (!roundsWithScores || roundsWithScores.length == 0) return null;
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
export const getTeePar = (courseTeeHoles: any[], holeNumber: Number) => {
  return courseTeeHoles.find((tee) => Number(tee.number) == Number(holeNumber))
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
  if (!roundsWithScores) return null;
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

      result = accumulator + currentValue.strokes;

      result -= getStrokesToReduce(score.handicap, teeHole.advantage);

      return result;
    },
    0
  );
  return totScore;
};

export const getTotalScore = (
  score: any,
  courseTeeHoles: any[],
  scoreType: string
) => {
  const totScore = score.hole_strokes_list.reduce(
    (accumulator: number, currentValue: any) => {
      const teeHole = courseTeeHoles.find(
        (tee) => tee.number == Number(currentValue.number)
      );

      if (currentValue.strokes == 0) return accumulator;
      let result = 0;
      if (scoreType == "net" || scoreType == "gross") {
        result = accumulator + currentValue.strokes - teeHole.par;
      }
      if (scoreType == "stableford") {
        result =
          accumulator +
          getStableFordHoleScore(
            currentValue.strokes -
              getStrokesToReduce(score.handicap, teeHole.advantage),
            teeHole.par
          );
      }
      if (scoreType == "net") {
        result -= getStrokesToReduce(score.handicap, teeHole.advantage);
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
  return hole_strokes_list.find(
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
