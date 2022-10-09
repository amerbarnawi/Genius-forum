import React from "react";
// import heartRegular from "../../../assets/heart-regular.svg";
// import heartSolid from "../../../assets/heart-solid.svg";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { useFavorites } from "./FavoritesProvider";

function FavoriteIcon({ ChallengeId }) {
  const { favoritesIds, updateFavorite } = useFavorites();

  return (
    <div
      className="favorite-icon-div"
      onClick={() => updateFavorite(ChallengeId)}
    >
      {!favoritesIds ? (
        <MdFavoriteBorder className="favorite-icon" />
      ) : favoritesIds.length > 0 ? (
        favoritesIds.includes(ChallengeId) ? (
          <MdFavorite className="favorite-icon" />
        ) : (
          <MdFavoriteBorder className="favorite-icon" />
        )
      ) : (
        <MdFavoriteBorder className="favorite-icon" />
      )}
    </div>
  );
}

export default FavoriteIcon;
