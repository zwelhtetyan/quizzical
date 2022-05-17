import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

const Question = (props) => {
    const questionAndAnswers = props.question.map((data, idx) => {
        return (
            <div key={nanoid()} className='question-and-answer'>
                <div className='question'>
                    {decode(data.question, { level: 'html5' })}
                </div>

                <div className='answers'>
                    {props.answers[idx].map((ans) => {
                        return (
                            <button
                                key={nanoid()}
                                className={`ansItem ${
                                    ans.selected ? 'selected' : ''
                                } ${
                                    props.checking && ans.correct
                                        ? 'correct'
                                        : ''
                                } ${
                                    props.checking &&
                                    ans.selected &&
                                    !ans.correct
                                        ? 'incorrect'
                                        : ''
                                }`}
                                onClick={(e) => props.handleSelect(e, idx)}
                                disabled={props.checking ? true : false}
                            >
                                {decode(ans.answer, { level: 'html5' })}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    });

    return (
        <div className='question-container'>
            {questionAndAnswers}
            <div className='footer'>
                {props.checking && (
                    <p className='score'>{`You scored ${props.numberOfCorrect}/5 correct answers`}</p>
                )}
                <button
                    className='check-answers'
                    onClick={props.selected ? props.checkAnswer : props.notify}
                    style={{ margin: props.checking && 'unset' }}
                    disabled={props.loading ? true : false}
                >
                    {props.loading
                        ? 'loading'
                        : props.checking
                        ? `Play Again`
                        : 'Check Answers'}
                </button>
            </div>
        </div>
    );
};

export default Question;
