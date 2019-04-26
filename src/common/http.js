import axios from 'axios';

// const baseURL = 'http://eba.test.colourlife.com/';

export function createdAxios(URL) {
    var instance = axios.create();
    instance.defaults.baseURL = baseURL + URL;
    instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
    instance.defaults.withCredentials = true;
    instance.defaults.transformRequest = [
      function(data) {
        let newData = [];
        for (let k in data) {
          newData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
        }
        return newData.join('&');
      },
    ];
      return instance;
    }
export function createdFormDataAxios(URL, params) {
    let formData = new FormData();
    for (var variable in params) {
    if (params.hasOwnProperty(variable)) {
        formData.append(variable, params[variable]);
    }
    }
    return axios.post(baseURL + URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
    });
}