
import React, { Component } from "react";
import { Link ,withRouter} from "react-router-dom";
import {Button} from "reactstrap"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
       
    }
    logout() {
            localStorage.clear()
            this.props.history.push("/login")
        }
    
    render() {
        return (
            <nav className="nav navbar navbar-expand ">
                <Link to={"/"} className="navbar-brand">
                    <img src="images/logo.svg"
                        width="160" alt="myoncare logo" class="company-logo" />
                </Link>

                <div >
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {
                                 localStorage.getItem("token") ?
                                 
                                    <Button className="logoutBtn" onClick={()=>this.logout()}>
                                        Logout
                                     </Button>
                                     :
                                     <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                    
                                    
                            
                            }
                        </li>

                        <li className="nav-item">
                        {
                                localStorage.getItem("token")?
                                    ""
                                    :
                                    <Link to={"/signup"} className="nav-link">
                                        Sign up
                                    </Link>
                            }
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}

export default withRouter(Header);
