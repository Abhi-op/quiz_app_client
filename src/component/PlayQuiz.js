import React, { useState } from 'react';
import QuizQuestions from './QuizQuestions';
import axios from "axios";
const BASE_URL = process.env.REACT_BACKEND_URL;

const PlayQuiz = () => {

  const [message, setMessage] = useState('');
  const [seq, setSeq] = useState("")  
  const [quizs, setQuizs] = useState([])

  var [val, setVal] = useState('')

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

   const getQuizQuestions = async()=>{
          const url = `${BASE_URL}/getPublishedQuiz/${message}`
          try {
            const response = await axios.get(url,{withCredentials:true})
            if(response.status===200){
              setQuizs(response.data);
              setSeq('1')
             const disableBtn=()=> {
           document.getElementById('btn2').disabled = true;
           }
    disableBtn();    
            }
            
          } catch (error) {
              alert("Error while getting questions")
          }
         
   }

  const myFunction = () =>{
    console.log(sessionStorage.getItem("val"))
    setVal(sessionStorage.getItem("val"))
    const disableBtn=()=> {
      document.getElementById('btn').disabled = true;
    }
    disableBtn();
  }


  return (
    <div>
      <div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2>Message: {message}</h2>

      {/* <h2>Updated: {updated}</h2> */}

      <button className='btn btn-primary' id="btn2" onClick={getQuizQuestions}>Play</button>
    </div>

    {quizs.map((question) => {
          return (
            <QuizQuestions question={question} key={question.quesId} />
            
          );
    })}
  
    <button className={seq=='1' ? 'btn btn-primary mx-2' : 'd-none mx-2' } id="btn" onClick={myFunction}>  GENERATE SCORE </button>
    
    <div className={seq=='1' ? 'd-flex' : 'd-none' }> Your Score is : {val} </div>
  
    {/* <button >GENERATE SCORE</button>  */}
    <div>
    <a href="http://localhost:8000/playquiz" class="btn btn-danger my-2" tabIndex="-1" role="button">RESET</a>
    </div>
    </div>
  )
}

export default PlayQuiz;
