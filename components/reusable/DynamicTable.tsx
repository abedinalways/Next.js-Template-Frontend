"use client";

import Image from "next/image";
import React from "react";
import Loader from "./Loader";
import PaginationPage from "./PaginationPage";

export interface ColumnConfig<T extends Record<string, unknown>> {
  label: React.ReactNode;
  width?: number | string;
  accessor: keyof T;
  formatter?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

export interface DynamicTableProps<T extends Record<string, unknown>> {
  columns: ColumnConfig<T>[];
  data: T[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onView?: (row: T) => void;
  onDelete?: (id: string | number) => void;
  noDataMessage?: string;
  totalpage: number;
  totalItems?: number;
  setItemsPerPage?: (n: number) => void;
  loading?: boolean;
  error?: string;
  border?: boolean;
  renderFooter?: (colSpan: number) => React.ReactNode;
}

export default function DynamicTable<T extends Record<string, unknown>>({
  columns,
  data,
  currentPage,
  itemsPerPage,
  border = true,
  onPageChange,
  loading,
  onView,
  totalpage,
  onDelete,
  noDataMessage = "No data found !.",
  totalItems,
  setItemsPerPage,
  error,
  renderFooter,
}: DynamicTableProps<T>) {
  const actionColSpan = columns.length + (onView || onDelete ? 1 : 0);

  return (
    <div>
      <div className={`rounded-t-md ${border ? "border border-gray-200" : ""}`}>
        <div className={`overflow-auto bg-white ${border ? "p-2" : ""}`}>
          <table
            className={`min-w-[1000px] w-full text-left bg-whiteColor ${border ? "p-2" : ""}`}
          >
            <thead className="sticky top-0 text-white rounded-2xl! overflow-hidden p-2">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{ width: col.width || "auto" }}
                    className={`${
                      index === 0
                        ? "rounded-l-lg"
                        : index === columns.length - 1
                        ? "rounded-r-lg"
                        : ""
                    } px-4! bg-blackColor py-5! text-sm font-medium border-b`}
                  >
                    {col.label}
                  </th>
                ))}
                {(onView || onDelete) && (
                  <th>
                    <div className="px-4 border border-red-600 rounded-2xl py-3 text-sm font-medium text-[#4a4c56] border-b bg-neutral-50">
                      Action
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={actionColSpan}
                    className="px-4 py-10 text-center text-[#4a4c56] text-sm"
                  >
                    <Loader />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        style={{ width: col.width || "auto" }}
                        className="px-4 py-3 text-sm text-[#4a4c56]"
                      >
                        {col.formatter
                          ? col.formatter(row[col.accessor], row, (currentPage - 1) * itemsPerPage + i)
                          : String(row[col.accessor] ?? "")}
                      </td>
                    ))}
                    {(onView || onDelete) && (
                      <td className="px-4 py-3 flex gap-4 items-center">
                        {onView && (
                          <span
                            className="text-xs underline text-[#4a4c56] cursor-pointer"
                            onClick={() => onView(row)}
                          >
                            View details
                          </span>
                        )}
                        {onDelete && (
                          <Image
                            onClick={() => onDelete(row.id as string | number)}
                            src="/dashboard/icon/delete.svg"
                            alt="delete"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={actionColSpan}
                    className="px-4 py-10 text-center text-[#4a4c56] text-sm"
                  >
                    {error ? (
                      <p className="text-red-500 text-xl capitalize font-semibold">
                        {error} please login again
                      </p>
                    ) : (
                      <p className="text-xl text-gray-500 capitalize font-semibold">
                        {noDataMessage}
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
            {renderFooter && (
              <tfoot>
                {renderFooter(actionColSpan)}
              </tfoot>
            )}
          </table>
        </div>
      </div>
      <div>
        <PaginationPage
          totalPages={totalpage}
          dataLength={data.length}
          totalItems={totalItems}
          onPageChange={onPageChange}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
}
