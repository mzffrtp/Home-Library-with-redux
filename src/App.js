import React, {useEffect} from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useDispatch } from "react-redux";
import actionsTypes from "./redux/actions/actionTypes"

import HomePage from "./pages/HomePage";

import api from "./api/api"
import urls from "./api/urls"

function App() {
  const dispatch = useDispatch()

  useEffect(()=> {
    /* fetch books */
    dispatch({type:actionsTypes.bookActions.GET_BOOKS_START})
    api.get(urls.books)

    .then((res) => {
      dispatch({type:actionsTypes.bookActions.GET_BOOKS_SUCCESS, payload:res.data})
    })

    .catch((err)=>{
      dispatch({type:actionsTypes.bookActions.GET_BOOKS_FAIL, payload:"An error occured at the server"})
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
