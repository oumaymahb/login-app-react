import React, { Component } from "react";
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

import UserService from "../services/user.service";
import { Link } from "react-router-dom";
const AddressRenderer = ({ field }) => <textarea {...field} />;

function phoneNumberVerification(inputtxt) {
    var regex =/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return (regex.test(inputtxt))
  }

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList:[],
            loading: false,
            message: ""
    };
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
}

componentDidMount(){
    UserService.getAllUsers()
    .then((response) => {
        this.setState({
            usersList:response.data
        })
    })
    .catch(error => {
        console.log(error);
    })
  
}
updateUser(user){
        UserService.update(user.id,user.firstName,user.lastName,user.email,user.password,user.phone,user.address)
        .then((response) => {
            //to refresh the table after updating data
            UserService.getAllUsers()
            .then((response) => {
                this.setState({
                    usersList:response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        })
        return Promise.resolve(user);
}
deleteUser(user){
    UserService.delete(user.id)
    .then((response) => {
        UserService.getAllUsers()
        .then((response) => {
            this.setState({
                usersList:response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
    return Promise.resolve(user);
}
createUser(user){
    UserService.register(user.firstName,user.lastName,user.email,user.password,user.phone,user.address)
    .then((response) => {
        UserService.getAllUsers()
        .then((response) => {
            this.setState({
                usersList:response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
    return Promise.resolve(user);
}
    render() {
        return (
  <div style={styles.container}>
    <CRUDTable
      caption="Users List"
      items={this.state.usersList}
    >
      <Fields>
        <Field
          name="id"
          label="ID"
          hideInCreateForm
          readOnly
          value={this.state.id}
        />
        <Field
          name="firstName"
          label="First Name"
          value={this.state.firstName}
          placeholder="First Name"
        />
        <Field
          name="lastName"
          label="Last Name"
          value={this.state.lastName}
          placeholder="Last Name"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          value={this.state.email}
          placeholder="Email"
        />

        <Field
          name="password"
          label="Password"
          type="password"
          value={this.state.password}
          hideFromTable
          hideInUpdateForm
          placeholder="Password"
        />
        <Field
          name="phone"
          label="Phone"
          value={this.state.phone}
          placeholder="Phone"
        />
      <Field
          name="address"
          label="address"
          value={this.state.adress}
          render={AddressRenderer}
        />
      </Fields>
      <CreateForm
        title="Create new user"
        trigger="Create user"
        onSubmit={user=>this.createUser(user)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First Name is required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last Name is required.';
          }
          if (!values.email) {
            errors.email = 'Email is required.';
          }
          if (!values.address) {
            errors.address = 'Address is required.';
          }
          if (!phoneNumberVerification(values.phone)) {
            errors.phone = 'Please, provide a valid phone number.';
          }
          return errors;
        }}
      />

      <UpdateForm
        title="Update user"
        trigger="Update"
        onSubmit={user=>this.updateUser(user)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First Name is required.';
          }

          if (!values.lastName) {
            errors.lastName = 'Last Name is required.';
          }
          if (!values.address) {
            errors.address = 'Address is required.';
          }
          if (!phoneNumberVerification(values.phone)) {
            errors.phone = 'Please enter a valid phone number.';
          }
          return errors;
        }}
      />

      <DeleteForm
        title="Delete user"
        message="Are you sure you want to delete the user?"
        trigger="Delete"
        onSubmit={user=>this.deleteUser(user)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);
    }

    }