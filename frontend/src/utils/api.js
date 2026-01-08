class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // método para atualizar o token depois do login

  _makeRequest(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then((res) => this._handleServerResponse(res));
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  // metodo para adicionar like
  addLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  // metodo para remover like
  removeLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    // Se isLiked for true, remove a curtida (DELETE)
    // Se isLiked for false, adiciona a curtida (PUT)
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  updateUserInfo(data) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  updateAvatarInfo(data) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  // criar card
  addCard(data) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  // remover card
  removeCard(cardid) {
    return this._makeRequest(`/cards/${cardid}`, {
      method: "DELETE",
    });
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "c2b29e92-9f38-419a-be2d-1ca3d5baf512",
    "content-type": "application/json",
  },
});

export default api;
