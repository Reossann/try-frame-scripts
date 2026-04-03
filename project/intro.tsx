import { useAnimation, useVariable } from "../src/lib/animation";
import { BEZIER_SMOOTH } from "../src/lib/animation/functions";
import { seconds } from "../src/lib/frame";
import { FillFrame } from "../src/lib/layout/fill-frame";
import { AnimatedCharacter } from "./props";

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
        background:
          "radial-gradient(circle at 24% 18%, #313644 0%, #181a24 50%, #0a0c12 100%)",
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
          <div style={{ position: "absolute", opacity: timeOpacity.use() }}>
            時間？
          </div>
          <div style={{ position: "absolute", opacity: studyOpacity.use() }}>
            勉強？
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            opacity: noOpacity.use(),
            transform: `scale(${noScale.use()})`,
            fontSize: "236px",
            color: "#ff4c4c",
            lineHeight: 1,
            textShadow:
              "0 0 28px rgba(255, 64, 64, 0.68), 0 8px 20px rgba(0, 0, 0, 0.45)",
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
        background:
          "linear-gradient(145deg, #09131a 0%, #0f1f28 60%, #060a0d 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "94px",
          color: "rgba(226, 255, 255, 0.82)",
          letterSpacing: "0.35em",
          fontSize: "28px",
        }}
      >
        KEYWORD
      </div>
      <div
        style={{
          fontSize: "170px",
          fontWeight: "bold",
          color: "#68fff3",
          textShadow: "0 0 26px rgba(56, 255, 240, 0.5)",
        }}
      >
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
        background:
          "radial-gradient(circle at 70% 25%, #3a2c45 0%, #1d1326 54%, #0a0a11 100%)",
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
            textShadow:
              "0 0 26px rgba(255, 216, 128, 0.48), 0 8px 20px rgba(0, 0, 0, 0.44)",
          }}
        >
          その場こそが
        </div>
      </div>
    </FillFrame>
  );
};

export const Intro4Scene = () => {
  const introOpacity = useVariable(0);
  const mergeProgress = useVariable(0);
  const punchScale = useVariable(1);

  useAnimation(async (context) => {
    await context.move(introOpacity).to(1, seconds(0.32), BEZIER_SMOOTH);
    await context.sleep(seconds(2));
    await context.move(mergeProgress).to(1, seconds(3.5), BEZIER_SMOOTH);
    await context.sleep(seconds(1));
    await context.move(punchScale).to(1.2, seconds(0.12), BEZIER_SMOOTH);
    await context.move(punchScale).to(1, seconds(0.16), BEZIER_SMOOTH);
  }, []);

  const titleAlpha = introOpacity.use();
  const merge = mergeProgress.use();
  const accent = punchScale.use();
  const collapse = 1 - merge;
  const targetScale = 1 + merge * 0.28;
  const baseWidth = 1;

  return (
    <FillFrame
      style={{
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #2a1f47 0%, #1a1a3e 38%, #0f1a2e 70%, #050810 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          fontSize: "96px",
          fontWeight: "bold",
          color: "#f5d547",
          textShadow:
            "0 0 32px rgba(245, 213, 71, 0.52), 0 12px 28px rgba(0, 0, 0, 0.58), inset 0 -1px 2px rgba(0, 0, 0, 0.3)",
          letterSpacing: "0.02em",
          opacity: titleAlpha,
        }}
      >
        {"情報技術メディア研究会".split("").map((char, index) => {
          const isTarget = char === "技" || char === "研";
          const widthFactor = isTarget ? baseWidth : Math.max(0, collapse) * baseWidth;
          const charOpacity = isTarget ? 1 : collapse;
          const extraRightMargin = isTarget && char === "技" ? `${0.14 + 0.08 * merge}em` : "0";

          return (
            <span
              key={`${char}-${index}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: `${widthFactor}em`,
                minWidth: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                opacity: charOpacity,
                transform: isTarget ? `scale(${targetScale * accent})` : "scale(1)",
                transformOrigin: "center center",
                marginRight: extraRightMargin,
              }}
            >
              {char}
            </span>
          );
        })}
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
        background:
          "radial-gradient(circle at center, #172033 0%, #0a101e 56%, #04070d 100%)",
      }}
    >
      <img
        src="assets/geeken_logo_white_trimmed.png"
        alt="geeken logo"
        style={{
          width: "500px",
          height: "500px",
          objectFit: "contain",
          filter: "drop-shadow(0 16px 34px rgba(0, 0, 0, 0.45))",
        }}
      />
    </FillFrame>
  );
};
