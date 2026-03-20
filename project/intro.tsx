import { FillFrame } from "../src/lib/layout/fill-frame"
import { TypewriterText, AnimatedCharacter } from "./props"

export const Intro1Scene = () => {
  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "flex-start", backgroundColor: "#1a1a1a", paddingLeft: "40px" }}>
      <TypewriterText text="大学生に一番大事なもの。それは...." fontSize="48px" color="#ffffff" delay={0} textAlign="left" writingMode="vertical-rl" />
    </FillFrame>
  );
};

export const Intro2Scene = () => {
  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <div style={{ fontSize: "140px", fontWeight: "bold", color: "#00ffea" }}>
        {"情報".split("").map((char, index) => (
          <AnimatedCharacter key={index} char={char} delayIndex={index} />
        ))}
      </div>
    </FillFrame>
  );
};

export const Intro3Scene = () => {
  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <TypewriterText text="そんな情報を得ることができ、かつ自分のやりたいこともできる。それが、、、" fontSize="48px" color="#ffffff" delay={0} textAlign="center" />
    </FillFrame>
  );
};

export const Intro4Scene = () => {
  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <div style={{ fontSize: "88px", fontWeight: "bold", color: "#00ffea" }}>
        {"情報技術メディア研究会".split("").map((char, index) => (
          <AnimatedCharacter key={index} char={char} delayIndex={index} />
        ))}
      </div>
    </FillFrame>
  );
};
