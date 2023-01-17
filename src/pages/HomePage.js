import React from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";


const HomePage = () => {

    const {booksState} = useSelector(state=>state);
    console.log(booksState);

    return (
        <div>
            < Header />
            <p>Home Page</p>
        </div>
    )


}

export default HomePage