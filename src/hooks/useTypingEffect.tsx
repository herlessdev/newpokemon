import { useState, useEffect } from "react";

function useTypingEffect(
  initialText: string,
  typingSpeed: number
) {
  const [displayText, setDisplayText] = useState("");
  const [finishedTyping, setFinishedTyping] = useState(false);

  useEffect(() => {
    setFinishedTyping(false)
    if (initialText) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= initialText.length) {
          setDisplayText(initialText.slice(0, currentIndex));
          currentIndex += 1;
        } else {
          clearInterval(typingInterval);
          setFinishedTyping(true);
        }
      }, typingSpeed);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [initialText, typingSpeed]);

  return { displayText, finishedTyping };
}

export default useTypingEffect;
