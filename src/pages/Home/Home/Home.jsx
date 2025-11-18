import React from 'react';
import Banner from '../../Banner/Banner';
import HowItWorks from '../../../components/HomeComponents/HowItWorks';
import OurServices from '../../../components/HomeComponents/OurServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;