
import React, {useEffect, useRef, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import AddQuiz from "./AddQuiz";
import Quizitem from "./QuesItem";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND;

const Quiz = (props) => {
   const {quizId} = useParams();
  let [quizQuestions,setQuizQuestions] = useState([]);
  let navigate = useNavigate();
  const getQuizQuestions = async () => {
    const url = `${BASE_URL}/quizapp/get/quiz/questions/${quizId}`;
    const headers = {
      "auth-token": localStorage.getItem("token")
    };
    await axios
      .get(url, { headers })
      .then(response => {
        setQuizQuestions(response.data);
      })
      .catch(error => {
        alert("Error while getting questions of quiz");
      });
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      getQuizQuestions();
    }
    else{
      navigate("/login")
    }
   
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [quiz, setQuiz] = useState({quesId:"", equestion: "", eoption1: "",eoption2: "",eoption3: "",eoption4: "", eanswer: "", user: ""})

  const updateQuiz = (currentQuiz) => {
    ref.current.click();
    setQuiz({
      quesId:currentQuiz.quesId,
      equestion: currentQuiz.quesDescreption, 
      eoption1: currentQuiz.option1,
      eoption2: currentQuiz.option2,
      eoption3: currentQuiz.option3, 
      eoption4: currentQuiz.option4,
      eanswer: currentQuiz.answer
    })
    
  };
  const handleEditQuestion =async(e)=>{
    const url = `${BASE_URL}/upate/ques/${quiz.id}`
    const data ={};
    data.quesDescreption = quiz.equestion;
    data.op1 = quiz.eoption1;
    data.op2 = quiz.eoption2;
    data.op3 = quiz.eoption3;
    data.op4 = quiz.eoption4;
    data.answer = quiz.eanswer;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    };
    
              try {
                const response = await axios.put(url,data,config);
                if(response.status===200){
                  refClose.current.click();
                  alert("Question updated succesfully");
                }
                
              } catch (error) {
                console.log(error);
              }
  }

  const onChange =(e)=>{
    setQuiz({...quiz, [e.target.name]: e.target.value}) 
}
  
  return (
    <>
      <AddQuiz  quizId ={quizId}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref} //use to give references
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-2" id="exampleModalLabel">
                Edit Quiz
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <div className="container my-3">
        
        <div className="mb-3">
          <label htmlFor="title" className="form-label"> Question </label>
          <input
            type="text"
            className="form-control"
            id="equestion"
            name="equestion"
            value={quiz.equestion} 
            onChange={onChange}
            minLength={2} required
            placeholder="Enter the question"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option1 </label>
          <input
            type="text"
            className="form-control"
            id="eoption1"
            name="eoption1" 
            value={quiz.eoption1}
            onChange={onChange}
            minLength={2} required
            placeholder="Enter the option1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option2 </label>
          <input
            type="text"
            className="form-control"
            id="eoption2"
            name="eoption2" 
            value={quiz.eoption2}
            onChange={onChange}
            minLength={3} required
            placeholder="Enter the option2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option3 </label>
          <input
            type="text"
            className="form-control"
            id="eoption3"
            name="eoption3" 
            value={quiz.eoption3}
            onChange={onChange}
            minLength={3} required
            placeholder="Enter the option3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option4 </label>
          <input
            type="text"
            className="form-control"
            id="eoption4"
            name="eoption4" 
            value={quiz.eoption4}
            onChange={onChange}
            minLength={3} required
            placeholder="Enter the option4"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="answer" className="form-label"> Answer of the above question </label>
          <input
            type="text"
            className="form-control"
            id="eanswer"
            name="eanswer" 
            value={quiz.eanswer}
            onChange={onChange}
            minLength={3} required
            placeholder="Enter the answer"
          />
        </div>
      </div>

            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={quiz.equestion.length<2 || quiz.eoption1.length<2} onClick={handleEditQuestion} type="button" className="btn btn-primary">
               Update Question
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 gy-2">
  <div className="col d-flex justify-content-center">
    <h2>Your Questions</h2>
  </div>
</div>
<div className="container">
  {quizQuestions && Array.isArray(quizQuestions) && quizQuestions.map((question) => {
    return (
      <Quizitem quiz={question} key={question.quesId} updateQuiz={updateQuiz} />
    );
  })}
</div>
    </>
  );
};

export default Quiz;