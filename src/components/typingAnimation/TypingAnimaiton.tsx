import { useEffect, useState } from "react";

interface TypingLineProps {
    lines: string[];
    speed?: number; // typing speed in ms
}

export const SequentialTyping = ({ lines, speed = 100 }: TypingLineProps) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex >= lines.length) return;

        const interval = setInterval(() => {
            setDisplayedLines(prev => {
                const updated = [...prev];
                updated[currentLineIndex] = (updated[currentLineIndex] || "") + lines[currentLineIndex][currentCharIndex];
                return updated;
            });
            setCurrentCharIndex(prev => prev + 1);
        }, speed);

        if (currentCharIndex === lines[currentLineIndex].length) {
            clearInterval(interval);
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
        }

        return () => clearInterval(interval);
    }, [currentCharIndex, currentLineIndex, lines, speed]);

    return (
        <>
            {displayedLines.map((line, idx) => (
                <p
                    key={idx}
                    className="leading-[100px] drop-shadow-2xl transition-opacity duration-300"
                    style={{ color: idx === 1 ? "#2CC294" : "#D5EED7", opacity: 1 }}
                >
                    {line}
                    {idx === currentLineIndex && <span className="animate-blink">|</span>}
                </p>
            ))}
        </>
    );
};
