import React from "react";
import heartRegular from "../../../assets/heart-regular.svg";
import heartSolid from "../../../assets/heart-solid.svg";

import { useFavorites } from "./FavoritesProvider";

function FavoriteIcon({ ChallengeId }) {
  const { favoritesIds, updateFavorite } = useFavorites();

  return (
    <div className="heart-image" onClick={() => updateFavorite(ChallengeId)}>
      <img
        id={ChallengeId}
        src={
          !favoritesIds
            ? heartRegular
            : favoritesIds.length > 0
            ? favoritesIds.includes(ChallengeId)
              ? heartSolid
              : heartRegular
            : heartRegular
        }
        alt="heart-favorite-icon"
      />
    </div>
  );
}

export default FavoriteIcon;
