/*jshint esversion: 11 */

import React, { useRef, useEffect, useMemo } from 'react';
import './App.css';

/* Utility Functions, start */

const randomInclusiveInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const hexToRGBA = hex => `rgba(${hex.match(/\w\w/g).map(x => parseInt(x, 16)).join(', ')}, 0.2)`; // Must be full hex
const rgbToRGBA = rgb => `rgba(${rgb.match(/\d+/g).join(', ')}, .2)`;
const randomRGBA = alpha => `rgba(${randomInclusiveInt(0, 255)}, ${randomInclusiveInt(0, 255)}, ${randomInclusiveInt(0, 255)}, ${alpha})`;

/* Utility Functions, end */

const DEFAULTS = Object.freeze({
    backgroundColor: "#4E54C8",
    count: 10,
    minSize: 100,
    maxSize: 200,
    speed: 0.5,
    squareColor: "#FFFFFF",
    randomBGColor: false,
    randomSquareColor: false
});

function SquareStyle (props) {
    const size = randomInclusiveInt(props.minSize, props.maxSize); // Random int size between min and max, inclusive
    this.width = `${size}px`;
    this.height = `${size}px`;
    this.bottom = `${-size}px`;
    this.left = `${randomInclusiveInt(0, 100)}%`;
    this.background = props.randomSquareColor ? randomRGBA(0.2) : props.squareColor;
    this.animationDelay = `${randomInclusiveInt(0, 50)}s`;
}

function generateSquares (props) {
    const squaresArr = [];
    for (let i = 0; i < props.count; i++) {
        squaresArr.push(<li key={i} className={`square${props.bg_id.current}`} style={new SquareStyle(props)} />);
    }
    return squaresArr;
}

function fixProps (props) {
    return {
        backgroundColor: props.backgroundColor || DEFAULTS.backgroundColor,
        count: props.count === undefined ? DEFAULTS.count : props.count,
        minSize: props.minSize || DEFAULTS.minSize,
        maxSize: props.maxSize || DEFAULTS.maxSize,
        speed: props.speed === undefined ? DEFAULTS.speed : props.speed,
        squareColor: props.squareColor || DEFAULTS.squareColor,
        randomBGColor: props.randomBGColor || DEFAULTS.randomBGColor,
        randomSquareColor: props.randomSquareColor || DEFAULTS.randomSquareColor
    };
}

function SquaresBG (props) {
    const bg = useRef(null); // Ref used to determine BG height
    const bg_id = useRef(randomInclusiveInt(1, 1000000).toString()); // Random ID for each BG instance
    const fixedProps = fixProps(props); // Apply defaults to undefined props
    fixedProps.bg_id = bg_id;
    const first4 = fixedProps.squareColor.substring(0, 4); // First 4 characters of squareColor string
    if (first4[0] === "#") { // Must be full hex. Not a strong check
        fixedProps.squareColor = hexToRGBA(fixedProps.squareColor);
    } else if (first4[0] === "r" && first4[3] === "(") { // Not a strong check
        fixedProps.squareColor = rgbToRGBA(fixedProps.squareColor);
    } else if (first4 !== "rgba") { // Not a strong check
        throw new Error("SquareBG square color must be 6 char hex, rgb, or rgba");
    }
    const squares = useMemo(() => generateSquares(fixedProps), [fixedProps.minSize, fixedProps.maxSize, fixedProps.squareColor, props.randomSquareColor]); // Memoize squares to avoid regenerating on every renders
    useEffect(() => { // On mount, create new keyframe ruleset specific for given bg. On dismount, delete ruleset
        const height = bg.current.offsetHeight + (fixedProps.maxSize);
        const speed = (-59 * fixedProps.speed + 60) * (bg.current.offsetHeight / 1000); // 60s at 0, 1s sec at 1 when height = 1000;
        const keyframes = `
            @keyframes squaresBG${bg_id.current} {
                0% {
                    transform: translate(-50%, 0) rotate(0deg);
                    opacity: 1;
                    border-radius: 0;
                }
                100% {
                    transform: translate(-50%, ${-height}px) rotate(720deg);
                    opacity: 0;
                    border-radius: 50%;
                }
            }
            .square${bg_id.current} {
                animation: squaresBG${bg_id.current} ${speed}s linear infinite;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
        return () => document.head.removeChild(styleElement);
    }, [bg?.current?.offsetHeight, fixedProps.maxSize, fixedProps.speed]);
    if (fixedProps.speed > 1) {
        fixedProps.speed = 1;
        console.error("SquareBG speed should not exceed 1!");
    } else if (fixedProps.speed < 0) {
        fixedProps.speed = 0;
        console.error("SquareBG speed should not be below 0!");
    }
    return (
        <ul ref={bg} className="squareBG" style={{background: fixedProps.randomBGColor ? randomRGBA(1) : fixedProps.backgroundColor}}>
            {squares}
        </ul>
    );
}

export default SquaresBG;