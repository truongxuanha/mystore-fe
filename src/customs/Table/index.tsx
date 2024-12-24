type Props = {
  columns: string[];
  rows: any[][];
  operations?: (id: number | string) => JSX.Element;
};

function Table({ columns, rows, operations }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border">
          {columns.map((column) => (
            <th className="border px-2 py-2 bg-colorBody text-start text-xs lg:text-sm bg-slate-100" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr className={`border ${idx % 2 !== 0 && "bg-slate-100"}`} key={idx}>
            {row.map((cell, cellIndex) => (
              <td className="border px-3 py-2 text-xs lg:text-sm" key={cellIndex}>
                {cell}
              </td>
            ))}
            {operations && <td>{operations(row[0] as number)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
