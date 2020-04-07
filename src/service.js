import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create({
     // headers: {csrf: 'token'}
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    switch (error.response.status) {
      case 400:
        this.getError("Password or Email Incorrect!")
        break;
      case 404:
        this.getError('Did You already Register ?')
        break;
      default:
        this.getError('An Error Occured Try Once again!')
        break;
    }
    return Promise.reject(error)
  }

  getError = (error) => {
    alert(error);
  }
  
  get(path, callback) {
    return this.service.get(path).then(
      (response) => callback(response)
    );
  }

  patch(path, payload, callback) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response));
  }

  post(path, payload, callback) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response));
  }
}

export default new Service;