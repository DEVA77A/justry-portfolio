import gsap from 'gsap';

// V4 Zero-Repetition Typography Animation Dictionary

export const revealTypewriter = (targetClass, delay = 0) => {
  return gsap.to(`${targetClass} .split-char`, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.1,
    stagger: 0.05,
    ease: "none",
    delay: delay
  });
};

export const revealCharStaggerElastic = (targetClass, delay = 0) => {
  return gsap.to(`${targetClass} .split-char`, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.5,
    stagger: 0.03,
    ease: "elastic.out(1, 0.4)",
    delay: delay
  });
};

export const revealWordSlideBlur = (targetClass, delay = 0) => {
  // Requires splitType = "words"
  return gsap.to(`${targetClass} .split-word`, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.2,
    stagger: 0.1,
    ease: "power3.out",
    delay: delay
  });
};

export const revealLineByLine = (targetClass, delay = 0) => {
  // Entire lines lifting from deep clip space
  return gsap.fromTo(targetClass, 
    { y: 50, opacity: 0, filter: 'blur(5px)', clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
    {
      y: 0,
      opacity: 1,
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: delay
    }
  );
};
