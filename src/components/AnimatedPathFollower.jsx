import { useRef, useState, useEffect } from 'react';
// utils
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const getCoordinatesArray = (d, step = 2) => { // step in pixels
    const svgNS = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);

    const totalLength = path.getTotalLength();
    const temp = [];

    let startIndex = -1;
    let endIndex = -1;
    let maxX = -Infinity;

    for (let i = 0, index = 0; i <= totalLength; i += step, index++) {
        const pt = path.getPointAtLength(i);
        const x = Number(pt.x.toFixed(2));
        temp.push({
            x,
            y: Number(pt.y.toFixed(2))
        });

        if (startIndex === -1 && x < 1) startIndex = index;
        if (x > maxX) {
            maxX = x;
            endIndex = index;
        }
    }

    const coordinates = temp.slice(startIndex, endIndex + 1);
    return coordinates;
}

const AnimatedPathFollower = ({ offsetStart = 0, offsetEnd = 0, container, config, direction = 'ltr' }) => {
    const circleRef = useRef(null),
        pathRef = useRef(null),
        [pathArray, setPathArray] = useState([]),
        [isMobile, setIsMobile] = useState(false);

    useGSAP(() => {
        if (!circleRef.current || !pathRef.current) return;

        const pathEl = pathRef.current;

        gsap.set(circleRef.current, {
            motionPath: {
                path: pathEl,
                align: pathEl,
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
            },
        });

        gsap.to(circleRef.current, {
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
            motionPath: {
                path: pathEl, // pathArray, works the same as pathEl
                align: pathEl,
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                start: direction === 'ltr' ? 0 : 1 + offsetStart,
                end: direction === 'ltr' ? 1 + offsetEnd : 0,
            },
        });
    }, {
        scope: container,
        dependencies: [
            direction,
            offsetStart,
            offsetEnd,
            container,
            pathArray
        ],
    });

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        // testing coordinates array instead of path from config
        // setPathArray(getCoordinatesArray(isMobile ? config.mobile.path : config.desktop.path));

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={isMobile ? config.mobile.viewBox : config.desktop.viewBox}
            className="svg-line"
        >
            <g>
                <path
                    ref={pathRef}
                    fill="#f6b823"
                    d={isMobile ? config.mobile.path : config.desktop.path}
                />
                <circle
                    ref={circleRef}
                    r="13.5"
                    fill="#f6b823"
                />
            </g>
        </svg>
    );
}

export default AnimatedPathFollower;
