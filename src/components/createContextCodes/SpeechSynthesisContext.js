import React, { createContext, useContext, useEffect, useState } from 'react';

const SpeechSynthesisContext = createContext();

export const SpeechSynthesisProvider = ({ children }) => {
    const synthesis = window.speechSynthesis;
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSpeakingPause, setIsSpeakingPause] = useState(false);
    const [raviIndiaVoice, setRaviIndiaVoice] = useState(null);

    useEffect(() => {
        const voices = synthesis.getVoices();
        const findingVoice = voices.find(
            (voice) => voice.name === 'Microsoft Ravi - English (India)' && voice.lang === 'en-IN'
        );
        setRaviIndiaVoice(findingVoice);
        // const onEnd = () => {
        //     setIsSpeaking(false);
        // };
        stop();
        // setIsSpeakingPause(false);
        // synthesis.addEventListener('end', onEnd);
        // return () => {
        //     synthesis.removeEventListener('end', onEnd);
        // };
    }, []);

    const speak = (comprehensionText) => {
        if (synthesis && comprehensionText && raviIndiaVoice) {
            const utterance = new SpeechSynthesisUtterance(comprehensionText);
            utterance.voice = raviIndiaVoice;
            utterance.onend = () => {
                setTimeout(() => {
                    // console.log("ended");
                    stop();
                }, 0);
            };
            synthesis.speak(utterance);
            setIsSpeaking(true);
            // console.log("started playing");
        } else {
            console.error("Error: Unable to play");
        }
    };

    const pause = () => {
        if (synthesis) {
            synthesis.pause();
            setIsSpeakingPause(true);
        }
    };

    const resume = () => {
        if (synthesis) {
            synthesis.resume();
            setIsSpeakingPause(false);
        }
    };

    const stop = () => {
        if (synthesis) {
            synthesis.cancel();
            setIsSpeakingPause(false);
            setIsSpeaking(false);
        }
    };

    const replay = (comprehensionText) => {
        stop();
        speak(comprehensionText);
    };

    const contextValue = {
        isSpeaking,
        isSpeakingPause,
        speak,
        pause,
        resume,
        stop,
        replay,
    };

    return <SpeechSynthesisContext.Provider value={contextValue}>{children}</SpeechSynthesisContext.Provider>;
};

export const useSpeechSynthesis = () => {
    return useContext(SpeechSynthesisContext);
};
