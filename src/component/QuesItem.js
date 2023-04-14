import React from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND;

const Quizitem = (props) => {
const handleDeleteQuestion = async(quesId)=>{
        const url = `${BASE_URL}/delete/question/${quesId}`
        const config = {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        };
      await  axios.delete(url,config)
               .then(response=>{
                   alert("Question Deleted SucessFully")
               })
               .catch(error=>{
                  alert("Error While Deleting Question")
               })

}
  const { quiz, updateQuiz } = props;
  return (
    <div className="col-md-6 gx-1">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{quiz.quesDescreption}</h5>
          <div className="row gx-2">
            <div className="col">
              <ul><li>{quiz.option1}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option2}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option3}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option4}</li></ul>
            </div>
          </div>
          <div className="row my-1">
            <div className="col">Answer is : {quiz.answer}</div>
          </div>
          <div className="row my-1">
            <div className="col">Is the question type MCQ : {quiz.ques_type}</div>
          </div>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{handleDeleteQuestion(quiz.quesId); props.showAlert("deleted successfully","success")}}></i>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateQuiz(quiz)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Quizitem;
