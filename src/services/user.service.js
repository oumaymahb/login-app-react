import axios from "axios";


class UserService {
  constructor() {
    this.state={
     token:JSON.parse(localStorage.getItem('token'))
    }
  }
  login(email, password) {
    console.log(this.state.token)
    return axios
      .post(process.env.REACT_APP_NODE_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        }
        return response.data;
      });
  }

  

  
  getAllUsers(){
    return axios.get(process.env.REACT_APP_NODE_URL,{ headers: {"Authorization" : `Bearer ${this.state.token}`} });
  }
  register(firstName,lastName, email, password,phone,address) {
    return axios.post(process.env.REACT_APP_NODE_URL + "signup/", {
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    });
  }
  update(id,firstName,lastName, email, password,phone,address) {
    return axios.put(process.env.REACT_APP_NODE_URL + "update/"+id, {
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    },{ headers: {"Authorization" : `Bearer ${this.state.token}`} });
  }
  delete(id) {
    return axios.delete(process.env.REACT_APP_NODE_URL + "delete/"+id,{ headers: {"Authorization" : `Bearer ${this.state.token}`} });
  }


}

export default new UserService();