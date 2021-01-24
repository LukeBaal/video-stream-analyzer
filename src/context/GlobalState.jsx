import React, {createContext, useReducer} from 'react'
import GlobalReducer from './GlobalReducer';


const initialState = {
    files: [],
    worker: new Worker("ffprobe-worker.js")
}


export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);
    const { worker } = state;

    function addFiles(newFiles) {
        worker.onmessage = (e) => {
            dispatch({
                type: "ADD_FILES",
                payload: e.data
            });
        };
    
        let files = [];
        for (let i = 0; i < newFiles.length; i++) {
            files.push(newFiles.item(i));
        }

        files = files.filter(file => state.files.filter(f => f.url === file.name).length === 0);
    
        worker.postMessage(["get_file_info", files]);
    }

    function deleteFile(filename) {
        dispatch({
            type: "DELETE_FILE",
            payload: filename
        })
    }


    return (
        <GlobalContext.Provider
            value={{
                files: state.files,
                addFiles,
                deleteFile
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
