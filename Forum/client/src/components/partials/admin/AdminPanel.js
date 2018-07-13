import React, { Component } from 'react';
import PanelRow from './PanelRow';
import webApi from '../../../webModule/webApi';
import withAuthorization from './../../hocs/withAuthorization';
import './AdminPanel.css';

class AdminPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        webApi
            .get('user')
            .then((res) => this.setState({ users: res.users }))
            .catch(webApi.handleFetchError)
    }

    onBanClick = (e) => {
        const userId = e.target.dataset.id;
        const position = this.state.users.findIndex(u => u.id === userId);

        webApi
            .post(`user/ban/${userId}`, { isBanned: !this.state.users[position].isBanned })
            .then(res => {
                this.setState(prevState => prevState.users[position] = res.newUser);
            })
            .catch(webApi.handleFetchError);
    }

    onSilenceClick = (e) => {
        const userId = e.target.dataset.id;
        const position = this.state.users.findIndex(u => u.id === userId);

        webApi
            .post(`user/silence/${userId}`, { isSilenced: !this.state.users[position].isSilenced })
            .then(res => {
                this.setState(prevState => prevState.users[position] = res.newUser);
            })
            .catch(webApi.handleFetchError);
    }

    onDestroyClick = (e) => {
        const userId = e.target.dataset.id;
        const position = this.state.users.findIndex(u => u.id === userId);        

        webApi
            .delete(`user/${userId}`)
            .then(() => this.setState(prevState => prevState.users.splice(position, 1)))
            .catch(webApi.handleFetchError);
    }

    render() {
        const PanelRows = this.state.users.map((u, idx) =>
            <PanelRow
                key={u.id} {...u}
                idx={idx}
                onBanClick={this.onBanClick}
                onSilenceClick={this.onSilenceClick}
                onDestroyClick={this.onDestroyClick}
            />
        );
        return (
            <div className='page admin-panel'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PanelRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withAuthorization(AdminPanel, 'admin');