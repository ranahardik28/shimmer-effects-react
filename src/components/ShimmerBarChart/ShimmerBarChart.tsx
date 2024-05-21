import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'
import ShimmerDiv from '../ShimmerDiv/ShimmerDiv';


type ChartProps =
    {
        barWidth?: number | string,
        chartType: "linear" | "random"
        loading?: boolean,
        children?: ReactElement,
        className?: string
    } &
    (
        {
            mode: "light"
        }
        | {

            mode: "dark"
        } | {
            mode: "custom",
            lineColor: string,
            from: string;
            via: string
            to: string;
        }
    );

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // Round up the minimum value
    max = Math.floor(max); // Round down the maximum value
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate the random integer
}

function gradientColors(props: ChartProps): [string, string, string] {

    if (props.mode === "custom") {
        return [props.from, props.via, props.to]
    } else {
        return ["", "", ""]
    }

}



export default function ShimmerBarChart(props: ChartProps) {
    let [from, via, to] = gradientColors(props);
    return (

        <>
            {
                (props.loading && !props.children)
                && <BarChart className={`shimmer-bar-chart ${props.className ? props.className : ""}`}>
                    <BarChartYAxis className="shimmer-bar-chart-y-axis" >
                        <BarChartYAxisLine className="shimmer-bar-chart-y-axis-line" chartType={props.chartType} mode={props.mode} from={""} via={""} to={""} lineColor={(props.mode == "custom") ? props.lineColor : ""} />
                    </BarChartYAxis>
                    <BarArea className="shimmer-bar-area">

                        {
                            Array.from({ length: 11 }).map((_, index) => {
                                let height = props.chartType == "linear" ? (index == 0) ? `${5}%` : `${index * 10}%` : `${getRandomInt(1, 100)}%`;
                                return <Bar className={`shimmer-bar-${index}`} key={index} mode={props.mode} height={height} width={props.barWidth} from={from} via={via} to={to} />
                            })
                        }

                    </BarArea>
                    <BarChartXAxis className="shimmer-bar-chart-x-axis-line" chartType={props.chartType} mode={props.mode} from={""} via={""} to={""} lineColor={(props.mode == "custom") ? props.lineColor : ""} />

                </BarChart>
            }

            {
                (props.loading && props.children)
                    ? <BarChart className="shimmer-bar-chart" >
                        <BarChartYAxis className="shimmer-bar-chart-y-axis" >
                            <BarChartYAxisLine className="shimmer-bar-chart-y-axis-line" chartType={props.chartType} mode={props.mode} from={""} via={""} to={""} lineColor={(props.mode == "custom") ? props.lineColor : ""} />
                        </BarChartYAxis>
                        <BarArea className="shimmer-bar-area">

                            {
                                Array.from({ length: 11 }).map((_, index) => {
                                    let height = props.chartType == "linear" ? (index == 0) ? `${5}%` : `${index * 10}%` : `${getRandomInt(1, 100)}%`;
                                    return <Bar className={`shimmer-bar-${index}`} key={index} mode={props.mode} height={height} width={props.barWidth} from={from} via={via} to={to} />
                                })
                            }

                        </BarArea>
                        <BarChartXAxis className="shimmer-bar-chart-x-axis-line" chartType={props.chartType} mode={props.mode} from={""} via={""} to={""} lineColor={(props.mode == "custom") ? props.lineColor : ""} />

                    </BarChart>
                    : props.children
            }
        </>

    )
}

ShimmerBarChart.defaultProps = {
    barWidth: "7%",
    loading: true
}


const BarChart = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
`;

const BarChartYAxis = styled.div`
    background-color: red;
`;

const BarChartYAxisLine = styled.div<ChartProps>`
    ${p => (p.mode == "light") && css`        
        background-color: #cbd5e1;
    ` }

    ${p => (p.mode == "dark") && css`        
        background-color: #6b7280;
    ` }

    ${p => (p.mode == "custom") && css`        
        background-color: ${p.lineColor};
    `}

    width: 2px;
    height: 100%;
`;



const BarChartXAxis = styled.div<ChartProps>`
    ${p => (p.mode == "light") && css`        
        background-color: #cbd5e1;
    ` }

    ${p => (p.mode == "dark") && css`        
        background-color: #6b7280;
    ` }

    ${p => (p.mode == "custom") && css`        
        background-color: ${p.lineColor};
    ` }

    height: 2px;
    width: 100%;
    flex-basis: 100%;

`;

const BarArea = styled.div`
    display: flex;
    align-items: end;
    height: 100%;
    flex-basis: 99%;
    justify-content: space-around;
`;

const Bar = styled(ShimmerDiv)`
`;
