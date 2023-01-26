import React from "react";  

import { useSelector } from "react-redux";


import Header from "./Header";
import Book from "./Book";


export const ListBooks = () => {

    const {booksState} = useSelector(state => state)

    return (
        <div>
            <Book />
        </div>
    )
}