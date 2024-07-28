// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './components/ArticleList.jsx';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin/articles" component={ArticleList} />
                {/* Ajoute des routes pour d'autres ressources ici */}
            </Switch>
        </Router>
    );
};

export default App;
