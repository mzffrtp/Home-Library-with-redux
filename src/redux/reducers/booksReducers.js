import actionTypes from "../actions/actionTypes";

const initialState = {
    pending:false,
    succes: false,
    books : [],
    fail: false,
    error: ""
}

const booksreducer = (state=initialState,action) => {

    switch (action.type) {
        case actionTypes.bookActions.GET_BOOKS_START:
            return {
                ...state,
                pending:true
            }

        case actionTypes.bookActions.GET_BOOKS_SUCCESS:
            return {
                ...state,
                pending:false,
                succes: true,
                fail:false,
                books: action.payload,
            }

        case actionTypes.bookActions.GET_BOOKS_FAIL:
            return {
                ...state,
                pending:false,
                succes:false,
                fail: true,
                error: action.payload
            }

        default:
            return state
    }
}

export default booksreducer