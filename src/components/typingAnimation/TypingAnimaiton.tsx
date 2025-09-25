import { minion } from "@/app/lib/font";
import { useEffect, useState } from "react";
import "./animation.css";

interface TypingLineProps {
    lines: string[];
    speed?: number;
}

export const SequentialTyping = ({ lines, speed = 100 }: TypingLineProps) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex >= lines.length) return;

        const interval = setInterval(() => {
            setDisplayedLines((prev) => {
                const updated = [...prev];
                updated[currentLineIndex] =
                    (updated[currentLineIndex] || "") +
                    lines[currentLineIndex][currentCharIndex];
                return updated;
            });
            setCurrentCharIndex((prev) => prev + 1);
        }, speed);

        if (currentCharIndex === lines[currentLineIndex]?.length) {
            clearInterval(interval);
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
        }

        return () => clearInterval(interval);
    }, [currentCharIndex, currentLineIndex, lines, speed]);

    return (
        <>
            {displayedLines.map((line, idx) => (
                <p
                    key={idx}
                    className={`leading-[100px] drop-shadow-2xl transition-opacity duration-300 ${minion.className}`}
                    style={{
                        color: idx === 1 ? "#2CC294" : "#D5EED7",
                        opacity: 1,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {line.split("").map((char, i) => {
                        const isCurrentChar = idx === currentLineIndex && i === currentCharIndex - 1;

                        return (
                            <span key={`${idx}-${i}`} className="relative inline-block">
                                <span className={isCurrentChar ? "neon-char bounce" : ""}>{char}</span>
                                {isCurrentChar && <span className="char-smoke" />}
                            </span>
                        );
                    })}

                    {idx === currentLineIndex && <span className="animate-blink">|</span>}
                </p>
            ))}
        </>
    );
};
