import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const BenefitsScene = () => {
  const progress = useVariable(0);
  const titleScale = useVariable(1);
  const items = ["人脈の拡大", "最新情報の共有", "実践プロジェクト参加"];
  const titleDrawFrames = 85;
  const sceneDuration = seconds(10);
  const revealDuration = seconds(2.4);
  const detailRevealStart = titleDrawFrames / sceneDuration;
  const focusStart = 0.34;
  const focusPerItem = (1 - focusStart) / items.length;

  useAnimation(async (context) => {
    await context.move(progress).to(1, sceneDuration, BEZIER_SMOOTH);
  }, []);

  useAnimation(async (context) => {
    await context.move(titleScale).to(1.12, seconds(0.35), BEZIER_SMOOTH);
    await context.move(titleScale).to(1, seconds(0.35), BEZIER_SMOOTH);
  }, []);

  const currentProgress = progress.use();

  const revealAt = (index: number) => {
    const start = detailRevealStart + index * 0.05;
    const value = (currentProgress - start) * (sceneDuration / revealDuration);
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
          marginTop: "86px",
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
            marginTop: "32px",
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
            const slotProgress = (currentProgress - focusStart) / focusPerItem;
            const localSlot = slotProgress - index;
            const focusRamp = 0.14;

            let focusLevel = 0;
            if (localSlot >= 0 && localSlot < 1) {
              if (localSlot < focusRamp) {
                focusLevel = localSlot / focusRamp;
              } else if (localSlot > 1 - focusRamp) {
                focusLevel = (1 - localSlot) / focusRamp;
              } else {
                focusLevel = 1;
              }
            }

            const itemScale = 1 + focusLevel * 0.32;
            const itemShadow = 10 + focusLevel * 18;
            const itemGlow = 0.08 + focusLevel * 0.18;

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
                    fontSize: "38px",
                    lineHeight: 1.3,
                    letterSpacing: "0.015em",
                    textShadow: `0 2px ${itemShadow}px rgba(0, 0, 0, 0.28)`,
                    transform: `scale(${itemScale})`,
                    transformOrigin: "left center",
                    width: "100%",
                    whiteSpace: "nowrap",
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
