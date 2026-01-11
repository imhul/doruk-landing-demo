import { useRef, useState } from 'react';
// components
import AnimatedPathFollower from '../components/AnimatedPathFollower.jsx';
// config
import { langs, defaultLang, translate, svgConfig } from '../config';
// assets
import logo from '../assets/png/home/logo.png';

const MainSection = ({ lang, setLang, sectionIsActive, scrollProgress }) => {
    const containerRef = useRef(null),
        [langOpen, setLangOpen] = useState(false);

    return (
        <div className="main-section">
            <header>
                <img src={logo} height="40" alt="logo" />
                <div
                    className={`lang-selector-wrp mobile ${langOpen ? "open" : ""}`}
                    onClick={() => !langOpen && setLangOpen(true)}
                >
                    <div className="decoration" />
                    <div className="lang-selector">
                        {langs.map(item => (
                            <div
                                key={item}
                                className={`lang-item ${lang === item ? "active" : ""}`}
                                onClick={() => {
                                    if (langOpen) {
                                        setLang(item);
                                        setLangOpen(false);
                                    }
                                }}
                            >
                                {langOpen ? item : lang}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lang-selector-wrp">
                    <div className={`decoration ${lang === defaultLang ? "bottom" : "top"}`} />
                    <div className="lang-selector">
                        {langs.map(item => (
                            <div
                                key={item}
                                className={`lang-item ${lang === item ? "active" : ""}`}
                                onClick={() => setLang(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </header>
            <div className="background-a-outer">
                <div className="bottom-gradient" />
                <div className="right-gradient" />
                <div className="background-a">
                    <div className="background-a-inner" />
                </div>
            </div>
            <div className="background-b" ref={containerRef}>
                <AnimatedPathFollower
                    container={containerRef.current}
                    direction="rtl"
                    offsetStart={1.1}
                    config={svgConfig.home}
                />
            </div>
            <div className="content">
                <div className="decorations">
                    <div className="horizontal-rectangles">
                        <div
                            className="rectangle"
                            style={{
                                transform: `translate(${scrollProgress > 0
                                    ? -(Math.round(scrollProgress / 8)) : 0}rem)`
                            }}
                        />
                        <div
                            className="rectangle"
                            style={{
                                transform: `translate(${scrollProgress > 0
                                    ? Math.round(scrollProgress / 8) : 0}rem)`
                            }}
                        />
                        <div
                            className="rectangle"
                            style={{
                                transform: `translate(${scrollProgress > 0
                                    ? -(Math.round(scrollProgress / 8)) : 0}rem)`
                            }}
                        />
                        <div className="rectangle" />
                        <div className="rectangle" />
                    </div>
                    <div className="vertical-rectangles">
                        <div className="rectangle" />
                        <div className="rectangle" />
                        <div className="rectangle" />
                        <div className="rectangle" />
                        <div className="rectangle" />
                    </div>
                </div>
                <h1 className="title">
                    <span
                        className="title__left"
                        style={{
                            transform: `translateX(calc(${Math.round(scrollProgress / 2)}rem - 50%))`
                        }}
                    >
                        {translate("HOME_TITLE_PART_1", lang)}
                    </span>
                    <span
                        className="title__right"
                        style={{
                            transform: `translateX(calc(${Math.round(scrollProgress / 2)}rem + 50%))`
                        }}
                    >
                        {translate("HOME_TITLE_PART_2", lang)}
                    </span>
                </h1>
                <h2 className="subtitle">
                    {translate("HOME_SUBTITLE", lang)}
                    <span>{translate("HOME_SUBTITLE_END", lang)}</span>
                </h2>
            </div>
        </div>
    );
}

export default MainSection;
