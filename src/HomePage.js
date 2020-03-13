import React from 'react';
import './HomePage.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className='HomeTitle'>
                <h1>Welcome to Jarvis Workstation!</h1>
                <p>
                    <br/><br/>
                    I am Groot.
                </p>
            </div>
        );
    }
}

export default HomePage;