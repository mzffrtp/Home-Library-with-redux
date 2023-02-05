import React, {useEffect} from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import actionsTypes from "./redux/actions/actionTypes"

import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import AddBook  from "./pages/AddBook";

import api from "./api/api"
import urls from "./api/urls"

function App() {
  const dispatch = useDispatch()
  const {booksState, categoriesState} = useSelector(state=> state)

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

    /* fetch categories*/
    dispatch({type:actionsTypes.categoryActions.GET_CATEGORIES_START})
    api
      .get(urls.categories)
      .then((res)=> {
        dispatch({type:actionsTypes.categoryActions.GET_CATEGORIES_SUCCESS,payload:res.data})

      })
      .catch((err)=> {
        dispatch({type:actionsTypes.categoryActions.GET_CATEGORIES_FAIL, payload:"An error occured at the server"})
      })

  }, [])

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/book-details/:bookId" element = {<BookDetails />} />
        <Route path="/add-book" element = {<AddBook />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
