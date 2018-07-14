import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LogoutLink from './LogoutLink';
import MesssageCount from './MessageCount';

class AuthNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasUnreadMessages: false
        }
    }

    checkForMessages = (count) => {
        this.setState({hasUnreadMessages: !!count});
    }

    render() {
        const user = this.props.user;

        return (
            <div className='navbar-container'>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-left">
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                        </li>
    
                    </ul>
                </div>
            </nav>
            <nav className="navbar navbar-dark navbar-right">
                <ul className="navbar-nav dropdown">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">{'Welcome: ' + user.name}<span className='plus'> +</span> <span><MesssageCount checkForMessages={this.checkForMessages} /></span></Link>
                    </li>
                    <div className='dropdown-content'>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/user/${user.name}`}>View Profile<span></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link${this.state.hasUnreadMessages ? ' red' : ''}`} to='/myMessages/'>Messages</Link>
                        </li>
                        <li className="nav-item">
                            {user.isAdmin && <Link className='nav-link' to='/adminPanel'>Admin Panel</Link>}
                        </li>
                        <li className="nav-item">
                            <LogoutLink />
                        </li>
                    </div>
                </ul>
            </nav>
        </div>    
        );
    }
}

export default withRouter(AuthNav);