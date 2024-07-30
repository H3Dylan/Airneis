// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './components/article/ArticleList';
import EditArticle from './components/article/EditArticle';
import CreateArticle from './components/article/CreateArticle';
import CategoryList from './components/category/CategoryList';
import EditCategory from './components/category/EditCategory';
import CreateCategory from './components/category/CreateCategory';
import OrderList from './components/order/OrderList';
import CreateOrder from './components/order/CreateOrder';
import EditOrder from './components/order/EditOrder';
import AdminHome from './components/AdminHome';
import TestChart from './components/TestChart';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin/articles/create" component={CreateArticle} />
                <Route path="/admin/articles/edit/:id" component={EditArticle} />
                <Route path="/admin/articles" exact component={ArticleList} />
                <Route path="/admin/categories/edit/:id" component={EditCategory} />
                <Route path="/admin/categories/create" component={CreateCategory} />
                <Route path="/admin/categories" exact component={CategoryList} />
                <Route path="/admin/orders/create" component={CreateOrder} />
                <Route path="/admin/orders/edit/:id" component={EditOrder} />
                <Route path="/admin/orders" component={OrderList} />
                <Route path="/admin" exact component={AdminHome} />
                <Route path="/test-chart" component={TestChart} />
            </Switch>
        </Router>
    );
};

export default App;
