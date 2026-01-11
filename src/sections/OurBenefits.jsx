
import { useRef } from 'react';
// hooks
import { useTitleAnimation } from '../hooks';
// components
import AnimatedPathFollower from '../components/AnimatedPathFollower';
// config
import { translate, svgConfig } from "../config";
// assets
import jpgBg from '../assets/jpg/benefits-bg.jpg';

const TitleBlock = ({ children, icon }) => {
    return (
        <div className="title-block">
            <div className="circle">
                <i className={icon} />
            </div>
            <div className="text">
                {children}
            </div>
        </div>
    );
}

const OurBenefits = ({ lang }) => {
    const entryRef = useRef(null),
        containerRef = useRef(null),
        progress = useTitleAnimation(entryRef);

    return (<div className="our-benefits">
        <div className="backgrounds">
            <div className="top" ref={entryRef}>
                <h1
                    className="animated-title"
                    style={{
                        transform: `translateX(${progress}%)`
                    }}
                >
                    {translate("OUR_BENEFITS_TITLE", lang)}
                </h1>
            </div>

            <div className="bottom">
                <div className="background-a" ref={containerRef}>
                    <AnimatedPathFollower
                        container={containerRef.current}
                        direction="rtl"
                        offsetStart={1.2}
                        config={svgConfig.ourBenefits}
                    />
                </div>
                <div className="background-b" />
            </div>
        </div>

        <div className="content">
            <div className="content-center">
                <div className="svg-background">
                    <img className="masked" src={jpgBg} alt="decoration background 2" />
                </div>
            </div>
            <div className="content-around">
                <TitleBlock icon="icon-our-benefits-office-remote">
                    <div className="first-line truncate">
                        {translate("OUR_BENEFITS_TL_TITLE_START", lang)}
                    </div>
                    <div className="second-line truncate">
                        <span>{translate("OUR_BENEFITS_TL_TITLE", lang)}</span>
                    </div>
                </TitleBlock>

                <TitleBlock icon="icon-our-benefits-insurance">
                    <div className="first-line truncate">
                        {translate("OUR_BENEFITS_CL_TITLE_START", lang)}
                    </div>
                    <div className="second-line truncate">
                        {translate("OUR_BENEFITS_CL_TITLE", lang)}
                        <span>{translate("OUR_BENEFITS_CL_TITLE_END", lang)}</span>
                    </div>
                </TitleBlock>

                <TitleBlock icon="icon-our-benefits-team">
                    <div className="first-line truncate">
                        {translate("OUR_BENEFITS_B_TITLE_START", lang)}
                    </div>
                    <div className="second-line truncate">
                        <span>{translate("OUR_BENEFITS_B_TITLE", lang)}</span>
                    </div>
                </TitleBlock>

                <TitleBlock icon="icon-our-benefits-lunch-office">
                    <div className="first-line truncate">
                        <span>{translate("OUR_BENEFITS_TR_TITLE_STARRT", lang)}</span>
                        {translate("OUR_BENEFITS_TR_TITLE", lang)}
                    </div>
                    <div className="second-line truncate">
                        {translate("OUR_BENEFITS_TR_TITLE_END", lang)}
                    </div>
                </TitleBlock>

                <TitleBlock icon="icon-our-benefits-playing-zone">
                    <div className="first-line truncate">
                        <span>{translate("OUR_BENEFITS_CR_TITLE_START", lang)}</span>
                        {translate("OUR_BENEFITS_CR_TITLE", lang)}
                    </div>
                    <div className="second-line truncate">
                        {translate("OUR_BENEFITS_CR_TITLE_END", lang)}
                    </div>
                </TitleBlock>
            </div>
        </div>
    </div>)
}

export default OurBenefits;
