import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components';
import { shimmerAnimation } from '../ShimmerButton/ShimmerButton';


type DivProps =
  {
    height: number,
    width: number,
    border?: number,
    rounded?: number,
    loading?: boolean,
    children?: ReactElement
  } &
  (
    {
      mode: "light"
    }
    | {

      mode: "dark"
    } | {
      mode: "custom",
      from: string;
      via: string
      to: string;
    });

function gradientColors(props: DivProps): [string, string, string] {

  if (props.mode === "custom") {
    return [props.from, props.via, props.to]
  } else {
    return ["", "", ""]
  }

}

export default function ShimmerDiv(props: DivProps) {

  let [from, via, to] = gradientColors(props);

  return (

    <>
      {
        (props.loading && !props.children) && <Div mode={props.mode} height={props.height} width={props.width} border={props.border} rounded={props.rounded} from={from} via={via} to={to} />
      }

      {
        (props.loading && props.children) ? <Div mode={props.mode} height={props.height} width={props.width} border={props.border} rounded={props.rounded} from={from} via={via} to={to} /> : props.children
      }
    </>

  )
}

ShimmerDiv.defaultProps = {
  border: 1,
  rounded: 0.1,
  loading: true
}



const Div = styled.div<DivProps>`

    ${p => p.mode == "light" && css`
        background: linear-gradient(to right, #cbd5e1 8%, #f1f5f9 18%, #cbd5e1 33%);
     `
  }

    ${p => p.mode == "dark" && css`
        background: linear-gradient(to right, #374151 8%, #6b7280 18%, #374151 33%);
     `
  }  

    ${p => p.mode == "custom" && css`
        background: linear-gradient(to right, ${p.from} 8%, ${p.via}  18%, ${p.to}  33%);
     `
  } 

    ${p => (p.height && p.width) && css`
      height: ${p.height}px;
      width: ${p.width}px;
     `
  }

    ${p => p.border && css`
     border-width: ${p.border}px;
     `
  }

    ${p => p.rounded && css`
     border-radius: ${p.rounded}em;
     `
  }
    

    background-size: 1000px 100%;
    animation: ${shimmerAnimation} 4.2s linear infinite forwards;

`;