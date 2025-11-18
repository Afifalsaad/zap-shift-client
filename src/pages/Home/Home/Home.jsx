import React from 'react';
import Banner from '../../Banner/Banner';
import HowItWorks from '../../../components/HomeComponents/HowItWorks';
import OurServices from '../../../components/HomeComponents/OurServices';
import Brands from '../../../components/HomeComponents/Brands';
import Features from '../../../components/HomeComponents/Features';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <Features></Features>
        </div>
    );
};

export default Home;