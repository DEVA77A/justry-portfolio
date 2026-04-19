import React from 'react';

export default function SplitText({ text, className = "", type = "chars", filterBlur = false }) {
  if (type === "words") {
    return (
      <span style={{ display: 'inline-block' }} className={className}>
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'pre', paddingRight: '0.2em' }}>
            <span className="split-word" style={{ display: 'inline-block', transform: 'translateY(110%)', opacity: 1, filter: filterBlur ? 'blur(10px)' : 'none' }}>
              {word}
            </span>
          </span>
        ))}
      </span>
    );
  }

  // Split both words AND chars to keep wrapping intact
  return (
    <span style={{ display: 'inline-block' }} className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'pre' }}>
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} style={{ display: 'inline-block', overflow: 'hidden' }}>
              <span className="split-char" style={{ display: 'inline-block', transform: 'translateY(110%)', opacity: 0, filter: filterBlur ? 'blur(10px)' : 'none' }}>
                {char}
              </span>
            </span>
          ))}
          {wordIndex < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
