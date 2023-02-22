import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";

import Header from "../components/Header";

import reading from "../assets/imgs/reading.png";
import back from "../assets/imgs/back.png";
import "../assets/styles/bookstyles.css"


const BookDetails = () => {

    const params = useParams();

    const [book, setBook] = useState(null)
    const [bookCat, setBookCat] = useState(null)

    useEffect(() => {
        api
            .get(`${urls.books}/${params.bookId}`)
            .then((resBook) => {
                setBook(resBook.data)
                api
                    .get(`${urls.categories}/${resBook.data.categoryId}`)
                    .then((resCategory) => {
                        setBookCat(resCategory.data)

                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    if (book === null || bookCat == null) return null

    return (
        <div>
            <Header />
            <div className="container my-3 d-flex justify-content-center">
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body d-flex justify-content-center">
                        <h3 className="card-title">{book.name}</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-center">
                            <h5>Author:</h5>{book.author}</li>
                        <li className="list-group-item d-flex justify-content-center">
                            Category: {bookCat.name}</li>
                        <li className="list-group-item d-flex justify-content-center">
                            Publisher: {book.publisher}</li>
                        <li className="list-group-item d-flex justify-content-center">
                            Isbn: {book.isbn}</li>
                    </ul>
                </div>
            </div>
            <div className="toback">
                <div className="toBackImg">
                    <Link to={"/"}
                        style={{ color: "orange", textDecoration: "none" }}
                    > <img src={back} alt=""/></Link>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <img
                    src={reading}
                    style={{ width: "400px" }}
                    alt="" />
            </div>

        </div>
    )
}

export default BookDetails