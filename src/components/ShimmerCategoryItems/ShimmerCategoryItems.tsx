import React, { ReactElement } from 'react'
import ShimmerDiv from '../ShimmerDiv/ShimmerDiv'
import styled, { css } from 'styled-components'
import ShimmerTitle from '../ShimmerTitle/ShimmerTitle'
import ShimmerText from '../ShimmerText/ShimmerText'
import ShimmerButton from '../ShimmerButton/ShimmerButton'

type CategoryItemProps =
    {
        items?: number,
        itemGap?: number,
        imageHeight?: number | string,
        imageWidth?: number | string,
        imageRounded?: number,
        hasTitle?: boolean,
        hasText?: boolean,
        hasButton?: boolean,
        hasImage?: boolean,
        contentPosition?: "start" | "center" | "end"
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
        }
    );



function gradientColors(props: CategoryItemProps): [string, string, string] {


    if (props.mode === "custom") {
        return [props.from, props.via, props.to]
    } else {
        return ["", "", ""]
    }

}


export default function ShimmerCategoryItems(props: CategoryItemProps) {

    let [from, via, to] = gradientColors(props);

    return <div className="shimmer-category-items-main-div">
        {
            (props.loading && !props.children) &&
            Array.from({ length: props.items! }).map((_,index) => {
                return <>
                    <CategoryItemDiv className={props.className} key={index} itemGap={props.itemGap}>
                        {
                            props.hasImage &&
                            <ShimmerDiv className={"shimmer-category-items-image "} mode={props.mode} height={props.imageHeight!} width={props.imageWidth!} rounded={props.imageRounded} from={from} via={via} to={to} />
                        }
                        <CategoryItemDetails className="shimmer-category-items-details" contentPosition={props.contentPosition}>
                            {
                                props.hasTitle &&
                                <ShimmerTitle className={"shimmer-category-items-title-div"} mode={props.mode} line={1} gap={6} height={13} from={from} via={via} to={to} />
                            }
                            {
                                props.hasText &&
                                <ShimmerText className={"shimmer-category-items-text-div"} mode={props.mode} line={3} gap={6} height={5} from={from} via={via} to={to} />
                            }

                            {
                                props.hasButton &&
                                <ShimmerButton className={"shimmer-category-items-button"} mode={props.mode} size='sm' from={from} via={via} to={to} />
                            }
                        </CategoryItemDetails>
                    </CategoryItemDiv>
                </>
            })
        }

        {
            (props.loading && props.children) ?
                Array.from({ length: props.items! }).map((_,index) => {
                    return <>
                        <CategoryItemDiv className={props.className} key={index} itemGap={props.itemGap}>
                            {
                                props.hasImage &&
                                <ShimmerDiv className={"shimmer-category-items-image "} mode={props.mode} height={props.imageHeight!} width={props.imageWidth!} rounded={props.imageRounded} from={from} via={via} to={to} />
                            }
                            <CategoryItemDetails className="shimmer-category-items-details" contentPosition={props.contentPosition}>
                                {
                                    props.hasTitle &&
                                    <ShimmerTitle className={"shimmer-category-items-title-div"} mode={props.mode} line={1} gap={6} height={13} from={from} via={via} to={to} />
                                }
                                {
                                    props.hasText &&
                                    <ShimmerText className={"shimmer-category-items-text-div"} mode={props.mode} line={3} gap={6} height={5} from={from} via={via} to={to} />
                                }

                                {
                                    props.hasButton &&
                                    <ShimmerButton className={"shimmer-category-items-button"} mode={props.mode} size='sm' from={from} via={via} to={to} />
                                }
                            </CategoryItemDetails>
                        </CategoryItemDiv>
                    </>
                })
                : props.children
        }

    </div>

}

ShimmerCategoryItems.defaultProps = {
    items: 1,
    itemGap: 30,
    imageHeight: 100,
    imageWidth: 100,
    imageRounded: 0,
    hasTitle: true,
    hasText: true,
    hasButton: true,
    hasImage: true,
    contentCenter: "start",
    loading: true,
    className:"shimmer-category-items"
}

const CategoryItemDiv = styled.div<Pick<CategoryItemProps, "itemGap">>`
    display: flex;
    ${p => p.itemGap && css` 
        margin-bottom: ${p.itemGap}px;
    `};
`;

const CategoryItemDetails = styled.div<Pick<CategoryItemProps, "contentPosition">>`
    display: flex;
    flex-direction: column;
    ${p => p.contentPosition == "start" && css`
        align-self:self-start;
    `};
    ${p => p.contentPosition == "center" && css`
        align-self:center;
    `};
    ${p => p.contentPosition == "end" && css`
        align-self:self-end;
    `};
    gap: 0.3em;
    padding-inline: 1em;
    width: 100%;
`;