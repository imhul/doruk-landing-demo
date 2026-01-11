
import { useState, useRef } from 'react';
// hooks
import { useTitleAnimation } from '../hooks';
// components
import AnimatedPathFollower from '../components/AnimatedPathFollower.jsx';
// config
import {
    translate,
    svgConfig,
    // contactUrl,
    // phoneRegex,
    // emailRegex,
    nameMinLength,
    phoneMinLength,
    emailMinLength,
    inputMaxLength,
    commentMinLength,
    commentMaxLength,
} from "../config";
// assets
import jpgBg from '../assets/jpg/keep-in-touch-bg.jpg';

const NameInput = ({ value, setValue, lang }) => {
    return (
        <input
            required
            type="text"
            value={value}
            minLength={nameMinLength}
            maxLength={inputMaxLength}
            onChange={(e) => setValue(e.target.value)}
            placeholder={translate('KEEP_IN_TOUCH_INPUT_NAME', lang)}
        />
    )
}

const KeepInTouch = ({ lang }) => {
    const entryRef = useRef(null),
        containerRef = useRef(null),
        [userName, setUserName] = useState(""),
        [userPhone, setUserPhone] = useState(""),
        [userEmail, setUserEmail] = useState(""),
        [userComment, setUserComment] = useState(""),
        [phoneOrEmail, setPhoneOrEmail] = useState(false), // phone
        [error, setError] = useState(false),
        [success, setSuccess] = useState(false),
        [serverError, setServerError] = useState(false),
        progress = useTitleAnimation(entryRef);

    const clearForm = () => {
        setUserName("");
        setUserPhone("");
        setUserEmail("");
        setUserComment("");
        setPhoneOrEmail(false);
        setSuccess(false);
    }

    const submit = async () => {
        // For production only:
        // try {
        //     if (phoneOrEmail) {
        //         if (!emailRegex.test(userEmail)) {
        //             setError(true);
        //             return;
        //         }
        //     } else {
        //         if (!phoneRegex.test(userPhone)) {
        //             setError(true);
        //             return;
        //         }
        //     }

        //     const response = await fetch(contactUrl, {
        //         body: JSON.stringify({
        //             userName,
        //             userPhone,
        //             userEmail,
        //             userComment,
        //         }),
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //         }
        //     });

        //     if (!response.ok) {
        //         setServerError(true);
        //     } else {
        //         setSuccess(true);
        //         setTimeout(() => clearForm(), 4000);
        //     }
        // } catch (error) {
        //     console.error("Server error:", error);
        // }
        setTimeout(() => setSuccess(true), 2000);
        setTimeout(() => clearForm(), 4000);
    }

    return (<div className="keep-in-touch">
        <div className="backgrounds">
            <div className="top" ref={entryRef}>
                <h1
                    className="animated-title"
                    style={{ transform: `translateX(${progress}%)` }}
                >
                    {translate("KEEP_IN_TOUCH_TITLE", lang)}
                </h1>
            </div>

            <div className="bottom">
                <div className="background-a" ref={containerRef}>
                    <AnimatedPathFollower
                        container={containerRef.current}
                        offsetStart={0.2}
                        config={svgConfig.keepInTouch}
                    />
                </div>
            </div>
        </div>

        <div className="content">
            <div className="content-top">
                <div className="decoration">
                    <img src={jpgBg} alt="decoration" />
                    <div className="input-name-mobile">
                        <NameInput lang={lang} value={userName} setValue={setUserName} />
                    </div>
                </div>
                <div className="form">
                    <div className="flexible">
                        <div className="inputs">
                            <div className="input-name-desktop">
                                <NameInput lang={lang} value={userName} setValue={setUserName} />
                            </div>
                            <div className="contact-wrp">
                                {!phoneOrEmail ? (
                                    <input
                                        required
                                        type="tel"
                                        value={userPhone}
                                        minLength={phoneMinLength}
                                        maxLength={inputMaxLength}
                                        onChange={(e) => setUserPhone(e.target.value)}
                                        placeholder={translate('KEEP_IN_TOUCH_INPUT_PHONE', lang)}
                                    />
                                ) : (
                                    <input
                                        required
                                        type="email"
                                        value={userEmail}
                                        minLength={emailMinLength}
                                        maxLength={inputMaxLength}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        placeholder={translate('KEEP_IN_TOUCH_INPUT_EMAIL', lang)}
                                    />
                                )}
                                <div className="switch-wrp">
                                    {phoneOrEmail ? "phone" : "email"}
                                    <div
                                        className={`switch ${phoneOrEmail ? "phone" : "email"}`}
                                        onClick={() => setPhoneOrEmail(prev => !prev)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="textarea-wrp">
                            <textarea
                                placeholder={translate('KEEP_IN_TOUCH_INPUT_COMMENT', lang)}
                                value={userComment}
                                minLength={commentMinLength}
                                maxLength={commentMaxLength}
                                onChange={(e) => setUserComment(e.target.value)}
                            ></textarea>
                            <div className="textarea-counter">
                                {userComment.length ?? 0} {translate('FROM', lang)} {commentMaxLength} {translate('SYMBOLS', lang)}
                            </div>
                        </div>
                    </div>
                    <div className="submit-wrp">
                        {serverError && (
                            <div className="message error-message">
                                <div className="close" onClick={() => setServerError(false)}>✖</div>
                                <div className="message-header">
                                    <i className="icon-about-arrow" />
                                    {translate("KEEP_IN_TOUCH_ERROR_HEADER", lang)}
                                    <i className="icon-about-arrow" />
                                </div>
                                {translate("KEEP_IN_TOUCH_SERVER_ERROR", lang)}
                            </div>
                        )}
                        {error && (
                            <div className="message error-message">
                                <div className="close" onClick={() => setError(false)}>✖</div>
                                <div className="message-header">
                                    <i className="icon-about-arrow" />
                                    {translate("KEEP_IN_TOUCH_ERROR_HEADER", lang)}
                                    <i className="icon-about-arrow" />
                                </div>
                                {translate("KEEP_IN_TOUCH_FILL_FORM_ERROR", lang)}
                            </div>
                        )}
                        {success && (
                            <div className="message success-message">
                                <div className="close" onClick={() => clearForm()}>✖</div>
                                <div className="message-header">
                                    <i className="icon-about-arrow" />
                                    {translate("KEEP_IN_TOUCH_SUCCESS_HEADER", lang)}
                                    <i className="icon-about-arrow" />
                                </div>
                                {translate("KEEP_IN_TOUCH_SUBMIT_SUCCESS", lang)}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={!userName || (phoneOrEmail ? !userEmail : !userPhone) || !userComment}
                            onClick={submit}
                        >
                            <i className="icon-about-arrow" />
                            <span>{translate("KEEP_IN_TOUCH_BUTTON", lang)}</span>
                            <i className="icon-about-arrow" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="content-bottom">
                <div className="text-block">
                    <div className="text">{translate("KEEP_IN_TOUCH_TEXT", lang)}</div>
                    <div className="email">{translate("KEEP_IN_TOUCH_EMAIL", lang)}</div>
                    <div className="phone">{translate("KEEP_IN_TOUCH_PHONE", lang)}</div>
                </div>
            </div>
        </div>
    </div>)
}

export default KeepInTouch;
