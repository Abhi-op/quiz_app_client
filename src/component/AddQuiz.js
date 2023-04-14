import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND;
let VRAIABLE = process.env.REACT_APP_VARIABLE_ARRAY;
const AddQuiz = ({quizId}) => {
let navigate = useNavigate(); 
  const [select, setSelect] = useState("yes");
  const [gcode, setGcode] = useState("")

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
          try {
        const url  = `${BASE_URL}/quizApp/add/question/${quizId}`;
        
             const response = await axios.post(url,postData,config)
              if(response.status===200){
                setQuiz({
                           quesDescreption: "",
                           op1: "",
                           op2: "",
                           op3: "",
                           op4: "",
                           answer: "",
                           quesType: select
                        });
                        alert("Question added sucessfully")
              }

        
    } catch (error) {
        alert(error);
    }
  };

 
  var code;


  const test = async () => {
    try {
      // generate code
      const len = 6;
      let ans = "";
      for (let i = len; i > 0; i--) {
        ans += VRAIABLE[Math.floor(Math.random() * VRAIABLE.length)];
      }
      console.log(ans);
      setGcode(ans);
      
      // publish quiz
      const url = `${BASE_URL}/publish/quiz/${quizId}`
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      };
      const response = await axios.put(url, { code: ans }, config);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      alert("error while publishing the quiz");
    }
  }
  
  



  const onChange = (e) => {
    console.log(e.target.value)
    setQuiz({ ...quiz, [e.target.name]: e.target.value }); 
    console.log(quiz)
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add your Quiz</h2> 
        <a onClick={test} className="btn btn-primary " tabIndex="-1" role="button">Publish</a>
        <input type="text" name="code" value={gcode} className="mx-3"/>

        <div className="mb-3 my-2">
  <label htmlFor="title" className="form-label">
    Question
  </label>
  <input
    type="text"
    className="form-control"
    id="question"
    name="quesDescreption"
    onChange={onChange}
    defaultValue={quiz.quesDescreption}
    minLength={5}
    required
    placeholder="Write your question here"
  />
</div>

<div className="row gx-5">
  <div className="col">
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Option 1
      </label>
      <input
        type="text"
        className="form-control"
        id="option1"
        name="op1"
        onChange={onChange}
        defaultValue={quiz.op1}
        minLength={5}
        required
        placeholder="Enter option 1"
      />
    </div>
  </div>
  <div className="col">
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Option 2
      </label>
      <input
        type="text"
        className="form-control"
        id="option2"
        name="op2"
        onChange={onChange}
        defaultValue={quiz.op2}
        minLength={5}
        required
        placeholder="Enter option 2"
      />
    </div>
  </div>
  <div className="col">
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Option 3
      </label>
      <input
        type="text"
        className="form-control"
        id="option3"
        name="op3"
        onChange={onChange}
        defaultValue={quiz.op3}
        minLength={5}
        required
        placeholder="Enter option 3"
      />
    </div>
  </div>
  <div className="col">
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Option 4
      </label>
      <input
        type="text"
        className="form-control"
        id="option4"
        name="op4"
        onChange={onChange}
        defaultValue={quiz.op4}
        minLength={5}
        required
        placeholder="Enter option 4"
      />
    </div>
  </div>
</div>

<div className="row">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">
      Answer of the above question
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

  <div className="row my-2 mx-1">
    Is this question MCQ:
    <select
      name="mcq"
      value={select}
      onChange={(e) => setSelect(e.target.value)}
      style={{ width: "100px", marginLeft: "100px", borderColor: "grey" }}
    >
      <option value="Yes" defaultValue={"yes"}>
        Yes
      </option>
      <option value="No">No</option>
    </select>
  </div>
</div>
<button
  disabled={
    quiz.quesDescreption.length < 5 ||
    quiz.op1.length < 3 ||
    quiz.op2.length < 3 ||
    quiz.op3.length < 3 ||
    quiz.op4.length < 3 ||
    quiz.answer.length < 3
  }
  type="submit"
  className="btn btn-dark"
  onClick={handleAddQuestion}
  style={{
    margin: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
  }}
>
  Add Question
</button>
      </div>
    </div>
  );
};

export default AddQuiz;
