import { useEffect, useState } from "react";

const startValue = -350;
const endValue = -50;

const useTitleAnimation = ref => {
    const [progress, setProgress] = useState(startValue);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight;
            const end = windowHeight / 2;
            const entryTop = rect.top;

            if (entryTop <= start && entryTop >= end) {
                const localProgress = (start - entryTop) / (start - end);
                const interpolated = startValue + (localProgress * (endValue - startValue));
                setProgress(interpolated);
            } else if (entryTop < end) {
                setProgress(endValue);
            } else if (entryTop > start) {
                setProgress(startValue);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [ ref ]);

    return progress;
}

export default useTitleAnimation
