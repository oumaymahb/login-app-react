import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Modal, ModalBody, ModalFooter,Button} from 'reactstrap';
import UserService from "../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword1 = this.onChangePassword1.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      email: "",
      firstName:"",
      lastName:"",
      password1: "",
      password2: "",
      phone:"",
      address:"",
      loading: false,
      message: "",
      modal:false
    };
  }
 
  toggle() {
    
    this.props.history.push('/login')
   
      this.setState({
        modal: !this.state.modal
      });
    }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword1(e) {
    this.setState({
      password1: e.target.value
    });
  }
  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    if(this.state.password1!=this.state.password2){
        this.setState({message:"Please verify password.",successful:false})
    }
    else if (this.checkBtn.context._errors.length === 0) {
      UserService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password1,
        this.state.phone,
        this.state.address
      ).then(response => {
        this.setState({
            message: response.data.message,
            successful: true,
            modal:true
          });
    })
    .catch((error)=> {
          this.setState({
            successful: false,
            message: error.response.data
          });
        }
      );
    }
  }

  render() {
    return (
        <>
        <Modal isOpen={this.state.modal} class="modal" fade={false}  toggle={this.toggle} >
         <div class="modalBody">
         <ModalBody>
            sign up with success
           </ModalBody>
          <ModalFooter>
            <Button class="danger" onClick={this.toggle} style={{backgroundColor: '#3633FF',color:'white'}}>Ok</Button>{' '}
          </ModalFooter>
         </div>
        
        </Modal>
    <div className="container">
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
              <div className="inputDiv">
            <div className="firstnameInp form-group">
              <label htmlFor="firstName">First Name</label>
              <Input
                type="text"
                className="form-control"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
                validations={[required]}
              />
            
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Input
                type="text"
                className="form-control"
                name="lastName"
                value={this.state.lastName}
                onChange={this.onChangeLastName}
                validations={[required]}
              />
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password1">Password  </label>
              <Input
                type="password"
                className="form-control"
                name="password1"
                minLength="6"
                value={this.state.password1}
                onChange={this.onChangePassword1}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Repeat password</label>
              <Input
                type="password"
                className="form-control"
                name="password2"
                minLength="6"
                value={this.state.password2}
                onChange={this.onChangePassword2}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <Input
                type="textarea"
                className="form-control"
                name="phone"
                minLength="8"
                value={this.state.phone}
                onChange={this.onChangePhone}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                className="form-control"
                name="address"
                minLength="8"
                value={this.state.address}
                onChange={this.onChangeAddress}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign up</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      </div>
      </>
    );
  }
}