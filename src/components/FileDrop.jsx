import React, {useEffect, useState, createRef, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

const FileDrop = ({ onDrop, children }) => {
    const [drag, setDrag] = useState(false);
    const { files } = useContext(GlobalContext);
    // const [filename, setFilename] = useState('');
    let dropRef = createRef();
    let dragCounter = 0;
  
    const handleDrag = e => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDragIn = e => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setDrag(true);
    };
  
    const handleDragOut = e => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter === 0) setDrag(false);
    };
  
    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();
      setDrag(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onDrop(e.dataTransfer.files);
        // setFilename(e.dataTransfer.files[0].name);
        e.dataTransfer.clearData();
        dragCounter = 0;
      }
    };
  
    useEffect(() => {
      let div = dropRef.current;
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
      return () => {
        div.removeEventListener('dragenter', handleDragIn);
        div.removeEventListener('dragleave', handleDragOut);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      };
    });

    let classNames = 'filedrop center-text-container';
    if (drag) {
      classNames += ' drag';
    }
    if (files.length === 0) {
      classNames += ' border';
    }
  
    return (
      // <div
      //   ref={dropRef}
      //   className={
      //     drag ? 'filedrop drag' : filename ? 'filedrop ready' : 'filedrop'
      //   }
      // >
      //   {filename && !drag ? <div>{filename}</div> : <div>Drop a file here!</div>}
      // </div>
      <div 
        className={classNames}
        style={{
          position: "relative", 
          width: "100%", 
          height: "100%", 
          top: "0", 
          left: "0",

        }}
        ref={dropRef}
      >
        {files.length === 0 ? <h1>Drop Files Here</h1> : null}
      </div>
    );
  };

  export default FileDrop;