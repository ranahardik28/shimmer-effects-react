import React, { ReactElement } from "react";
import ShimmerDiv from "../ShimmerDiv/ShimmerDiv";
import styled, { css } from "styled-components";
import ShimmerTitle from "../ShimmerTitle/ShimmerTitle";
import ShimmerText from "../ShimmerText/ShimmerText";
import ShimmerButton from "../ShimmerButton/ShimmerButton";

type ShimmerContentBlockProps = {
  rounded?: number;
  items?: number;
  itemsGap?: number;
  loading?: boolean;
  children?: ReactElement;
  thumbnailHeight?: number;
  thumbnailWidth?: number;
  thumbnailBorder?: number;
  thumbnailRounded?: number;
  contentDetailsPosition?: "center" | "start" | "end";
  contentDetailTextLines?: number;
  className?: string;
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

function gradientColors(
  props: ShimmerContentBlockProps
): [string, string, string] {
  if (props.mode === "custom") {
    return [props.from, props.via, props.to];
  } else {
    return ["", "", ""];
  }
}

export default function ShimmerContentBlock(props: ShimmerContentBlockProps) {
  let [from, via, to] = gradientColors(props);

  return (
    <div className="shimmer-content-block-main-div">
      {props.loading &&
        !props.children &&
        Array.from({ length: props.items! }).map((_, index) => {
          return (
            <ShimmerContent
              className={props.className}
              key={index}
              mode={props.mode}
              rounded={props.rounded}
              from={from}
              itemsGap={props.itemsGap}
            >
              <ShimmerDiv
                className="shimmer-content-block-thumbnail"
                mode={props.mode}
                height={props.thumbnailHeight!}
                width={props.thumbnailWidth!}
                border={props.thumbnailBorder}
                rounded={props.thumbnailRounded}
                from={from}
                via={via}
                to={to}
              />
              <ShimmerContentDetails
                className="shimmer-content-block-details"
                contentDetailsPosition={props.contentDetailsPosition}
                thumbnailWidth={props.thumbnailWidth}
              >
                <ShimmerTitle
                  className="shimmer-content-block-details-title-div"
                  mode={props.mode}
                  width={20}
                  height={20}
                  line={1}
                  from={from}
                  via={via}
                  to={to}
                />
                <ShimmerText
                  className="shimmer-content-block-details-text-div"
                  mode={props.mode}
                  line={props.contentDetailTextLines!}
                  gap={8}
                  from={from}
                  via={via}
                  to={to}
                />
                <ShimmerButton
                  className="shimmer-content-block-details-button"
                  size="sm"
                  mode={props.mode}
                  rounded={0.4}
                  from={from}
                  via={via}
                  to={to}
                ></ShimmerButton>
              </ShimmerContentDetails>
            </ShimmerContent>
          );
        })}

      {props.loading && props.children
        ? Array.from({ length: props.items! }).map((_, index) => {
          return (
            <ShimmerContent
              className={props.className}
              key={index}
              mode={props.mode}
              rounded={props.rounded}
              from={from}
            >
              <ShimmerDiv
                className="shimmer-content-block-thumbnail"
                mode={props.mode}
                height={props.thumbnailHeight!}
                width={props.thumbnailWidth!}
                border={props.thumbnailBorder}
                rounded={props.thumbnailRounded}
                from={from}
                via={via}
                to={to}
              />
              <ShimmerContentDetails
                className="shimmer-content-block-details"
                contentDetailsPosition={props.contentDetailsPosition}
                thumbnailWidth={props.thumbnailWidth}
              >
                <ShimmerTitle
                  className="shimmer-content-block-details-title-div"
                  mode={props.mode}
                  width={20}
                  height={20}
                  line={1}
                  from={from}
                  via={via}
                  to={to}
                />
                <ShimmerText
                  className="shimmer-content-block-details-text-div"
                  mode={props.mode}
                  line={props.contentDetailTextLines!}
                  gap={8}
                  from={from}
                  via={via}
                  to={to}
                />
                <ShimmerButton
                  className="shimmer-content-block-details-button"
                  size="sm"
                  mode={props.mode}
                  rounded={0.4}
                  from={from}
                  via={via}
                  to={to}
                ></ShimmerButton>
              </ShimmerContentDetails>
            </ShimmerContent>
          );
        })
        : props.children}
    </div>
  );
};

ShimmerContentBlock.defaultProps = {
  loading: true,
  rounded: 1,
  items: 1,
  itemsGap: 20,
  thumbnailHeight: 200,
  thumbnailWidth: 200,
  thumbnailBorder: 1,
  thumbnailRounded: 1,
  contentDetailsPosition: "start",
  contentDetailTextLines: 6,
  className: "shimmer-content-block"
};

const ShimmerContent = styled.div<
  Pick<ShimmerContentBlockProps, "mode" | "rounded" | "itemsGap"> & {
    from: string;
  }
>`
  display: flex;
  padding: 2em;
  width: 100%;
  ${(p) => css`
    border-radius: ${p.rounded}em;
  `}

  ${(p) => css`
    margin-bottom: ${p.itemsGap}px;
  `}

  ${(p) =>
    p.mode == "light" &&
    css`
      border: 1px solid #cbd5e1;
    `}

    ${(p) =>
    p.mode == "dark" &&
    css`
      border: 1px solid #374151;
    `}  

    ${(p) =>
    p.mode == "custom" &&
    css`
      border: 1px solid ${p.from};
    `}
`;

const ShimmerContentDetails = styled.div<
  Pick<ShimmerContentBlockProps, "contentDetailsPosition" | "thumbnailWidth">
>`
  display: grid;
  gap: 1em;
  padding: 1em;

  ${(p) => css`
    width: calc(100% - ${p.thumbnailWidth}px);
  `}

  ${(p) => css`
    align-self: ${p.contentDetailsPosition};
  `}
`;
