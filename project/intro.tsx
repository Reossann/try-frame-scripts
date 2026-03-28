import { useAnimation, useVariable } from "../src/lib/animation"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"
import { AnimatedCharacter } from "./props"

export const Intro1Scene = () => {
  const timeOpacity = useVariable(0);
  const studyOpacity = useVariable(0);
  const noOpacity = useVariable(0);
  const noScale = useVariable(1.28);

  useAnimation(async (context) => {
    await context.sleep(seconds(0.2));

    await context.move(timeOpacity).to(1, seconds(0.25), BEZIER_SMOOTH);
    await context.sleep(seconds(0.22));
    await context.move(timeOpacity).to(0, seconds(0.2), BEZIER_SMOOTH);

    await context.move(studyOpacity).to(1, seconds(0.25), BEZIER_SMOOTH);
    await context.sleep(seconds(0.22));
    await context.move(studyOpacity).to(0, seconds(0.2), BEZIER_SMOOTH);

    await context.parallel([
      context.move(noOpacity).to(1, seconds(0.22), BEZIER_SMOOTH),
      context.move(noScale).to(1, seconds(0.34), BEZIER_SMOOTH),
    ]);
  }, []);

  return (
    <FillFrame
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 24% 18%, #313644 0%, #181a24 50%, #0a0c12 100%)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#ffffff",
          fontFamily: "Noto Serif CJK JP",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            fontSize: "126px",
            textAlign: "center",
            letterSpacing: "0.02em",
            lineHeight: 1.08,
            textShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
          }}
        >
          大学生活に必要なものは？
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "180px",
            marginTop: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "96px",
            color: "#cfe8ff",
            textShadow: "0 4px 18px rgba(46, 146, 255, 0.35)",
          }}
        >
          <div style={{ position: "absolute", opacity: timeOpacity.use() }}>時間？</div>
          <div style={{ position: "absolute", opacity: studyOpacity.use() }}>勉強？</div>
        </div>

        <div
          style={{
            position: "absolute",
            opacity: noOpacity.use(),
            transform: `scale(${noScale.use()})`,
            fontSize: "236px",
            color: "#ff4c4c",
            lineHeight: 1,
            textShadow: "0 0 28px rgba(255, 64, 64, 0.68), 0 8px 20px rgba(0, 0, 0, 0.45)",
            pointerEvents: "none",
          }}
        >
          否！！
        </div>
      </div>
    </FillFrame>
  );
};

export const Intro2Scene = () => {
  return (
    <FillFrame
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #09131a 0%, #0f1f28 60%, #060a0d 100%)",
      }}
    >
      <div style={{ position: "absolute", top: "94px", color: "rgba(226, 255, 255, 0.82)", letterSpacing: "0.35em", fontSize: "28px" }}>
        KEYWORD
      </div>
      <div style={{ fontSize: "170px", fontWeight: "bold", color: "#68fff3", textShadow: "0 0 26px rgba(56, 255, 240, 0.5)" }}>
        {"情報".split("").map((char, index) => (
          <AnimatedCharacter key={index} char={char} delayIndex={index} />
        ))}
      </div>
    </FillFrame>
  );
};

export const Intro3Scene = () => {
  const firstOpacity = useVariable(0);
  const secondOpacity = useVariable(0);
  const secondScale = useVariable(1.2);

  useAnimation(async (context) => {
    await context.sleep(seconds(0.1));

    await context.move(firstOpacity).to(1, seconds(0.36), BEZIER_SMOOTH);
    await context.sleep(seconds(1));
    await context.move(firstOpacity).to(0, seconds(0.24), BEZIER_SMOOTH);

    await context.parallel([
      context.move(secondOpacity).to(1, seconds(0.5), BEZIER_SMOOTH),
      context.move(secondScale).to(1, seconds(0.42), BEZIER_SMOOTH),
    ]);
  }, []);

  return (
    <FillFrame
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 70% 25%, #3a2c45 0%, #1d1326 54%, #0a0a11 100%)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Noto Serif CJK JP",
          fontWeight: "bold",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            opacity: firstOpacity.use(),
            fontSize: "64px",
            textAlign: "center",
            letterSpacing: "0.01em",
            textShadow: "0 4px 18px rgba(0, 0, 0, 0.38)",
          }}
        >
          必要なのは、情報を得る環境だ。
        </div>

        <div
          style={{
            position: "absolute",
            opacity: secondOpacity.use(),
            transform: `scale(${secondScale.use()})`,
            fontSize: "148px",
            lineHeight: 1.05,
            textAlign: "center",
            color: "#ffe7b0",
            textShadow: "0 0 26px rgba(255, 216, 128, 0.48), 0 8px 20px rgba(0, 0, 0, 0.44)",
          }}
        >
          その場こそが
        </div>
      </div>
    </FillFrame>
  );
};

const zoomInKeyframes = `
@keyframes zoomInMajestic {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

export const Intro4Scene = () => {
  return (
    <FillFrame
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #2a1f47 0%, #1a1a3e 38%, #0f1a2e 70%, #050810 100%)",
      }}
    >
      <style>{zoomInKeyframes}</style>
      <div
        style={{
          fontSize: "102px",
          fontWeight: "bold",
          color: "#f5d547",
          textShadow: "0 0 32px rgba(245, 213, 71, 0.52), 0 12px 28px rgba(0, 0, 0, 0.58), inset 0 -1px 2px rgba(0, 0, 0, 0.3)",
          letterSpacing: "0.04em",
        }}
      >
        {"情報技術メディア研究会".split("").map((char, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              animation: `zoomInMajestic 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.12}s 1 forwards`,
              width: char === " " ? "20px" : "auto",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </FillFrame>
  );
};

export const Intro5Scene = () => {
  const sceneOpacity = useVariable(1);

  useAnimation(async (context) => {
    await context.sleep(seconds(1.6));
    await context.move(sceneOpacity).to(0, seconds(0.6), BEZIER_SMOOTH);
  }, []);

  return (
    <FillFrame
      style={{
        opacity: sceneOpacity.use(),
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, #172033 0%, #0a101e 56%, #04070d 100%)",
      }}
    >
      <img
        src="assets/Gemini_Generated_Image_xncn7xncn7xncn7x.png"
        alt="circle icon"
        style={{
          width: "760px",
          height: "760px",
          objectFit: "contain",
          filter: "drop-shadow(0 16px 34px rgba(0, 0, 0, 0.45))",
        }}
      />
    </FillFrame>
  );
};

