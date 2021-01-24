import React, { useState , useEffect} from 'react'

const FileInput = () => {
    const [worker, setWorker] = useState(null);
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);

    useEffect(() => {
        setWorker(new Worker('ffprobe-worker.js'));
    }, []);


    const onChangeFile = e => {
        setFile(e.target.files[0]);
        worker.onmessage = e => {
            console.log(e.data);
            setResults(e.data);
        }
        worker.postMessage([ 'get_file_info', file ]);
    }

    return (
        <div style={{ marginTop: '2em' }}>
            <input type="file" name="videoFile" id="videoFile" onChange={(e) => onChangeFile(e)}/>

            <div style={{ marginTop: '5em'}}>
                {results != null ? (
                    <code>
                        {results}
                    </code>
                ) : <p>Upload a file to analyze</p>}
            </div>
        </div>
    )
}

export default FileInput
