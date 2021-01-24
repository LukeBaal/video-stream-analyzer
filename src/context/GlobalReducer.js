
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FILES':
            return {
                ...state,
                files: [...state.files, ...action.payload]
            }
        case 'DELETE_FILE':
            return {
                ...state,
                files: state.files.filter(file => file.url !== action.payload)
            }
        default:
            return state;
    }
};

export default reducer;