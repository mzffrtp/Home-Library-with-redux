import actionTypes from "../actions/actionTypes"

const initialState = {
    pending:false,
    succes: false,
    categories : [],
    fail: false,
    error: ""
}

const categoriesReducer = (state=initialState,action) => {

    switch (action.type) {
        case actionTypes.categoryActions.GET_CATEGORIES_START:
            return {
                ...state,
                pending:true
            }

        case actionTypes.categoryActions.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                pending:false,
                succes: true,
                categories: action.payload,
            }

        case actionTypes.categoryActions.GET_CATEGORIES_FAIL:
            return {
                ...state,
                pending:false,
                succes:false,
                fail: true,
                error: action.payload
            }
        
        case actionTypes.categoryActions.ADD_CATEGORIES:
            return{
                ...state,
                categories: [...state.categories, action.payload]
            }
        
            case actionTypes.categoryActions.DELETE_CATEGORIES:
                var filteredCategory = state.categories.filter(item=>item.id !== action.payload)
                return{
                    ...state,
                    categories:filteredCategory,
                }
        default:
            return state
    }
}

export default categoriesReducer