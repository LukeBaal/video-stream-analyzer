import React from "react";

const StackedTable = (props) => {
  const data = props.data ?? {};

  const content = Object.keys(data).map((key, index) => (
    <tr key={`${props.index}${index}`}>
      <td className="bold">{key}</td>
      <td>{data[key]}</td>
    </tr>
  ))

  return (
    <div className="tabel-responsive">
      <table className="table table-dark table-striped">
        <tbody>{content && content.length > 0 ? content : null}</tbody>
      </table>
    </div>
  );
};

export default StackedTable;
