import React, {createContext, useReducer} from 'react'
import GlobalReducer from './GlobalReducer';


const initialState = {
    files: [],
    diffs: [],
    worker: new Worker("ffprobe-worker.js")
}

export const STREAM_TYPES = ["VIDEO", "AUDIO", "DATA", "SUBTITLE", "ATTACHMENT", "NB"];

/**
 * Convert stream type int to name
 * @param {number} type typeInt of stream codec type
 * @return The type name
 */
export const mapToType = type => {
    if (type === null || type === undefined || type === -1 || type >= STREAM_TYPES.length) {
        return "UNKNOWN";
    } else {
        return STREAM_TYPES[type];
    }
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);
    const { worker } = state;

    function determineDiffs(newFiles) {
        const files = [...state.files, ...newFiles];
        const diffs = [];
        console.log("GET DIFFS", files);

        if (files.length > 0) {
            Object.keys(files[0]).forEach(key => {
                switch(key) {
                    case 'start_time':
                    case 'duration':
                    case 'codec_name':
                    case 'format':
                    case 'bit_rate':
                    case 'channels':
                    case 'sample_rate':
                    case 'frame_size':
                        let prev = null;
                        for (const file of files) {
                            if (prev == null && file[key]) {
                                prev = file;
                            } else if (prev[key] !== file[key]){
                                diffs.push(key);
                                break;
                            }
                        }
                        break;
                    default:
                        break;
                }
            });
            
            console.log(diffs);
            dispatch({
                type: 'SET_DIFFS',
                payload: diffs
            });
        }
    }

    function addFiles(newFiles) {
        worker.onmessage = e => {
            dispatch({
                type: "ADD_FILES",
                payload: e.data
            });

            // determineDiffs(e.data);
        };
    
        let files = [];
        for (let i = 0; i < newFiles.length; i++) {
            files.push(newFiles.item(i));
        }

        files = files
            .filter(file => state.files
            .filter(f => f.url === file.name).length === 0);
            // .map(f => f ({
            //     ...f,
            //     streams: f.streams.map(stream => ({ 
            //         ...stream, 
            //         type: mapToType.length > stream.codec_type ? mapToType(stream.codec_type) : "UNKNOWN" 
            //     }))
            // }));

    
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
                diffs: state.diffs,
                addFiles,
                deleteFile
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
