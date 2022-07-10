
import {MESTO_SERVER} from './constants';
import {TCardData, TUserData} from './types';

const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export type MestoApiConfig = {
  address: string,
  token: string,
  groupId: string
}

export type CardSendData = {
  name: string, 
  link: string
}

export type UserInfoData = {
  name: string,
  about: string,
}

export type UserAvatarData = {
  avatar: string,
}

class MestoApi {
  _address: string;
  _token: string;
  _groupId: string;

  constructor({ address, token, groupId }: MestoApiConfig) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  getCardList(): Promise<TCardData[]> {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => getResponse<TCardData[]>(res))
  }

  addCard(data : CardSendData): Promise<TCardData> {
    return fetch(`${this._address}/${this._groupId}/cards/`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => getResponse<TCardData>(res))
  }

  removeCard(cardID: string): Promise<{message: string}> {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => getResponse<{message: string}>(res)) 
  }

  getUserInfo():Promise<TUserData> {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => getResponse<TUserData>(res)) 
  }

  setUserInfo(data: UserInfoData): Promise<TUserData> {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => getResponse<TUserData>(res)) 
  }

  setUserAvatar(data: UserAvatarData): Promise<TUserData> {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => getResponse<TUserData>(res)) 
      
  }

  changeLikeCardStatus(cardID: string, like: boolean):Promise<TCardData> {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => getResponse<TCardData>(res)) 
  }
}

const api = new MestoApi(MESTO_SERVER);

export default api;
