import pencil from "../../images/pencil.png";
import perfilImg from "../../images/perfil-image.jpg";
import add from "../../images/add.png";
import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
  onAddPlaceSubmit,
  popup,
  onCardClick,
  selectedCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
  
      <main className="main">
        <section className="profile">
          <div className="profile__picture-wrapper">
            <img
              className="profile__picture"
              src={currentUser.avatar || perfilImg}
              alt="imagem de perfil"
            />
            <div
              className="profile__overlay"
              onClick={() => onOpenPopup("editAvatar")}
            >
              <img src={pencil} alt="Editar" className="profile__icon" />
            </div>
          </div>
          <div className="profile__content">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__description">{currentUser.about}</p>
            </div>
            <button
              className="profile__button-edit"
              id="open__button_edit"
              onClick={() => onOpenPopup("editProfile")}
            >
              <img
                className="profile__button-icon"
                src={pencil}
                alt="botão editar"
              />
            </button>
          </div>
          <button
            className="profile__button-add"
            id="add__button"
            onClick={() => onOpenPopup("newCard")}
          >
            <img className="button-add-icon" src={add} alt="adicionar" />
          </button>
        </section>

        <ul className="gallery" id="gallery-container">
          {cards &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onOpenPopup={onOpenPopup}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onCardClick={onCardClick}
              />
            ))}
        </ul>

        {popup && (
          <Popup
            isOpen={true}
            onClose={onClosePopup}
            isImagePopup={popup === "imagePopup"}
            title={
              popup === "editProfile"
                ? "Editar Perfil"
                : popup === "editAvatar"
                ? "Editar Avatar"
                : popup === "newCard"
                ? "Novo Lugar"
                : null
            }
          >
            {popup === "editProfile" && <EditProfile />}
            {popup === "editAvatar" && <EditAvatar />}
            {popup === "newCard" && (
              <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />
            )}
            {popup === "imagePopup" && <ImagePopup card={selectedCard} />}
          </Popup>
        )}
      </main>

  );
}

export default Main;
