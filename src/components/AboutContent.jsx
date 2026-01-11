// config
import { translate } from "../config";

const AboutContent = ({ item, lang }) => {
    return (
        <div className="horizontal-section">
            <div className={`content ${item.id}`}>
                <div className="content-left">
                    <img className="masked" src={item.bg} alt="decoration background 2" />
                    <div className="title-block">
                        <div className="circle">
                            <i className="icon-about-arrow" />
                        </div>
                        <div className="first-line truncate">
                            <span>{translate(item.titleStart, lang)}</span>
                            {translate(item.title, lang)}
                        </div>
                        <div className="second-line truncate">
                            {translate(item.titleEnd, lang)}
                        </div>
                    </div>
                </div>
                <div className="content-right">
                    <div className="text-block">
                        <div className="text">
                            {translate(item.text, lang)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutContent;
