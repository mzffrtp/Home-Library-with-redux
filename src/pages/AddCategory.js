import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const AddCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoriesState } = useSelector(state => state)
    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.name === "") {
            alert("Category name must be filled!")
            return;
        }

        const hasCategory = categoriesState.categories.find(
            (item) => item.name.toLocaleLowerCase() === form.name.toLocaleLowerCase());
        if(hasCategory !== undefined){
            alert("This category already exits")
            return
        }

        api
            .post(urls.categories, form)
            .then((res=>{
                dispatch({
                    type:actionTypes.categoryActions.ADD_CATEGORIES,
                    payload:form
                })
                navigate("/category-actions")
            }))
            .catch()

    }
    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="container d-flex flex-column">
                        <label
                            htmlFor="category" className="form-label">
                            Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            placeholder="type your category..."
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-warning my-3 w-25"
                        >Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory