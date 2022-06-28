import React from "react";
import './CircleSVG.css';
import './Reload.css';

export function CircleSVG(props){
    return(
        <circle
            cx={props.pos_circleX}
            cy={props.pos_circleY}
            r={props.radius}
            className={`circleSVG ${props.loading}`}
            style={{
                stroke: props.strokeColor,
                strokeWidth: props.strokeWidthSize,
                fill: props.circleColorFill,
                opacity: props.opacity || 1,
                strokeDasharray: props.stroke_dasharray,
                strokeDashoffset: props.dashoffset_Start_loc,
            }}
        />
    )
}

function Reloading(){

    const width_height_svg = 80;
    const strokeWidthSize = width_height_svg/10;
    const wh_viewBox = width_height_svg + strokeWidthSize;
    const pos_circle_x = width_height_svg/2 + strokeWidthSize/2;
    const pos_circle_y = width_height_svg/2 + strokeWidthSize/2;
    const circle_raduis = width_height_svg/4;

    return(
        <div className='reloading d-flex justify-content-center align-items-center'>
            <div className='container'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-auto'>
                        <svg
                            className='reloading'
                            viewBox={`0 0 ${wh_viewBox} ${wh_viewBox}`}
                            width={width_height_svg}
                            height={width_height_svg}
                            xmlns='http://www.w3.org/2000/svg'>
                            <CircleSVG
                                pos_circleX = {pos_circle_x}
                                pos_circleY = {pos_circle_y}
                                radius = {circle_raduis}
                                strokeColor = 'lightgray'
                                strokeWidthSize = {strokeWidthSize}
                                circleColorFill = 'none'
                                loading = 'loading_1'
                                opacity = '1'
                                stroke_dasharray = {(2 * 3.14 * circle_raduis)/8}
                                dashoffset_Start_loc = '0'
                            />
                            <CircleSVG
                                pos_circleX = {pos_circle_x}
                                pos_circleY = {pos_circle_y}
                                radius = {circle_raduis}
                                strokeColor = 'lightgray'
                                strokeWidthSize = {strokeWidthSize}
                                circleColorFill = 'none'
                                loading = 'loading_2'
                                opacity = '1'
                                stroke_dasharray = {(2 * 3.14 * circle_raduis)/2}
                                dashoffset_Start_loc = '0'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reloading;