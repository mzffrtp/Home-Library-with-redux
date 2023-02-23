import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import add from "../assets/imgs/add1.png";
import CustomModal from "../components/CustomModal";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const CategoryActions = () => {
    const { booksState, categoriesState } = useSelector(state => state);
    const [showModal, setShowModal] = useState(false);
    const [willDelete, setWillDelete] = useState("");
    const dispatch = useDispatch()

    const handleDelete = (id) =>{
        const books =booksState.books.filter(item=>item.categoryId === id)
        api
            .delete(`${urls.categories}/${id}`)
            .then((resCat)=>{
                dispatch({
                    type:actionTypes.categoryActions.DELETE_CATEGORIES,
                    payload:id,
                })
                books.map(item=>{
                    api
                        .delete(`${urls.books}/${item.id}`)
                        .then((resBook)=>{
                            dispatch(
                                {type:actionTypes.bookActions.DELETE_BOOK_AFTER_CATEGORY_DELETE,
                                payload:item.id}
                            )
                        })
                        .catch((err)=>{})
                })
            })  
            .catch((err)=>{console.log(err);}) 
            setShowModal(false)     
    }

    return (
        <div>
            <Header />
            <div className="container mt-3">
                <div className="d-flex justify-content-end">
                    <Link className="btn"
                        to={"/add-category"}>
                        <img
                            className="my-1"
                            style={{ width: "30px" }}
                            src={add} />
                        <p
                            style={{ color: "orangered", fontSize: "1.5rem" }}>Add Category</p>
                    </Link>
                </div>
                <table className="table table-warning table-striped table-hover table-sm caption-top table-bordered border-info">
                    <caption>List of categories</caption>
                    <thead className="table-info text-center ">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Book number recorded</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            categoriesState.categories.lenght === 0 ? (
                                <tr>
                                    <td colSpan={4}>
                                        No categories recorded yet!
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {categoriesState.categories.map((category, index) => {
                                        const books = booksState.books.filter(item => item.categoryId === category.id)
                                        return (
                                            <tr className="align-middle text-center" key={category.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{category.name}</td>
                                                <td>
                                                    {books.length}
                                                </td>
                                                <td>
                                                    <div className="d-grid gap-1 d-md-flex justify-content-center">
                                                        <button
                                                            className=" btn btn-outline-danger btn-sm mx-1"
                                                            style={{ fontSize: "0.7rem" }}
                                                            onClick={() => {
                                                                setShowModal(true)
                                                                setWillDelete(category.id)
                                                            }}
                                                            type="button">Delete</button>

                                                        <Link to={`/edit-category/${category.id}`}
                                                            className="btn btn-outline-success btn-sm mx-1"
                                                            type="button"
                                                            style={{ fontSize: "0.7rem" }} >Update</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                showModal === true && (<CustomModal
                    className="modal"
                    title="Delete Category"
                    message="Category deleting results as all the books in the related category would be deleted. Do you want to proceed?"
                    onCancel={() => setShowModal(false)}
                    onConfirm={()=> handleDelete(willDelete)}
                />)
            }
        </div>
    )
}

export default CategoryActions