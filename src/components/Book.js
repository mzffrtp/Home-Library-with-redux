import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import CustomModal from "./CustomModal";

const Book = () => {

    const { booksState, categoriesState } = useSelector((state) => state)
    console.log(booksState);
    const dispatch = useDispatch();
    const [showModel, setShowModel] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState("");


    const deleteBook = (id) => {

        dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
        api
            .delete(`${urls.books}/${id}`)
            .then((res) => {
                dispatch({
                    type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
                    payload: id
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.bookActions.DELETE_BOOK_FAIL,
                    payload: "An error occured when deleting"
                });
            });
    };

    return (
        <div className="container my-3 d-flex flex-column">
            <div
                className="container my-3 d-flex justify-content-center">
                <input
                    className="w-75"
                    style={{ border: "none", background: "beige", height: "2.5rem" }}
                    type={"text"}
                    placeholder="please type for search..."
                />
            </div>

            <table className="table table-light table-striped table-hover table-sm caption-top table-bordered border-info">
                <caption>List of books</caption>
                <thead className="table-warning text-center ">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {booksState.books.map((book, index) => {
                        return (
                            <tr className="align-middle" key={book.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>
                                    <div className="d-grid gap-1 d-md-flex justify-content-center">
                                        <button
                                            className=" btn btn-outline-danger btn-sm mx-1"
                                            style={{ fontSize: "0.7rem" }}
                                            onClick={() => {
                                                setShowModel(true)
                                                setDeleteConfirm(book.id)
                                            }}
                                            type="button">Delete</button>

                                        <Link to={`/edit-book/${book.id}`}
                                            className="btn btn-outline-success btn-sm mx-1"
                                            type="button"
                                            style={{ fontSize: "0.7rem" }} >Update</Link>

                                        <Link to={`/book-details/${book.id}`}
                                            className="btn btn-outline-primary btn-sm mx-1"
                                            type="button"
                                            style={{ fontSize: "0.7rem" }} >Details</Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {
                showModel === true && (
                    <CustomModal
                        title="Delete"
                        message="Are you sure?"
                        onCancel={() => setShowModel(false)}
                        onConfirm={() => {
                            deleteBook(deleteConfirm)
                            setShowModel(false)
                        }}
                    />
                )
            }
            {
                categoriesState.categories.length === 0 && (
                    <div
                        className="container d-flex flex-column mt-5 gap-3 align-items-center"
                        style={{ color: "orangered", fontSize: "1.5rem" }}
                        to={"/add-category"}>
                            <span
                                style={{ color: "black"}}
                                >&#128549; No books are recorded for now. </span>
                        A category must be added before adding a book becomes possible!
                        <Link
                            to={"/add-category"}
                            className="btn btn-info mt-3"
                        > Click to add a category!
                        </Link>
                    </div>

                )
            }
        </div>


    )
}

export default Book