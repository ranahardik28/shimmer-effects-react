import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { shimmerAnimation } from '../ShimmerButton/ShimmerButton';


type TitleProps =
    {
        height?: number,
        width?: number,
        border?: number,
        rounded?: number,
        line: number,
        gap: number,
        loading?: boolean,
        children?: ReactElement,
        center?:boolean
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

        


function gradientColors(props: TitleProps): [string, string, string] {

    if (props.mode === "custom") {
        return [props.from, props.via, props.to]
    } else {
        return ["", "", ""]
    }

}

function getWidth(index:number,line:number,width:number | undefined){

    if(line == 1){
        return width
    }

    if(index + 1 == line){
        if(width != undefined){
            return (width / 3)
        }else{
            return width
        }

    }else{
        return width
    }

}

export default function ShimmerTitle(props: TitleProps) {

    let [from, via, to] = gradientColors(props);

    return (

        <div style={{display:"grid" ,placeItems:props.center ? "center" : "start"}}>
            {
                (props.loading && !props.children) &&
                Array.from({ length: props.line }).map((_, index) => {

                    return <Title key={index} mode={props.mode} height={props.height} width={getWidth(index,props.line,props.width)} border={props.border} rounded={props.rounded} line={props.line} gap={props.gap} from={from} via={via} to={to} />
                })
            }

            {
                (props.loading && props.children) ?
                    Array.from({ length: props.line }).map((_, index) => {

                        return <Title key={index} mode={props.mode} height={props.height} width={getWidth(index,props.line,props.width)} border={props.border} rounded={props.rounded} line={props.line} gap={props.gap} from={from} via={via} to={to} />
                    })
                    : props.children
            }
        </div>


    )
}

ShimmerTitle.defaultProps = {
    height: 16,
    width: 100,
    border: 1,
    rounded: 1,
    gap: 8,
    loading:true,
    center:false
}




const Title = styled.div<TitleProps>`

    ${p => p.mode == "light" && css`
        background: linear-gradient(to right, #cbd5e1 8%, #f1f5f9 18%, #cbd5e1 33%);
     `
    };

    ${p => p.mode == "dark" && css`
        background: linear-gradient(to right, #374151 8%, #6b7280 18%, #374151 33%);
     `
    };

    ${p => p.mode == "custom" && css`
        background: linear-gradient(to right, ${p.from} 8%, ${p.via}  18%, ${p.to}  33%);
     `
    }; 

    ${p => (p.height && p.width) && css`
      height: ${p.height}px;
      width: ${p.width}%;
     `
    };

    ${p => p.border && css`
     border-width: ${p.border}px;
     `
    };

    ${p => p.rounded && css`
     border-radius: ${p.rounded}em;
     `
    };

    ${p => p.gap && css`
     margin-bottom: ${p.gap}px;
     `
    };
    
    background-size: 1000px 100%;
    animation: ${shimmerAnimation} 4.2s linear infinite forwards;

`;

