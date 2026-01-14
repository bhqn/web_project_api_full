import "../index.css";
import Header from "./Header/Header.jsx";
import HeaderAuth from "./HeaderAuth/HeaderAuth.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/login.jsx";
import Register from "./Register/Register.jsx";
import * as auth from "../utils/auth.js";
import { getToken } from "../utils/token.js";
import InfoTooltip from "./Main/components/Popup/components/InfoTooltip/InfoTooltip.jsx";
import { getUserInfo } from "../utils/auth.js";

function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(""); // 'success' ou 'error'
  const [tooltipMessage, setTooltipMessage] = useState("");

 useEffect(() => {
  const jwt = getToken();

  if (!jwt) {
    setIsCheckingAuth(false);
    return;
  }

  auth.getUserInfo(jwt)
    .then((userRes) => {
      setUserData(userRes.data);
      setIsLoggedIn(true);

      return Promise.all([
        api.getUserInfo(),
        api.getInitialCards(),
      ]);
    })
    .then(([userInfoRes, cardsRes]) => {
      setCurrentUser(userInfoRes.data);
      setCards(cardsRes.data);
    })
    .catch((err) => {
      console.error(err);
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
    })
    .finally(() => {
      setIsCheckingAuth(false);
    });
}, []);


const handleCardLike = async (card) => {
  const isLiked = card.likes.some(
    (id) => id === currentUser._id
  );

  try {
    const newCard = await api.changeLikeCardStatus(card._id, isLiked);
    setCards((state) =>
      state.map((currentCard) =>
        currentCard._id === card._id ? newCard.data : currentCard
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  const handleInfoTooltip = (status, message) => {
    setTooltipStatus(status);
    setTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  };

  const handleCardDelete = async (card) => {
    try {
      await api.removeCard(card._id);
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Erro ao remover card:", error);
    }
  };

  

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData.data);
        setPopup(null);
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatarInfo(data)
      .then((newData) => {
        setCurrentUser(newData.data);
        setPopup(null);
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        console.log(newCard)
        setCards([newCard.data, ...cards]);
        setPopup(null);
      })
      .catch(console.error);
  };

  //parte do login
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userData, setUserData] = useState({ email: "" });

  const handleRegistration = (data) => {
    // Recebe o objeto completo
    auth
      .register(data) // Passa o objeto completo
      .then(() => {
        handleInfoTooltip("success", "Vitória! Você precisa se registrar.");
        navigate("/login");
      })
      .catch((err) => {
        handleInfoTooltip(
          "error",
          "Ops, algo deu errado! Por favor, tente novamente."
        );
        console.error(err);
      });
  };

  const handleLogin = ({ email, password }) => {
  if (!email || !password) {
    console.warn("Email ou senha ausentes");
    return;
  }

  auth
    .authorize({ email, password })
    .then((data) => {
      // Normaliza o token (evita erro token vs jwt)
      const token = data?.token || data?.jwt;

      if (!token) {
        console.error("Token não retornado pela API:", data);
        return;
      }

      // Salva SOMENTE o token puro
      localStorage.setItem("jwt", token);

      console.log("✅ Login OK — token salvo:", token);

      setUserData({ email });
      setIsLoggedIn(true);
      navigate("/");
    })
    .catch((err) => {
      console.error("❌ Erro no login:", err);
    });
};

  function signOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <>
      <Routes>
        {/* ROTA LOGIN */}
        <Route
          path="/login"
          element={
            <>
              <HeaderAuth />
              <Login handleLogin={handleLogin} />{" "}
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <HeaderAuth />
              <Register handleRegistration={handleRegistration} />
            </>
          }
        />

        {/* ROTA PRINCIPAL */}
        <Route
          path="/"
          element={
            isCheckingAuth ? (
              <div>Carregando...</div>
            ) : isLoggedIn ? (
              <div className="page">
                <CurrentUserContext.Provider
                  value={{
                    currentUser,
                    handleUpdateUser,
                    handleUpdateAvatar,
                  }}
                >
                  <Header userData={userData} onSignOut={signOut} />
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onOpenPopup={setPopup}
                    onClosePopup={() => setPopup(null)}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    popup={popup}
                    onCardClick={(card) => {
                      setSelectedCard(card);
                      setPopup("imagePopup");
                    }}
                    selectedCard={selectedCard}
                  />
                  <Footer />
                </CurrentUserContext.Provider>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        status={tooltipStatus}
        message={tooltipMessage}
      />
    </>
  );
}

export default App;
