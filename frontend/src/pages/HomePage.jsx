import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import Product from '../components/Product';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
    return (
        <>
        <Header />
        <Carousel />
        <p className='text-center lg:text-xl mt-12'>Venant des hautes terres d’Écosse, nos meubles sont immortels</p>
        <div className='flex flex-col items-center my-12 gap-4'>
            <h2 className='dream_avenue_font text-3xl'>Catégories</h2>
            <Category />
            <button className='btn p-2 rounded-lg'><Link to="/categories">Toutes les catégories</Link></button>
        </div>
        <div className='flex flex-col items-center my-12 gap-4'>
            <h2 className='dream_avenue_font text-center text-3xl'>Les Highlanders du moment</h2>
            <Product maxProducts={3}/>
            <button className='btn p-2 rounded-lg'><Link to="/products">Tous les produits</Link></button>
        </div>
        <Footer />
        </>
    )
};

export default HomePage;
