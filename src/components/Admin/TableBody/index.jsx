import React, { useEffect, useState } from "react";


const AdminTableBody = ({ columns = [], data = [], searchTerm, searchNotFound, noData, children,setTargetIndex,setCurrentIndex ,handleOpenReorderRef}) => {


    return (
        <>
            <div className="customTable">
                <div className="customTableInside">
                    <div className="tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "48px" }}></th>
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
                                            <td style={{ width: "48px", cursor: "pointer" }}
                                                onClick={() => {
                                                    setTargetIndex(rowIndex + 1);
                                                    setCurrentIndex(rowIndex)
                                                    handleOpenReorderRef()

                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M7 19V17H9V19H7ZM11 19V17H13V19H11ZM15 19V17H17V19H15ZM7 15V13H9V15H7ZM11 15V13H13V15H11ZM15 15V13H17V15H15ZM7 11V9H9V11H7ZM11 11V9H13V11H11ZM15 11V9H17V11H15ZM7 7V5H9V7H7ZM11 7V5H13V7H11ZM15 7V5H17V7H15Z" fill="black" />
                                                </svg>
                                            </td>
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
