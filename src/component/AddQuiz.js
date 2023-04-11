import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_BACKEND_URL;
let VRAIABLE = process.env.REACT_VARIABLE_ARRAY;
const AddQuiz = ({quizId}) => {
let navigate = useNavigate(); 
  const [select, setSelect] = useState("yes");

  const [quiz, setQuiz] = useState({
    quesDescreption: "",
                op1: "",
                op2: "",
                op3: "",
                op4: "",
                answer: "",
                quesType: select
  });
  const handleAddQuestion = async(e) => {
    e.preventDefault(); //page doesn't get reload
    quiz.quizId = quizId;
    const postData = quiz;
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      };
      

   alert("Added Successfully", "success");
    try {
        const url  = `${BASE_URL}/add/question/${quizId}`;
        axios.post(url,postData,config)
          .then(response=>{
            setQuiz({
                quesDescreption: "",
                op1: "",
                op2: "",
                op3: "",
                op4: "",
                answer: "",
                quesType: select
              });
          })
          .catch(
            error=>{
                alert(error);
            }
          )

        
    } catch (error) {
        console.log("error while adding qusestion")
    }
  };

 
  var code;
  const [gcode, setGcode] = useState("")


const test = () =>{
  // generate code
  const publish = ()=>{
    var len = 6;
    var ans= "";
    for (var i = len; i > 0; i--) {
			ans+=
			VRAIABLE[Math.floor(Math.random() * VRAIABLE.length)];
		}
    console.log(ans);
    
    code = ans;
    setGcode(code);
  }
  publish();
 
   const url = `${BASE_URL}/publish/quiz/${quizId}`
   const config = {
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    }
  };
   axios.put(url,gcode,config)
      .then(
        response=>{
            navigate("/");
        }
      )
      .catch(
        error=>{
            alert("error while publishing the quiz");
        }
      )
}
  



  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value }); //whatever value inside the quiz object will exist as it is but jo properties aage likhi ja rhi hai inko add ya overwrite kar dena
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add your Quiz</h2> 
        <a onClick={test} className="btn btn-primary " tabIndex="-1" role="button">Publish</a>
        <input type="text" name="code" value={gcode} className="mx-3"/>

        <div className="mb-3 my-2">
          <label htmlFor="title" className="form-label">
            {" "}
            Question{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="question"
            name="question"
            onChange={onChange}
            value={quiz.quesDescreption}
            minLength={5}
            required
            placeholder="write your Question here"
          />
        </div>

        <div className="row gx-5">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                Option 1{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="option1"
                name="option1"
                onChange={onChange}
                value={quiz.op1}
                minLength={5}
                required
                placeholder="Enter the option1"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                Option 2{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="option2"
                name="option2"
                onChange={onChange}
                value={quiz.op2}
                minLength={5}
                required
                placeholder="Enter the option2"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                Option 3{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="option3"
                name="option3"
                onChange={onChange}
                value={quiz.op3}
                minLength={5}
                required
                placeholder="Enter the option3"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                Option 4{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="option4"
                name="option4"
                onChange={onChange}
                value={quiz.op4}
                minLength={5}
                required
                placeholder="Enter the option4"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {" "}
              Answer of the above question{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="answer"
              name="answer"
              onChange={onChange}
              value={quiz.answer}
              minLength={5}
              required
              placeholder="Enter the answer"
            />
          </div>

          <div className="row my-2 mx-1">Is this question MCQ:
          <select name="mcq" value={select} onChange={e=>setSelect(e.target.value)} style={{width:"100px", marginLeft: "100px", borderColor: "grey"}}>
            <option value="Yes" defaultValue={"yes"}>yes</option>
            <option value="No">no</option>
          </select>
        </div>

        </div>


        

        <button
          disabled={
            quiz.question.length < 5 ||
            quiz.option1.length < 3 ||
            quiz.option2.length < 3 ||
            quiz.option3.length < 3 ||
            quiz.option4.length < 3 ||
            quiz.answer.length < 3
          }
          type="submit"
          className="btn btn-dark"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuiz;
