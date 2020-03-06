import React from 'react';
import './HomePage.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className='HomeTitle'>
                <h1>Welcome to Jarvis Workstation!</h1>
                <p>
                    <br/><br/>
                    All work no play make Jack a dull boy.
                </p>
            </div>
        );
    }
}

export default HomePage;