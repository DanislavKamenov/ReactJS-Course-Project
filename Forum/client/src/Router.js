import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import CategoriesPage from './components/pages/CategoriesPage';
import ViewPostsPage from './components/pages/ViewPostsPage';
import PostDetailsPage from './components/pages/PostDetailsPage';
import ProfilePage from './components/pages/ProfilePage';
import AdminPanel from './components/user/admin/AdminPanel';

const Router = () => (
    <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />  
        <Route path='/categories' exact component={CategoriesPage} />
        <Route path='/categories/:id' component={ViewPostsPage} />
        <Route path='/posts/:id' component={PostDetailsPage} />
        <Route path='/user/:username' component={ProfilePage} />
        <Route path='/adminPanel' component={AdminPanel} />
    </Switch>
);

export default Router;