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
  alignment?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | undefined;
}

interface ITableProps {
  name?: string;
  selectable?: boolean;
  hideHeader?: boolean;
  useListLayout?: boolean;
  selectionType?: SelectionType;
  headers: Header[];
  data: Record<string, string>[];
  headerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  selectedRowStyle?: React.CSSProperties;
  selectorColor?: string;
}

interface IHeaderRowProps {
  name?: string;
  headers: Header[];
  selectable?: boolean;
  sortColumn?: string;
  sortOrder?: SortOrder;
  useListLayout?: boolean;
  handleSortColumn?: (column: string) => void;
  handleSortOrder?: (order: SortOrder) => void;
  headerStyle?: React.CSSProperties;
}

interface IRowProps {
  headers: Header[];
  data: Record<string, string>;
  selectable?: boolean;
  selectionType?: SelectionType;
  isSelected?: boolean;
  useListLayout?: boolean;
  handleSelectRow?: () => void;
  style?: React.CSSProperties;
  selectedStyle?: React.CSSProperties;
  selectorColor?: string;
}

const Table = (props: ITableProps) => {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Unsorted);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    if (sortOrder === SortOrder.Unsorted || !sortColumn) {
      setData(data);
    } else {
      const newData = props.data.sort((a, b): number => {
        if (a[sortColumn] === undefined) {
          return -1;
        }
        if (b[sortColumn] === undefined) {
          return 1;
        } else if (sortOrder === SortOrder.Ascending) {
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

  return (
    <table className="table">
      {!props.hideHeader ? (
        <>
          <HeaderRow
            name={props.name}
            useListLayout={props.useListLayout}
            headers={props.headers}
            selectable={props.selectable}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            handleSortColumn={handleSetSortColumn}
            handleSortOrder={handleSetSortOrder}
            headerStyle={props.headerStyle}
          />
        </>
      ) : null}
      <tbody>
        {props.data.map((rowData, index) => (
          <Row
            useListLayout={props.useListLayout}
            key={Object.values(rowData)[0] + index}
            data={rowData}
            headers={props.headers}
            selectable={props.selectable}
            selectionType={props.selectionType}
            isSelected={selectedRows.includes(
              Object.values(rowData)[0] + index
            )}
            handleSelectRow={() =>
              handleSelectRow(Object.values(rowData)[0] + index)
            }
            style={props.rowStyle}
            selectedStyle={props.selectedRowStyle}
            selectorColor={props.selectorColor}
          />
        ))}
      </tbody>
    </table>
  );
};

const HeaderRow = (props: IHeaderRowProps) => {
  return (
    <thead style={props.headerStyle ?? {}}>
      <tr>
        {props.useListLayout ? (
          <>
            {props.name && (
              <>
                {props.selectable ? <th></th> : null}
                <th>
                  <span>{props.name}</span>
                </th>
              </>
            )}
          </>
        ) : (
          <>
            {props.selectable ? <th></th> : null}
            {props.headers.map((headerData) => (
              <th
                key={headerData.name}
                style={{
                  ...(headerData.alignment && {
                    textAlign: headerData.alignment,
                  }),
                }}
              >
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
                        onClick={() =>
                          props.handleSortColumn?.(headerData.name)
                        }
                      >
                        <img src={ArrowBothIcon} />
                      </button>
                    )}
                  </span>
                ) : null}
              </th>
            ))}
          </>
        )}
      </tr>
    </thead>
  );
};

const Row = (props: IRowProps) => {
  return (
    <tr
      className={`${props.isSelected ? "selected" : ""} ${
        props.useListLayout ? "list-layout" : ""
      }`}
      style={props.isSelected ? props.selectedStyle : props.style}
    >
      {props.selectable ? (
        props.selectionType === SelectionType.Radio ? (
          <td className="row-select">
            <Radio
              isSelected={props.isSelected}
              handleClick={props.handleSelectRow}
              color={props.selectorColor}
            />
          </td>
        ) : (
          <td className="row-select">
            <Checkbox
              isSelected={props.isSelected}
              handleClick={props.handleSelectRow}
              color={props.selectorColor}
            />
          </td>
        )
      ) : null}
      {props.useListLayout ? (
        <td>
          <ul className="table-list">
            {props.headers.map((h) => (
              <li key={h.name}>
                <span className="header">{h.title}:</span>{" "}
                <span>{props.data[h.name] ? props.data[h.name] : "N/A"}</span>
              </li>
            ))}
          </ul>
        </td>
      ) : (
        <>
          {props.headers.map((h) => (
            <td
              key={h.name}
              style={{
                ...(h.alignment && {
                  textAlign: h.alignment,
                }),
              }}
            >
              {props.data[h.name] ? props.data[h.name] : "N/A"}
            </td>
          ))}
        </>
      )}
    </tr>
  );
};

export default Table;
