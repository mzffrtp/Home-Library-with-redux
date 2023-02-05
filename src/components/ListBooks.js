import React from "react";  

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Book from "./Book";
import add from "../assets/imgs/add.png"
import "../assets/styles/listbooks.css"


export const ListBooks = () => {

    const {booksState} = useSelector(state => state)

    return (
        <div>
            <Link to={"/add-book"} className="addBook">
                <img className="addBookImg" src={add}/>
            </Link>
            <Book />
        </div>
    )
}