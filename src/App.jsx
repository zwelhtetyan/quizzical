import React, { useEffect, useState } from 'react';
import Question from './components/Question';
import Welcome from './components/Welcome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [questionData, setQuestionData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [isStartQuiz, setIsStartQuiz] = useState(false);
    const [checking, setChecking] = useState(false);
    const [selected, setSelected] = useState(false);
    const [numberOfCorrect, setNumberOfCorrect] = useState(0);

    const fetchData = async () => {
        const res = await fetch(
            'https://opentdb.com/api.php?amount=5&type=multiple'
        );
        const data = await res.json();
        setQuestionData(data.results);
    };

    //fetching data inside useEffect
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        questionData && settingAnswers(questionData);
    }, [questionData]);

    // preparing answers
    const settingAnswers = (dataArr) => {
        const finalArr = dataArr.map((data) => {
            const newArr = [...data.incorrect_answers];
            // (+1) means => correct answer will also be the last
            newArr.splice(
                Math.floor(Math.random() * newArr.length + 1),
                0,
                data.correct_answer
            );

            return newArr.map((ans) => {
                return {
                    answer: ans,
                    correct: ans === data.correct_answer ? true : false,
                    selected: false,
                };
            });
        });

        setAnswers(finalArr);
    };

    const startQuiz = () => {
        setIsStartQuiz((isStartQuiz) => !isStartQuiz);
    };

    //update selected and calculate number of correct answer
    useEffect(() => {
        setSelected(
            answers.every((answerArr) =>
                answerArr.some((ans) => ans.selected === true)
            )
        );
        setNumberOfCorrect((numberOfCorrect) => {
            const number = answers.filter((answerArr) =>
                answerArr.some((ans) => ans.selected && ans.correct)
            );
            return number.length;
        });
    }, [answers]);

    const handleSelect = (e, idx) => {
        setAnswers((prevAns) => {
            const newArr = prevAns[idx].map((ans) =>
                ans.answer === e.target.innerText
                    ? { ...ans, selected: true }
                    : { ...ans, selected: false }
            );
            prevAns.splice(idx, 1, newArr);
            return [...prevAns];
        });
    };

    const checkAnswer = (e) => {
        if (e.target.innerText === 'Play Again') {
            fetchData();
        }
        setChecking((checking) => !checking);
    };

    //notify alert
    const notify = () => {
        toast.info('You need to answer all question !', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <main className='main-container'>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {isStartQuiz ? (
                <Question
                    question={questionData}
                    answers={answers}
                    handleSelect={handleSelect}
                    checkAnswer={checkAnswer}
                    checking={checking}
                    selected={selected}
                    notify={notify}
                    numberOfCorrect={numberOfCorrect}
                />
            ) : (
                <Welcome startQuiz={startQuiz} question={questionData} />
            )}
            <img src='./images/blob 5.png' alt='' className='topRightBG' />
            <img src='./images/blobs.png' alt='' className='bottomLeftBG' />
        </main>
    );
};

export default App;
