import React from 'react';
import Banner from '../../Banner/Banner';
import HowItWorks from '../../../components/HomeComponents/HowItWorks';
import OurServices from '../../../components/HomeComponents/OurServices';
import Brands from '../../../components/HomeComponents/Brands';
import Features from '../../../components/HomeComponents/Features';
import Reviews from '../../../components/HomeComponents/Reviews';
import FAQ from '../../../components/HomeComponents/FAQ';

const reviews = fetch('/reviews.json').then(res=>res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <Features></Features>
            <Reviews reviews={reviews}></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;