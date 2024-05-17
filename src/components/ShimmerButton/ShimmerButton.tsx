import React, { ReactElement } from 'react'
import styled, { css, keyframes } from 'styled-components';

type ButtonProps =
    {
        size?: "lg" | "md" | "sm",
        height?: number,
        width?: number,
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
        }
    );


// type ButtonProps = ContainerProps & {
//     children?: ReactElement;
// }


function getHeightWidth(size: string | undefined, height: number | undefined, width: number | undefined): ["lg" | "md" | "sm", number, number] {

    switch (size) {
        case "sm":

            let h1: number = (height != undefined) ? height : 30;

            let w1: number = (width != undefined) ? width : 80;

            return ["sm", h1, w1]

        case "lg":

            let h2: number = (height != undefined) ? height : 50;

            let w2: number = (width != undefined) ? width : 120;

            return ["lg", h2, w2]

        default:

            let h3: number = (height != undefined) ? height : 40;

            let w3: number = (width != undefined) ? width : 100;

            return ["md", h3, w3]
    }

}

function gradientColors(props: ButtonProps): [string, string, string] {


    if (props.mode === "custom") {
        return [props.from, props.via, props.to]
    } else {
        return ["", "", ""]
    }

}

export default function ShimmerButton(props: ButtonProps) {

    let [csize, cheight, cwidth] = getHeightWidth(props.size, props.height, props.width);

    let [from, via, to] = gradientColors(props);

    return (
        <>
            {
                (props.loading && !props.children) && <Button size={csize} mode={props.mode} height={cheight} width={cwidth} border={props.border} rounded={props.rounded} from={from} via={via} to={to} />
            }

            {
                (props.loading && props.children) ? <Button size={csize} mode={props.mode} height={cheight} width={cwidth} border={props.border} rounded={props.rounded} from={from} via={via} to={to} /> : props.children
            }
        </>

    )
}

ShimmerButton.defaultProps = {
    border: 1,
    rounded: 0.1,
    loading: true
}


export const shimmerAnimation = keyframes`
    0% {
    background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;


const Button = styled.div<ButtonProps>`

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


    background-size: 1000px 100%;
    animation: ${shimmerAnimation} 4.2s linear infinite forwards;

    ${p => p.size == "sm" && css`
        height: ${p.height}px;
        width: ${p.width}px;
     `
    }

    ${p => p.size == "md" && css`
        height: ${p.height}px;
        width: ${p.width}px;
     `
    }

    ${p => p.size == "lg" && css`
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

`;