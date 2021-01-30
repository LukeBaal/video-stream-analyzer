import React from "react";
import { mapToType } from '../context/GlobalState';

const Table = (props) => {
  const data = props.data ?? [];

  const header = Object.keys(data[0] ?? []).map((key) => <th key={`th${key}`}>{key}</th>);

  const body = data.map((entry, index) => (
    <tr key={index}> 
      {Object.keys(entry ?? []).map((key) => <td key={key}>{entry[key]}</td>)}
    </tr>
    )
  );

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            {header && header.length > 0 ? header : null}
          </tr>
        </thead>
        <tbody>{body && body.length > 0 ? body : null}</tbody>
      </table>
    </div>
  );
};

export default Table;
