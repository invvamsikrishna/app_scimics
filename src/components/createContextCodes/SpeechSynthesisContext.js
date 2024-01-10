import React, { createContext, useContext, useState } from "react";

const SpeechSynthesisContext = createContext();

export const SpeechSynthesisProvider = ({ children }) => {
  const synthesis = window.speechSynthesis;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeakingPause, setIsSpeakingPause] = useState(false);

  const speak = (comprehensionText, raviIndiaVoice) => {
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
    }
    // else {
    // console.error("Error: Unable to play");
    // }
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
      // console.log("stop");
    }
  };

  const replay = (comprehensionText, raviIndiaVoice) => {
    stop();
    speak(comprehensionText, raviIndiaVoice);
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
