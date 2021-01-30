import React, {createContext, useReducer} from 'react'
import GlobalReducer from './GlobalReducer';


const initialState = {
    files: [],
    diffs: [],
    worker: new Worker("ffprobe-worker.js")
}

// export const STREAM_TYPES = ["VIDEO", "AUDIO", "DATA", "SUBTITLE", "ATTACHMENT", "NB"];
export const STREAM_TYPES = [
    { name: "Video", icon: "film" }, 
    { name: "Audio", icon: "music" },
    { name: "Data", icon: "database" },
    { name: 'Subtitle', icon: 'closed-captioning' },
    { name: 'Attachement', icon: 'paperclip' }, 
    { name: "NB", icon: 'question'}
];

const mapToIcon = type => <i className={`fas fa-${type.icon}`} title={type.name} />;

/**
 * Convert stream type int to name
 * @param {number} type typeInt of stream codec type
 * @return The type name
 */
export const mapToType = type => {
    if (type === null || type === undefined || type === -1 || type >= STREAM_TYPES.length) {
        return "UNKNOWN";
    } else {
        return mapToIcon(STREAM_TYPES[type]);
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
            console.log(e.data);
            const files = e.data.map(file => ({
                ...file,
                streams: file.streams?.map(stream => {
                    const { id, start_time, duration, codec_name, format, bit_rate, time_base, width, height, channels, sample_rate, frame_size } = stream;
                    return { 
                        id,
                        type: mapToType(stream.codec_type),
                        duration,
                        bit_rate,
                        time_base,
                        codec_name,
                        start_time,
                        format,
                        width,
                        height,
                        channels,
                        sample_rate,
                        frame_size
                    }
                })
            }));

            dispatch({
                type: "ADD_FILES",
                payload: files
            });

            // determineDiffs(e.data);
        };
    
        let files = [];
        for (let i = 0; i < newFiles.length; i++) {
            files.push(newFiles.item(i));
        }

        files = files
            .filter(file => state.files
            .filter(f => f.url === file.name).length === 0)

    
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
