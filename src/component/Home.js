import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import ListItem from '@mui/material/ListItem';


const BASE_URL = process.env.REACT_APP_BACKEND;

const Home = (props)=>{
      const [quizList,setQuizList] = useState([]);
      const userId = localStorage.getItem('user_id');

      let navigate = useNavigate();

      const getAllUserQuiz = async()=>{
        if(localStorage.getItem('token')){
            const url = `${BASE_URL}/quizApp/getQuiz/${userId}`
                try {
                  const response = await axios.get(url,{withCredentials:false})
                    if(response.status===200){
                        setQuizList(response.data);
                    }
                  
                } catch (error) {
                  alert("Error while fetching User Quiz");
                  
                }
        }
        else{
          navigate("/login")
        }
      }
      const handleAddQuiz = async(e)=>{
        
        const url = `${BASE_URL}/quizApp/create/quiz/${userId}`;
        const headers = {
          "auth-token": localStorage.getItem('token')
        };
        
        console.log(localStorage.getItem('token'));
        
        try {
          const response = await axios.post(url, null, { headers: headers }, { withCredentials: false });
          if(response.status===200){
          console.log(response);
          navigate(`/createQuiz/${response.data.data}`);
          }
        } catch (error) {
          console.log(error);
        }

      }
  const  handleDelteQuiz = async(e,quizId)=>{
             const url = `${BASE_URL}/delete/quiz/${quizId}`
             const headers={
              "auth-token": localStorage.getItem('token')
            };
          await axios.delete(url,null,{headers})
                .then(response=>{
                    alert("Quiz Deleted successfully");
                })
                .catch(
                    error=>{
                        alert(error);
                    }
                )
      }

      useEffect(() => {
        getAllUserQuiz();
        // eslint-disable-next-line
      }, []);
    

      return (
        <Box display="flex" justifyContent="center">
  <Grid item xs={12} md={6}>
    <List>
      <ListItem>
        <ListItemText primary="Add new Quiz" />
        <IconButton edge="end" onClick={handleAddQuiz}><AddIcon color="primary" fontsize="large" /></IconButton>
      </ListItem>
      {quizList && Array.isArray(quizList) && quizList.map((quiz) => {
        return (
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={(e) => handleDelteQuiz(e, quiz.quizId)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={quiz.descreption} />
          </ListItem>
        )
      })}
    </List>
  </Grid>
</Box>

      )


}

export default Home;