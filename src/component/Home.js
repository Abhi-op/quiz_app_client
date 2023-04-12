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


const BASE_URL = process.env.REACT_BACKEND_URL;

const Home = (props)=>{
      const [quizList,setQuizList] = useState([]);
      const userId = localStorage.getItem('user_id');

      let navigate = useNavigate();

      const getAllUserQuiz = async()=>{
        if(localStorage.getItem('token')){
            const url = `${BASE_URL}/quizApp/getQuiz/${userId}`
                try {
                  const response = await axios.get(url,{withCredentials:true})
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
            e.preventDefault();
            const url =`${BASE_URL}/quizApp/create/quiz/${userId}`
            try {
                await axios.post(url)
                .then(response=>{
                    console.log(response.data);
                    navigate(`/createQuiz/${response.data}`)
                })
                .catch(error=>{
                    console.log(error);
                })
                
            } catch (error) {
                console.log(error);
                
            }
   

      }
  const  handleDelteQuiz = (e,quizId)=>{
             const url = `${BASE_URL}/delete/quiz/${quizId}`
             axios.delete(url)
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
              <IconButton edge = "end" onClick={handleAddQuiz}><AddIcon color="primary" fontsize="latge"  /></IconButton>
              
            </ListItem>
            {quizList.map((quiz)=>{
             return (<ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={(e)=>handleDelteQuiz(e,quiz.quizId)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                <ListItemText primary={quiz.descreption} />
              </ListItem>)
            })}
          </List>
        </Grid>
      </Box>
      )


}

export default Home;