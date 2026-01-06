import { useContext } from "react";
import ImagePopup from "../ImagePopup/ImagePopup";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { onCardLike, onCardDelete, onCardClick } = props; // Recebe a função como prop,
  const { CurrentUser } = useContext(CurrentUserContext);

  // Verificar se o usuário atual “curtiu” o cartão
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  // Crie o objeto imageComponent

  const handleLikeClick = () => {
    onCardLike(props.card); // ← Chama a função passada como prop
  };

  const handleDeleteClick = () => {
    onCardDelete(props.card);
  };

  const handleImageClick = () => {
    onCardClick(props.card); // ← Use esta função em vez do imageComponent
  };

  return (
    <li className="gallery__card">
      <button
        className="card__button-remove"
        alt="lixeira"
        onClick={handleDeleteClick}
      />
      <img
        src={link}
        alt={name}
        className="gallery__image"
        onClick={handleImageClick}
      />
      <div className="card">
        <p className="card__title">{name}</p>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
