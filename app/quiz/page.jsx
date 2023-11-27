'use client'
import React, { useState } from "react";
import { quiz } from "../data.js";



const page = () =>{
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [showReult, setShowResult] = useState(false)
    const [result, setResult] = useState({
        score: 0,
        correctAnswer: 0,
        wrongAnswer: 0
    });
    
    const{questions} = quiz;
    const{question, answers, correctAnswer} = questions[activeQuestion];

    // Select and cehck answer
    const onAnswerSelected = (answer , idx) =>{
        setChecked(true)
        setSelectedAnswerIndex(idx)
        if(answer == correctAnswer){
            setSelectedAnswer(true)
            console.log('true');
        }
        else{
            setSelectedAnswer(false);
            console.log('false');
        }
    };

    // calculate score and next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) =>
        selectedAnswer ?
        {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1
        } :
        {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1
        }
        );
    if(activeQuestion !== questions.length - 1){
        setActiveQuestion((prev) => prev + 1);
    }
    else{
        setActiveQuestion(0);
        setShowResult(true);
    }
    setChecked(false);
};



    return(
        <div className="container">
            <h1></h1>
            <div>
                <h2 className="">
                    Question: {activeQuestion + 1}
                    <span>/{questions.length}</span>
                </h2>
            </div>
            <div>
                {!showReult ? (
                <div className="quiz-container">
                   <h3>{questions[activeQuestion].question}</h3>
                   {answers.map((answer, idx) =>(
                    <li 
                    key={idx}
                    onClick={() => onAnswerSelected(answer , idx) } 
                    className={selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'}>
                        <span>{answer}</span>
                    </li>
                   ))}
                   {checked ? (
                    <button className="btn" onClick={nextQuestion}>
                        {activeQuestion === question.length ? 'Finish' : 'Next'}
                    </button>
                   ) : (
                    <button disabled className="btn-disabled" onClick={nextQuestion}>
                        {activeQuestion === question.length ? 'Finish' : 'Next'}
                    </button>
                   )}

                </div>
                )
                 :
                  (
                  <div className="quiz-container">
                    <h3>Results</h3>
                    <h3>Overall {(result.score / 25) * 100}%</h3>
                    <p>Total Queations <span>{questions.length}</span></p>
                    <p>Total Score: <span>{result.score}</span></p>
                    <p>Correct Answer: <span>{result.correctAnswer}</span></p>
                    <p>Wrong Answer: <span>{result.wrongAnswer}</span></p>


                </div>
                )}
            </div>
        </div>
    )
}

export default page