import React, { ReactElement } from "react";
import ShimmerText from "../ShimmerText/ShimmerText";
import styled, { css } from "styled-components";

type TableProps = {
  row: number;
  col: number;
  border?: number;
  borderColor?: string;
  rounded?: number;
  rowGap?: number;
  colPadding?: number[];
  loading?: boolean;
  children?: ReactElement;
} & (
  | {
      mode: "light";
    }
  | {
      mode: "dark";
    }
  | {
      mode: "custom";
      from: string;
      via: string;
      to: string;
    }
);

function gradientColors(props: TableProps): [string, string, string] {
  if (props.mode === "custom") {
    return [props.from, props.via, props.to];
  } else {
    return ["", "", ""];
  }
}

export default function ShimmerTable (props: TableProps) {
  let [from, via, to] = gradientColors(props);

  return (
    <div>
      {props.loading && !props.children && (
        <Table rowGap={props.rowGap}>
          {Array.from({ length: props.row }).map((_, index) => {
            return (
              <TableRows key={index}>
                {Array.from({ length: props.col }).map((_, index) => {
                  return (
                    <TableCols
                      key={index}
                      mode={props.mode}
                      border={props.border}
                      borderColor={props.borderColor}
                      rounded={props.rounded}
                      colPadding={props.colPadding}
                      from={from}
                    >
                      <ShimmerText
                        mode={props.mode}
                        line={1}
                        gap={0}
                        width={100}
                        from={from}
                        via={via}
                        to={to}
                      />
                    </TableCols>
                  );
                })}
              </TableRows>
            );
          })}
        </Table>
      )}

      {props.loading && props.children ? (
        <Table rowGap={props.rowGap}>
          {Array.from({ length: props.row }).map((_, index) => {
            return (
              <TableRows key={index}>
                {Array.from({ length: props.col }).map((_, index) => {
                  return (
                    <TableCols
                      key={index}
                      mode={props.mode}
                      border={props.border}
                      borderColor={props.borderColor}
                      rounded={props.rounded}
                      colPadding={props.colPadding}
                      from={from}
                    >
                      <ShimmerText
                        mode={props.mode}
                        line={1}
                        gap={0}
                        width={100}
                        from={from}
                        via={via}
                        to={to}
                      />
                    </TableCols>
                  );
                })}
              </TableRows>
            );
          })}
        </Table>
      ) : (
        props.children
      )}
    </div>
  );
};

ShimmerTable.defaultProps = {
  border: 1,
  rounded: 0.1,
  loading: true,
  rowGap: 14,
  colPadding: [10, 5, 10, 5],
};

const Table = styled.table<Pick<TableProps, "rowGap">>`
  border-collapse: separate;
  width: 100%;

  ${(p) =>
    css`
      border-spacing: 0 ${p.rowGap}px;
    `}
`;

const TableRows = styled.tr``;

const TableCols = styled.td<
  Pick<
    TableProps,
    "mode" | "rounded" | "border" | "borderColor" | "colPadding"
  > & { from: string }
>`
  margin-left: auto;
  margin-right: auto;

  ${(p) =>
    p.mode == "light" &&
    css`
      border: ${p.border}px solid ${p.borderColor};
      border-radius: ${p.rounded}em;
    `}

  ${(p) =>
    p.mode == "dark" &&
    css`
      border: ${p.border}px solid ${p.borderColor};
      border-radius: ${p.rounded}em;
    `}
  
      ${(p) =>
    p.mode == "custom" &&
    css`
      border: ${p.border}px solid ${p.from};
      border-radius: ${p.rounded}em;
    `}
  
      ${(p) =>
    css`
      padding: ${p.colPadding![0]}px ${p.colPadding![1]}px ${p.colPadding![2]}px
        ${p.colPadding![3]}px;
    `}
`;
