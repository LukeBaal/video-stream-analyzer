import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import FileDrop from './FileDrop'

const DropWrapper = () => {
    const { addFiles } = useContext(GlobalContext);

    // const onBadgeClick = e => {
    //     deleteFile(e.target.innerHTML);
    // }

    return (
        <div>
            <FileDrop onDrop={e => addFiles(e) } />
            {/* {files.map(file => (
                <span key={`badge${file.url}`} className="badge badge-light badge-pill mr-1 file-badge" onClick={e => onBadgeClick(e)}>{file.url}</span>
            ))} */}
        </div>
    )
}

export default DropWrapper
