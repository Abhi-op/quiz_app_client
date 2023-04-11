import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/login";
import Signup from "./component/signup";
import Navbar from "./component/Navbar";
import PlayQuiz from "./component/PlayQuiz";
import Quiz from "./component/Quiz";
function App() {
  return (
    <div className="App">
      <Routes>
        <Navbar />
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path = '/playQuiz' element = {<PlayQuiz/>} />
      <Route path = '/createQuiz/:quizId' element = {<Quiz/>}/>
      </Routes>
    </div>
  );
}

export default App;
