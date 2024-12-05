type GolfHole = {
  number: string;
  ownerId: string;
  strokes: string;
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

export const getHandicapAdvantagedHoles = (
  playerAHcp: number,
  playerBHcp: number,
  holes: { number: string; advantage: string }[]
) => {
  let advantagesPerHole: { number: number; advantage: number }[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ].map((val) => ({ number: val, advantage: 0 }));

  for (let i = 1; i <= playerAHcp; i++) {
    const holeToLookup = i % 18 == 0 ? 18 : i % 18;
    const holeToAddAdvantageTo = holes.find(
      (hole) => Number(hole.advantage) == holeToLookup
    )?.number;
    const holeInAdvantagesIndex = advantagesPerHole.findIndex(
      (adv) => adv.number == Number(holeToAddAdvantageTo)
    );
    if (advantagesPerHole[holeInAdvantagesIndex]) {
      advantagesPerHole[holeInAdvantagesIndex].advantage += 1;
    }
  }
  for (let i = 1; i <= playerBHcp; i++) {
    const holeToLookup = i % 18 == 0 ? 18 : i % 18;
    const holeToAddAdvantageTo = holes.find(
      (hole) => Number(hole.advantage) == holeToLookup
    )?.number;
    const holeInAdvantagesIndex = advantagesPerHole.findIndex(
      (adv) => adv.number == Number(holeToAddAdvantageTo)
    );
    if (advantagesPerHole[holeInAdvantagesIndex]) {
      advantagesPerHole[holeInAdvantagesIndex].advantage -= 1;
    }
  }
  return advantagesPerHole;
  // for (let i = 1; i <= 18; i++) {
  //   let currentHole = advantagesPerHole.findIndex((adv) => adv.number == i);

  //   if (currentHole) {
  //     advantagesPerHole[currentHole].advantage = advantagesPerHole[currentHole].advantage - 1;
  //   }
  // }
};

export const getScores = (
  playerAStrokes: GolfHole[],
  playerBStrokes: GolfHole[],
  playerAHandicap: string,
  playerBHandicap: string,
  holeAdvantages: { number: string; advantage: string }[]
): (number | null)[] => {
  let gameStops: boolean = false;
  // for (let i = 0; i < 18; i++) {
  //   if (!gameStopsAtHole) {
  //     const currentDifferential = Math.abs(
  //       scores.slice(0, i + 1).reduce((acc: number, cv: number | null) => {
  //         if (cv != null) {
  //           return acc + cv;
  //         }
  //         return acc;
  //       }, 0)
  //     );
  //     const currentHolesLeft = 18 - i - 1;
  //     if (currentDifferential > currentHolesLeft) {
  //       gameStopsAtHole = i + 1;
  //     }
  //   } else {
  //     break;
  //   }
  // }

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

export const getResult = (
  playerAStrokes: GolfHole[],
  playerBStrokes: GolfHole[],

  playerAHandicap: string,
  playerBHandicap: string,
  holeAdvantages: { number: string; advantage: string }[],
  side: string
): "winner" | "loser" | "tied" => {
  const scoresArray = getScores(
    playerAStrokes,
    playerBStrokes,
    playerAHandicap,
    playerBHandicap,
    holeAdvantages
  );
  const totalScore = scoresArray.reduce((acc: number, cv: number | null) => {
    if (cv != null) return acc + cv;
    else return acc;
  }, 0);

  if ((totalScore > 0 && side == "blue") || (totalScore < 0 && side == "red")) {
    return "winner";
  } else if (
    (totalScore < 0 && side == "blue") ||
    (totalScore > 0 && side == "red")
  ) {
    return "loser";
  } else {
    return "tied";
  }
};

export const getMatchResult = (
  yourStrokes: GolfHole[],
  theirStrokes: GolfHole[],

  playerAHandicap: string,
  playerBHandicap: string,
  holeAdvantages: { number: string; advantage: string }[]
): {
  yourPoints: number;
  holesLeft: number;
} => {
  const scores = getScores(
    yourStrokes,
    theirStrokes,
    playerAHandicap,
    playerBHandicap,
    holeAdvantages
  );
  const yourPoints = scores.reduce((acc: number, cv: number | null) => {
    if (cv != null) {
      return acc + cv;
    } else return acc;
  }, 0);

  const holesLeft = scores.reduce((acc: number, cv: number | null) => {
    if (cv == null) {
      return acc + 1;
    } else return acc;
  }, 0);

  return { yourPoints, holesLeft };
};

export const getTeeHoleInfo = (courseTeeHoles: any[], holeNumber: number) => {
  if (courseTeeHoles)
    return courseTeeHoles.find((tee: any) => tee.number == holeNumber);
};

export const getHoleScore = (hole_strokes_list: any[], holeNumber: string) => {
  return hole_strokes_list.find(
    (hole_stroke) => hole_stroke.number == holeNumber
  ).strokes;
};

export const getThruScore = (hole_strokes_list: any[]) => {
  const lastHole = hole_strokes_list.find((hole) => hole.strokes == 0);
  if (!lastHole) return "F";
  let thruScore = 0;
  for (let i = hole_strokes_list.length - 1; i >= 0; i--) {
    if (hole_strokes_list[i].strokes != 0) {
      thruScore = hole_strokes_list[i].number % 18;
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

export const isGameOver = (scores: (number | null)[]) => {
  let gameStopsAtHole: number | null = null;
  for (let i = 0; i < 18; i++) {
    if (!gameStopsAtHole) {
      const currentDifferential = Math.abs(
        scores.slice(0, i + 1).reduce((acc: number, cv: number | null) => {
          if (cv != null) {
            return acc + cv;
          }
          return acc;
        }, 0)
      );
      const currentHolesLeft = 18 - i - 1;
      if (currentDifferential > currentHolesLeft) {
        gameStopsAtHole = i + 1;
      }
    } else {
      break;
    }
  }
  const differential = Math.abs(
    scores.reduce((acc: number, cv: number | null) => {
      if (cv != null) {
        return acc + cv;
      }
      return acc;
    }, 0)
  );

  const holesLeft = scores.reduce((acc: number, cv: number | null) => {
    if (cv == null) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (differential > holesLeft) {
    return { gameOver: true, gameStopsAtHole: gameStopsAtHole };
  }
  return { gameOver: false, gameStopsAtHole: gameStopsAtHole };
};
