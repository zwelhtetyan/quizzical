import React from 'react';

const Welcome = (props) => {
    return (
        <div className='welcome'>
            <h1 className='title'>Quizzical</h1>
            <p className='description'>
                Choose the correct answer and have fun 🎉​
            </p>
            <button
                className='start-quiz'
                onClick={props.startQuiz}
                disabled={props.question.length !== 0 ? false : true}
            >
                {props.question.length !== 0 ? 'Start Quiz' : 'loading'}
            </button>
        </div>
    );
};

export default Welcome;
