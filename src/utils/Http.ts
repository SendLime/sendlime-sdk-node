import axios from 'axios';

const httpClient = axios.create({ baseURL: 'https://api.sendlime.com/api/v2' });

export default class Http {
  static get = httpClient.get;
  static post = httpClient.post;
  static put = httpClient.put;
  static delete = httpClient.delete;
}
