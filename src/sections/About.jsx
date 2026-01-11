import { useRef } from "react";
// hooks
import { useTitleAnimation } from '../hooks';
// components
import AboutContent from "../components/AboutContent";
import AnimatedPathFollower from "../components/AnimatedPathFollower";
import Slider from "react-slick";
// config
import { translate, svgConfig, aboutContent, sliderSettings } from "../config";
// assets
import SvgDotsLeft from "../assets/svg/animations/about-dots-left.svg?react";
import SvgDotsRight from "../assets/svg/animations/about-dots-right.svg?react";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * @see {@link https://react-slick.neostack.com/docs/api} slider gallery library
 */

const About = ({ lang }) => {
    const containerRef = useRef(null),
        entryRef = useRef(null),
        progress = useTitleAnimation(entryRef);

    return (<>
        <div className="backgrounds">
            <div className="top" ref={entryRef}>
                <h1
                    className="animated-title"
                    style={{ transform: `translateX(${progress}%)` }}
                >
                    {translate("ABOUT_TITLE", lang)}
                </h1>
            </div>

            <div className="bottom">
                <div className="background-a" ref={containerRef}>
                    <AnimatedPathFollower
                        container={containerRef.current}
                        offsetStart={0.5}
                        config={svgConfig.about}
                    />
                </div>
                <div className="background-b">
                    <SvgDotsLeft className="about-svg-dots-left" />
                    <SvgDotsRight className="about-svg-dots-right" />
                </div>
            </div>
        </div>

        <Slider {...sliderSettings}>
            {aboutContent.map(item => <AboutContent item={item} lang={lang} key={item.id} />)}
        </Slider>
    </>);
}

export default About;