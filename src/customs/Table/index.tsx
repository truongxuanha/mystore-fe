type Props = {
  columns: string[];
  rows: (number | string)[][];
  operations?: () => JSX.Element;
};

function Table({ columns, rows, operations }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border">
          {columns.map((column) => (
            <th className="border px-2 py-2 bg-colorBody text-start text-[13px]" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr className="border" key={index}>
            {row.map((cell, cellIndex) => (
              <td className="border px-2 py-2  text-sm" key={cellIndex}>
                {cell}
              </td>
            ))}
            {operations && <td>{operations()}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
