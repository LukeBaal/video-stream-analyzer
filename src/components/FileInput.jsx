import React, { useState, useEffect, useRef } from "react";
import Overview from "./Overview";

const FileInput = () => {
  const [worker, setWorker] = useState(null);
  const [results, setResults] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setWorker(new Worker("ffprobe-worker.js"));
  }, []);

  const onChangeFile = (e) => {
    worker.onmessage = (e) => {
      setResults(e.data);
    };

    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }

    worker.postMessage(["get_file_info", files]);
  };

  const onClearFiles = e => {
    setResults ([]);
    fileInputRef.current.value = '';
  }

  return (
    <div style={{ marginTop: "2em" }}>
      <div className="card">
        <div className="card-header">Video Stream Analyzer</div>
        <div className="card-body">
          <div className="input-group">
            <input
              ref={fileInputRef}
              class="form-control form-control-lg"
              name="videoFile"
              id="videoFile"
              type="file"
              onChange={e => onChangeFile(e)}
              multiple
              disalbed={worker === null ? "disabled" : undefined}
            />
            <button className="btn btn-danger" onClick={e => onClearFiles(e)}>X</button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {results &&
          results.map((result) => <Overview key={result.url} info={result} />)}
        {results != null ? (
          <code style={{ display: "block", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(results, null, 2)}
          </code>
        ) : (
          <p>Upload a file to analyze</p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
