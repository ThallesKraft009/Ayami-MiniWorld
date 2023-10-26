import fetch from "node-fetch";

 class SquareCloud {
  constructer({token, api_key, api_id}){
    this.token = token;
    this.apiKey = api_key;
    this.apiId = api_id;
    this.result;
  }

  async getInfo(){

    const options = {
      method: 'GET',
      headers: {
        Authorization: `${this.apiKey}`
      }
    };

fetch(`https://api.squarecloud.app/v2/apps/${this.apiId}`, options)
  .then(response => response.json())
  .then(response => {
    this.result = response
  })
  .catch(err => console.error(err));
  }

  async getStatus(){
    const options = {
      method: 'GET', 
      headers: {
        Authorization: `${this.apiKey}`
      }
    };

fetch(`https://api.squarecloud.app/v2/apps/${this.apiId}/status`, options)
  .then(response => response.json())
  .then(response => {
    return response
  })
  .catch(err => console.error(err));
  }
};

export { SquareCloud };