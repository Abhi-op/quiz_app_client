import { useState } from "react";
import React from "react";

const QuizQuestions = ({question}) => {

var [value, setValue] = useState("")
var score=0;
window.val = 0;
var flag=0;

const addScore = () => {
    if(value == question.answer && flag == 0 ){
       score=1 
        window.val = window.val + score;
        flag = 1;
    }
    else if(flag==1 && value != question.answer){
        window.val = window.val - 1;
        flag=0;
    }
    else{
       score=0
    }
    console.log(score, typeof score);
    console.log(window.val);

    sessionStorage.setItem("val", window.val);
}



  return (
    <div>
    <form method="GET">
      <div className="col gx-1">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{question.questionDescreption}</h5>
            <div className="row gx-2">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={question.option1}
                    name={question.questionDescreption}
                    value= {question.option1}
                    onClick={()=> {value=question.option1; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {question.questionDescreption}
                  </label>
                </div>
              </div>
              <div className="col">
              <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={question.option2}
                    name={question.questionDescreption}
                    value= {question.option2}
                    onClick={()=> {value=question.option2; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {question.option2}
                  </label>
                </div>
              </div>
              <div className="col">
              <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={question.option3}
                    name={question.questionDescreption}
                    value= {question.option3}
                    onClick={()=> {value=question.option3; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {question.option3}
                  </label>
                </div>
              </div>
              <div className="col">
              <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={question.option4}
                    name={question.questionDescreption}
                    value= {question.option4}
                    onClick={()=> {value=question.option4; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {question.option4}
                  </label>
                </div>
              </div>
            </div>
            <div className="row my-1">
              <div className="col">Is the question type MCQ : {question.quesType}</div>
            </div>
          </div>
        </div>
      </div>      
      </form>
    </div>
  );
};

export default QuizQuestions;
