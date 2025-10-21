import React, { useEffect, useState } from "react";


const AdminTableBody = ({ columns = [], data = [], searchTerm, searchNotFound, noData, children}) => {


    return (
        <>
            <div className="customTable">
                <div className="customTableInside">
                    <div className="tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((col, idx) => (
                                        <th
                                            key={idx}
                                            className={col.isAction ? "action-col" : "data-col"}
                                        >
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data?.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                        
                                            {columns.map((col, colIndex) => {
                                                const cellValue = col.render
                                                    ? col.render(row, rowIndex)
                                                    : row[col.accessor] ?? "-";
                                                return (
                                                    <td
                                                        key={colIndex}
                                                        className={
                                                            col.isAction ? "action-col" : "data-col"
                                                        }
                                                    >
                                                        {cellValue}
                                                    </td>
                                                );
                                            })}

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length + 2}
                                            style={{ textAlign: "center" }}
                                        >
                                            {searchTerm
                                                ? searchNotFound
                                                : noData}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {children}

        </>
    );
};

export default AdminTableBody;
