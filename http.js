export class Http {
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            const method = 'GET';

            http.open(method, url);
            http.onreadystatechange = function () {
              const STATUS_CODE_OK = 200;
              if (http.readyState === XMLHttpRequest.DONE) {
                if (http.status == STATUS_CODE_OK) {
                  resolve(JSON.parse(http.responseText));
                } else {
                  reject('Something went wrong!');
                }
              }
            };
            http.send();
        })
    }
}