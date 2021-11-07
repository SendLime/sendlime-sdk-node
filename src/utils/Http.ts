import axios from 'axios';

const httpClient = axios.create({ baseURL: 'https://brain.sendlime.com/' });

export default class Http {
  static get = httpClient.get;
  static post = httpClient.post;
  static put = httpClient.put;
  static delete = httpClient.delete;
}
