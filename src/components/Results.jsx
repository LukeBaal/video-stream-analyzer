import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Diff from './Diff';
import Overview from './Overview'

const Results = () => {
    const { files } = useContext(GlobalContext);

    return (
        <div className="mt-2">
            {files.map(file => (
                <Overview key={file.url} info={file}/>
            ))}
            {files && files.length > 0 && <Diff />}
        </div>
    )
}

export default Results
