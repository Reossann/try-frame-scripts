import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const ActivitiesScene = () => {
  const progress = useVariable(0);
  const titleScale = useVariable(1);
  const items = ["ハッカソン", "ゼミ", "テスト勉強会", "プロジェクト", "外部イベント"];
  const titleDrawFrames = 42;
  const sceneDuration = seconds(50);
  const firstItemDelay = seconds(0.2);
  const itemInterval = seconds(1);
  const itemFadeDuration = seconds(0.2);
  const emphasisStartDelay = seconds(0.4);
  const emphasisItemDuration = seconds(10);

  useAnimation(async (context) => {
    await context.move(progress).to(1, sceneDuration, BEZIER_SMOOTH);
  }, []);

  useAnimation(async (context) => {
    await context.move(titleScale).to(1.12, seconds(0.35), BEZIER_SMOOTH);
    await context.move(titleScale).to(1, seconds(0.35), BEZIER_SMOOTH);
  }, []);

  const currentProgress = progress.use();
  const elapsedSeconds = currentProgress * sceneDuration;
  const allItemsShownAt = firstItemDelay + (items.length - 1) * itemInterval + itemFadeDuration;
  const emphasisStart = allItemsShownAt + emphasisStartDelay;

  const revealAt = (index: number) => {
    const appearAt = firstItemDelay + index * itemInterval;
    const value = (elapsedSeconds - appearAt) / itemFadeDuration;
    return Math.max(0, Math.min(1, value));
  };

  return (
    <FillFrame
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        background: "radial-gradient(circle at top, #3b3b3b 0%, #202020 55%, #161616 100%)",
      }}
    >
      <img
        src="assets/Gemini_Generated_Image_xncn7xncn7xncn7x.png"
        alt="activities visual"
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
          width: "560px",
          marginTop: "86px",
          marginLeft: "24px",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "left",
          transform: `scale(${titleScale.use()})`,
        }}
      >
        <DrawText
          text="活動実績と活動内容"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
          durationFrames={titleDrawFrames}
          delayFrames={0}
        />
        <ul
          style={{
            listStyle: "none",
            padding: "10px 0",
            marginTop: "32px",
            borderTop: "1px solid rgba(255, 255, 255, 0.24)",
            width: "470px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
            borderRadius: "14px",
            overflow: "visible",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
          }}
        >
          {items.map((item, index) => {
            const opacity = revealAt(index);
            const translateX = (1 - opacity) * 28;
            const emphasisLocal = (elapsedSeconds - emphasisStart) / emphasisItemDuration - index;
            const emphasisRamp = 0.22;

            let emphasisLevel = 0;
            if (emphasisLocal >= 0 && emphasisLocal < 1) {
              if (emphasisLocal < emphasisRamp) {
                emphasisLevel = emphasisLocal / emphasisRamp;
              } else if (emphasisLocal > 1 - emphasisRamp) {
                emphasisLevel = (1 - emphasisLocal) / emphasisRamp;
              } else {
                emphasisLevel = 1;
              }
            }

            const itemShadow = 10 + emphasisLevel * 8;
            const itemGlow = 0.08 + emphasisLevel * 0.14;
            const itemScale = 1 + emphasisLevel * 0.16;

            return (
              <li
                key={item}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  minHeight: "116px",
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
                    fontSize: "44px",
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
    </FillFrame>
  );
};
