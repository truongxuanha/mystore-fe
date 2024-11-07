type Props = {
  columns: string[];
  rows: any[][];
  operations?: (id: string) => JSX.Element;
};

function Table({ columns, rows, operations }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border">
          {columns.map((column) => (
            <th className="border px-2 py-4 bg-colorBody text-start text-[13px]" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr className="border" key={index}>
            {row.map((cell, cellIndex) => (
              <td className="border px-3 py-4  text-sm" key={cellIndex}>
                {cell}
              </td>
            ))}
            {operations && <td>{operations(row[0] as string)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
