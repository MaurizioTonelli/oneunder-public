import { useEffect, useState } from "react";

export const useFavoritePlayers = () => {
  const [favoritePlayers, setFavoritePlayers] = useState<any[]>([]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("favoritePlayers");
    if (storedPlayers) {
      setFavoritePlayers(JSON.parse(storedPlayers));
    }
  }, []);

  const add = (playerId) => {
    setFavoritePlayers([...favoritePlayers, playerId]);
    localStorage.setItem(
      "favoritePlayers",
      JSON.stringify([...favoritePlayers, playerId])
    );
  };
  const remove = (playerId) => {
    let newPlayers = favoritePlayers.filter((item) => item !== playerId);
    setFavoritePlayers(newPlayers);
    localStorage.setItem("favoritePlayers", JSON.stringify(newPlayers));
  };

  const toggle = (playerId) => {
    if (favoritePlayers.includes(playerId)) {
      remove(playerId);
    } else {
      add(playerId);
    }
  };

  return { list: favoritePlayers, setFavoritePlayers, toggle };
};
