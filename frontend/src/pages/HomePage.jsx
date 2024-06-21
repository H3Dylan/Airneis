import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import Product from '../components/Product';

const HomePage = () => {
    return (
        <>
        <Header />
        <Carousel />
        <p className='text-center lg:text-3xl'>Venant des hautes terres d’Écosse, nos meubles sont immortels</p>
        <div className='flex flex-col  items-center'>
            <h2>Catégories</h2>
            <Category />
            <button><Link to="/categories">Toutes les catégories</Link></button>
        </div>
        <div>
            <h2>Les Highlanders du moment</h2>
            <Product maxProducts={3}/>
        </div>
        </>
    )
};

export default HomePage;
