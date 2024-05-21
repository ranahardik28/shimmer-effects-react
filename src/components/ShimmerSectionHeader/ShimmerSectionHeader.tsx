import React, { ReactElement } from 'react'
import ShimmerTitle from '../ShimmerTitle/ShimmerTitle';
import ShimmerText from '../ShimmerText/ShimmerText';


type SectionHeaderProps =
    {
        titleHeight?: number,
        titleWidth?: number[],
        subtitleHeight?: number,
        subtitleWidth?: number[],
        titleBorder?: number,
        subtitleBorder?: number,
        titleRounded?: number,
        subtitleRounded?: number,
        titleLine?: number,
        subtitleLine?: number,
        titleGap: number,
        subtitleGap: number,
        center?: boolean,
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
            from: string;
            via: string
            to: string;
        });




function gradientColors(props: SectionHeaderProps): [string, string, string] {

    if (props.mode === "custom") {
        return [props.from, props.via, props.to]
    } else {
        return ["", "", ""]
    }

}

export default function ShimmerSectionHeader(props: SectionHeaderProps) {

    let [from, via, to] = gradientColors(props);

    return (

        <div className={props.className}>

            {
                (props.loading && !props.children) &&
                <>
                    {

                        Array.from({ length: props.titleLine! }).map((_, index) => {

                            return <ShimmerTitle className={"shimmer-section-header-title-div"} key={index} mode={props.mode} center={props.center} line={1} gap={props.titleGap} border={props.titleBorder} height={props.titleHeight} width={props.titleWidth?.[index]} rounded={props.titleRounded} from={from} via={via} to={to} />

                        })

                    }
                    {

                        Array.from({ length: props.subtitleLine! }).map((_, index) => {

                            return <ShimmerText className={"shimmer-section-header-text-div"} key={index} mode={props.mode} center={props.center} line={1} gap={props.subtitleGap} border={props.subtitleBorder} height={props.subtitleHeight} width={props.subtitleWidth?.[index]} rounded={props.subtitleRounded} from={from} via={via} to={to} />

                        })
                    }
                </>
            }

            {
                (props.loading && props.children) ?
                    <>
                        {

                            Array.from({ length: props.titleLine! }).map((_, index) => {

                                return <ShimmerTitle className={"shimmer-section-header-title-div"} key={index} mode={props.mode} center={props.center} line={1} gap={props.titleGap} border={props.titleBorder} height={props.titleHeight} width={props.titleWidth?.[index]} rounded={props.titleRounded} from={from} via={via} to={to} />

                            })

                        }
                        {

                            Array.from({ length: props.subtitleLine! }).map((_, index) => {


                                return <ShimmerText className={"shimmer-section-header-text-div"} key={index} mode={props.mode} center={props.center} line={1} gap={props.subtitleGap} border={props.subtitleBorder} height={props.subtitleHeight} width={props.subtitleWidth?.[index]} rounded={props.subtitleRounded} from={from} via={via} to={to} />

                            })
                        }
                    </>
                    :
                    props.children
            }



        </div>


    )
}

ShimmerSectionHeader.defaultProps = {
    titleLine: 1,
    subtitleLine: 3,
    titleHeight: 16,
    subtitleHeight: 8,
    titleWidth: [40],
    subtitleWidth: [80, 70, 60],
    titleBorder: 1,
    subtitleBorder: 1,
    titleRounded: 1,
    subtitleRounded: 1,
    titleGap: 8,
    subtitleGap: 6,
    loading: true,
    center: false,
    className: 'shimmer-section-header'
}



