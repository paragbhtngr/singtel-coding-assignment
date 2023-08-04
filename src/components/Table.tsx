import React, { useState, useEffect } from "react";
import "../assets/styles/globals.css";
import ArrowUpIcon from "../assets/images/arrow-up.svg";
import ArrowDownIcon from "../assets/images/arrow-down.svg";
import ArrowBothIcon from "../assets/images/arrow-both.svg";
import Radio from "./Radio";
import Checkbox from "./Checkbox";

export enum SelectionType {
  Radio = "Radio",
  Checkbox = "Checkbox",
}

export enum SortOrder {
  Ascending = "Ascending",
  Descending = "Descending",
  Unsorted = "Unsorted",
}

interface Header {
  name: string;
  title: string;
  sortable?: boolean;
}

interface ITableProps {
  name?: string;
  sortable?: boolean;
  selectable?: boolean;
  showHeader?: boolean;
  selectionType?: SelectionType;
  headers: Header[];
  data: Record<string, string>[];
}

interface IHeaderRowProps {
  headers: Header[];
  selectable?: boolean;
  sortColumn?: string;
  sortOrder?: SortOrder;
  handleSortColumn?: (column: string) => void;
  handleSortOrder?: (order: SortOrder) => void;
}

interface IRowProps {
  headerNames: string[];
  data: Record<string, string>;
  selectable?: boolean;
  selectionType?: SelectionType;
  isSelected?: boolean;
  handleSelectRow?: () => void;
}

const Table = (props: ITableProps) => {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Unsorted);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    if (!props.sortable || sortOrder === SortOrder.Unsorted || !sortColumn) {
      setData(data);
    } else {
      const newData = props.data.sort((a, b): number => {
        if (a[sortColumn] === undefined) return -1;
        if (b[sortColumn] === undefined) return 1;
        else if (sortOrder === SortOrder.Ascending) {
          return a[sortColumn] <= b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] <= b[sortColumn] ? -1 : 1;
        }
      });
      setData(newData);
      setSelectedRows([]);
    }
  }, [props.data, sortColumn, sortOrder]);

  const handleSetSortColumn = async (name: string) => {
    await setSortColumn(name);
    setSortOrder(SortOrder.Descending);
  };

  const handleSetSortOrder = (order: SortOrder) => {
    setSortOrder(order);
  };

  const handleSelectRow = async (key: string) => {
    if (props.selectionType === SelectionType.Radio) {
      await setSelectedRows([key]);
    } else {
      const selectedRowsIndex = selectedRows.indexOf(key);
      if (selectedRowsIndex === -1) {
        const newSelectedRows = selectedRows.concat(key);
        await setSelectedRows(newSelectedRows);
      } else {
        const newSelectedRows = selectedRows
          .slice(0, selectedRowsIndex)
          .concat(selectedRows.slice(selectedRowsIndex + 1));
        await setSelectedRows(newSelectedRows);
      }
    }
  };

  const sortProps = {
    ...(props.sortable && {
      sortColumn: sortColumn,
      sortOrder: sortOrder,
      handleSortColumn: handleSetSortColumn,
      handleSortOrder: handleSetSortOrder,
    }),
  };

  return (
    <table className="table">
      {props.showHeader || props.headers.length > 0 ? (
        <>
          <HeaderRow
            headers={props.headers}
            selectable={props.selectable}
            {...sortProps}
          />
          <tbody>
            {props.data.map((rowData, index) => (
              <Row
                key={Object.values(rowData)[0] + index}
                data={rowData}
                headerNames={props.headers.map((h: Header) => h.name)}
                selectable={props.selectable}
                selectionType={props.selectionType}
                isSelected={selectedRows.includes(
                  Object.values(rowData)[0] + index
                )}
                handleSelectRow={() =>
                  handleSelectRow(Object.values(rowData)[0] + index)
                }
              />
            ))}
          </tbody>
        </>
      ) : null}
    </table>
  );
};

const HeaderRow = (props: IHeaderRowProps) => {
  return (
    <thead>
      <tr>
        {props.selectable ? <th></th> : null}
        {props.headers.map((headerData) => (
          <th key={headerData.name}>
            <span>{headerData.title}</span>
            {headerData.sortable ? (
              <span>
                {props.sortColumn === headerData.name ? (
                  props.sortOrder === SortOrder.Ascending ? (
                    <button
                      className="sort-button"
                      onClick={() =>
                        props.handleSortOrder?.(SortOrder.Descending)
                      }
                    >
                      <img src={ArrowUpIcon} />
                    </button>
                  ) : (
                    <button
                      className="sort-button"
                      onClick={() =>
                        props.handleSortOrder?.(SortOrder.Ascending)
                      }
                    >
                      <img src={ArrowDownIcon} />
                    </button>
                  )
                ) : (
                  <button
                    className="sort-button"
                    onClick={() => props.handleSortColumn?.(headerData.name)}
                  >
                    <img src={ArrowBothIcon} />
                  </button>
                )}
              </span>
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Row = ({
  headerNames,
  selectable,
  isSelected,
  selectionType,
  data,
  handleSelectRow,
}: IRowProps) => {
  return (
    <tr className={isSelected ? "selected" : ""}>
      {selectable ? (
        selectionType === SelectionType.Radio ? (
          <td className="row-select">
            <Radio isSelected={isSelected} handleClick={handleSelectRow} />
          </td>
        ) : (
          <td className="row-select">
            <Checkbox isSelected={isSelected} handleClick={handleSelectRow} />
          </td>
        )
      ) : null}
      {headerNames.map((h, index) => (
        <td key={index}>{data[h] ? data[h] : "N/A"}</td>
      ))}
    </tr>
  );
};

export default Table;
