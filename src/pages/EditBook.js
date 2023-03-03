import React, {useState}from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";


const EditBook = () => {
    const params = useParams();
    const { booksState, categoriesState } = useSelector(state => state);
    const bookEdited = booksState.books.find(item => item.id === params.bookId);
    const [form, setForm] = useState(bookEdited);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (event) =>{
        event.preventDefault();

        if (form.name === "" || form.author === "" || form.categoryId === "") {
            alert("Book name, author and category must be filled!");
            return;
        }

        api
            .put(`${urls.books}/${params.bookId}`, form)
            .then((res)=>{
                dispatch({type:actionTypes.bookActions.EDIT_BOOK, payload:form});
                navigate("/")
                window.location.reload()
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div>
            <Header />
            <div className="container my-3">
                <form onSubmit={handleEdit}
                >
                    <div className="my-1">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input type="text" className="form-control" id="author"
                            value={form.author}
                            onChange={(event) => setForm({ ...form, author: event.target.value })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="publisher" className="form-label">Publisher</label>
                        <input type="text" className="form-control" id="publisher"
                            value={form.publisher}
                            onChange={(event) => setForm({ ...form, publisher: event.target.value })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="isbn" className="form-label">Isbn</label>
                        <input type="text" className="form-control" id="isbn"
                            value={form.isbn}
                            onChange={(event) => setForm({ ...form, isbn: event.target.value })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="categoryId" className="form-label">Category</label>
                        <select className="form-select"
                            value={form.categoryId}
                            onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
                        >
                            <option value={"empty"}></option>
                            {
                                categoriesState.categories.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-success btn-lg">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBook