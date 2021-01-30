import React, {useEffect, useState, createRef} from 'react';

const FileDrop = ({ onDrop, children }) => {
    const [drag, setDrag] = useState(false);
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
        className={ drag ? 'filedrop drag' : 'filedrop' }
        style={{position: "absolute", width: "100%", height: "100%", top: "0", left: "0" }}
        ref={dropRef}
      >
      </div>
    );
  };

  export default FileDrop;