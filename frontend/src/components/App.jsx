import "../index.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar";
import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile";
import NewCard from "./Main/components/Popup/components/NewCard/NewCard";
import Popup from "./Main/components/Popup/Popup";
import ImagePopup from "./Main/components/ImagePopup/ImagePopup.jsx";

function App() {
  const [popup, setPopup] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api
      .getInitialCards() // ← Chama sua API
      .then((cardsData) => {
        setCards(cardsData); // ← AQUI você define os dados no estado!
      })
      .catch((error) => {
        console.error("Erro ao buscar cartões:", error);
      });
  }, []);

  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    try {
      await api.removeCard(card._id); // chamada à API (supondo que remove o card)

      // Atualiza o estado removendo o card com o id correspondente
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Erro ao remover card:", error);
    }
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .updateAvatarInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopup("imagePopup");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          popup={popup}
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
        <Footer />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
