import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const BenefitsScene = () => {
  const progress = useVariable(0);
  const titleScale = useVariable(1);
  const subtitleHeight = "20%";
  const items = ["人脈の拡大", "最新情報の共有", "実践プロジェクト参加"];
  const itemDescriptions = ["人脈の拡大の説明", "最新情報の共有の説明", "実践プロジェクト参加の説明"];
  const titleDrawFrames = 42;
  const sceneDuration = seconds(26.6);
  const firstItemDelay = seconds(1);
  const itemInterval = seconds(1);
  const itemFadeDuration = seconds(0.2);
  const emphasisStartDelay = seconds(0.4);
  const emphasisFadeInDuration = seconds(1);
  const emphasisHoldDuration = seconds(5);
  const emphasisFadeOutDuration = seconds(1);
  const emphasisItemDuration = emphasisFadeInDuration + emphasisHoldDuration + emphasisFadeOutDuration;

  useAnimation(async (context) => {
    await context.move(progress).to(1, sceneDuration);
  }, []);

  useAnimation(async (context) => {
    await context.move(titleScale).to(1.12, seconds(0.35), BEZIER_SMOOTH);
    await context.move(titleScale).to(1, seconds(0.35), BEZIER_SMOOTH);
  }, []);

  const currentProgress = progress.use();
  const elapsedFrames = currentProgress * sceneDuration;
  const allItemsShownAt = firstItemDelay + (items.length - 1) * itemInterval + itemFadeDuration;
  const emphasisStart = allItemsShownAt + emphasisStartDelay;

  const revealAt = (index: number) => {
    const appearAt = firstItemDelay + index * itemInterval;
    const value = (elapsedFrames - appearAt) / itemFadeDuration;
    return Math.max(0, Math.min(1, value));
  };

  const getEmphasisLevel = (index: number) => {
    const emphasisElapsed = elapsedFrames - (emphasisStart + index * emphasisItemDuration);
    if (emphasisElapsed < 0 || emphasisElapsed >= emphasisItemDuration) {
      return 0;
    }
    if (emphasisElapsed < emphasisFadeInDuration) {
      return emphasisElapsed / emphasisFadeInDuration;
    }
    if (emphasisElapsed < emphasisFadeInDuration + emphasisHoldDuration) {
      return 1;
    }
    const fadeOutElapsed = emphasisElapsed - (emphasisFadeInDuration + emphasisHoldDuration);
    return 1 - fadeOutElapsed / emphasisFadeOutDuration;
  };

  const emphasisLevels = items.map((_, index) => getEmphasisLevel(index));
  let activeDescriptionIndex = -1;
  let activeDescriptionOpacity = 0;
  for (let index = 0; index < emphasisLevels.length; index += 1) {
    if (emphasisLevels[index] > activeDescriptionOpacity) {
      activeDescriptionOpacity = emphasisLevels[index];
      activeDescriptionIndex = index;
    }
  }
  const activeDescriptionText = activeDescriptionIndex >= 0 ? itemDescriptions[activeDescriptionIndex] : "";

  return (
    <>
      <FillFrame
        style={{
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          position: "relative",
          margin: "0",
          padding: "0",
          background: "radial-gradient(circle at top, #3b3b3b 0%, #202020 55%, #161616 100%)",
        }}
      >
      <img
        src="assets/Gemini_Generated_Image_xncn7xncn7xncn7x.png"
        alt="benefits visual"
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          width: "320px",
          height: "320px",
          objectFit: "contain",
          backgroundColor: "rgba(0, 0, 0, 0.22)",
          borderRadius: "16px",
          boxShadow: "0 16px 34px rgba(0, 0, 0, 0.42)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "620px",
          marginTop: "8px",
          marginLeft: "24px",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "left",
          transform: `scale(${titleScale.use()})`,
        }}
      >
        <DrawText
          text="入会で得られる恩恵"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
          durationFrames={titleDrawFrames}
          delayFrames={0}
        />
        <ul
          style={{
            listStyle: "none",
            padding: "10px 0",
            marginTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.24)",
            width: "540px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
            borderRadius: "14px",
            overflow: "visible",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
          }}
        >
          {items.map((item, index) => {
            const opacity = revealAt(index);
            const translateX = (1 - opacity) * 28;
            const emphasisLevel = getEmphasisLevel(index);
            const itemFontSize = index === items.length - 1 ? "39px" : "44px";

            const itemScale = 1 + emphasisLevel * 0.16;
            const itemShadow = 10 + emphasisLevel * 8;
            const itemGlow = 0.08 + emphasisLevel * 0.14;

            return (
              <li
                key={item}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  minHeight: "126px",
                  padding: "12px 28px 12px 20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.22)",
                  background: `linear-gradient(90deg, rgba(255, 255, 255, ${itemGlow}), rgba(255, 255, 255, 0))`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  transition: "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: itemFontSize,
                    lineHeight: 1.3,
                    letterSpacing: "0.015em",
                    textShadow: `0 2px ${itemShadow}px rgba(0, 0, 0, 0.28)`,
                    transform: `scale(${itemScale})`,
                    transformOrigin: "left center",
                    width: "100%",
                  }}
                >
                  {item}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
        <div
          style={{
            position: "absolute",
            left: "760px",
            top: "470px",
            width: "760px",
            opacity: activeDescriptionOpacity,
            transform: `translateY(${(1 - activeDescriptionOpacity) * 10}px)`,
            fontSize: "48px",
            fontWeight: "bold",
            lineHeight: 1.3,
            letterSpacing: "0.01em",
            color: "#d7ecff",
            textShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
            transition: "opacity 120ms linear, transform 120ms linear",
            pointerEvents: "none",
          }}
        >
          {activeDescriptionText}
        </div>
      </FillFrame>
      <div
        style={{
          position: "absolute",
          left: "0px",
          right: "0px",
          bottom: "0px",
          height: subtitleHeight,
          display: "flex",
          alignItems: "center",
          margin: "0",
          padding: "0 40px",
          boxSizing: "border-box",
          background: "rgba(7, 12, 20, 0.68)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 1,
          fontSize: "30px",
          fontWeight: "bold",
          lineHeight: 1.3,
          letterSpacing: "0.01em",
          color: "#e3f0ff",
          textShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        （音声の文字起こしをここに表示）
      </div>
    </>
  );
};
