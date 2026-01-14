import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const { name, link, likes, owner } = props.card;
  const { onCardLike, onCardDelete, onCardClick } = props;

  // ⚠️ Proteção contra undefined
  const isOwner = owner === currentUser.currentUser._id;

  // 👍 Verifica se o usuário já curtiu
  const isLiked = likes?.some(id => id === currentUser.currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    onCardDelete(props.card);
  };

  const handleImageClick = () => {
    onCardClick(props.card);
  };

  return (
    <li className="gallery__card">
      {isOwner && (
        <button
          className="card__button-remove"
          aria-label="Excluir cartão"
          onClick={handleDeleteClick}
        />
      )}

      <img
        src={link}
        alt={name}
        className="gallery__image"
        onClick={handleImageClick}
      />

      <div className="card">
        <p className="card__title">{name}</p>

        <button
          aria-label="Curtir cartão"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
