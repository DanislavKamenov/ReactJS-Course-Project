import React, { Component } from 'react';
import webApi from '../../webModule/webApi';
import './CategoriesPage.css'
import { Link } from 'react-router-dom';

class CategoriesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    getCategories = () => {
        webApi.get('category/all')
            .then(categories => {
                this.setState(categories)
            })
            .catch(webApi.handleFetchError)
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const categories = this.state.categories.map(c => (
            <div key={c._id} className="card" style={{width: '18rem', height: '16rem'}}>
                <img className="card-img-top" src={c.icon} alt="Card" />
                <div className="card-body">
                    <h5 className="card-title">{c.name}</h5>
                    <p className="card-text">{c.description}</p>
                    <Link to={`/categories/${c._id}`} className="btn btn-primary">Go</Link>
                </div>
            </div>
        ))
        return (
            <main className='page categories-page'>
                {categories}
            </main>
        )
    }
}

export default CategoriesPage;