declare module 'react-animated-squares' {
    import * as React from 'react';

    type SquaresBGProps = {
        count?: number,
        speed?: number,
        minSize?: number,
        maxSize?: number,
        backgroundColor?: string,
        squareColor?: string,
        randomBGColor?: boolean,
        randomSquareColor?: boolean
    };

    const SquaresBG: React.FC<SquaresBGProps>;
    export default SquaresBG;
}