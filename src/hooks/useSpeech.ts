"use client";

import { useCallback, useState } from "react";
import { useProgressStore } from "@/lib/store";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRate = useProgressStore((s) => s.settings.speechRate);

  const speak = useCallback((text: string, lang = "en-US") => {
    if (!("speechSynthesis" in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = speechRate;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [speechRate]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
