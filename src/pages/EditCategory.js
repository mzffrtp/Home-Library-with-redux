import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const {categoriesState} = useSelector((state)=>state);

    const editedCat = categoriesState.categories.find(item=>item.id === categoryId);
    const [form, setForm] = useState(editedCat)
    const handleEdit = (event) =>{
        event.preventDefault();

        if(form.name === ""){alert("Category name must be filled"); return}
        
        const hasCategory = categoriesState.categories.find((item)=> item.name.toLocaleLowerCase() === form.name.toLocaleLowerCase())

        if (hasCategory !== undefined){alert("This category already exits!"); return}

        api
            .put(`${urls.categories}/${categoryId}`, form)
            .then((res)=>{
                dispatch({
                    type:actionTypes.categoryActions.EDIT_CATEGORIES,
                    payload:form
                })
            navigate("/category-actions")
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
            <form onSubmit={handleEdit}>
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
                        disabled = {
                            form.name.toLocaleLowerCase() === editedCat.name.toLocaleLowerCase()
                        }
                            type="submit"
                            className="btn btn-warning my-3 w-25"
                        >Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory