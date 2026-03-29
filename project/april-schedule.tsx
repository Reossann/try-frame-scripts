import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const AprilScheduleScene = () => {
  const progress = useVariable(0)
  const subtitleHeight = "20%"
  const plans = [
    { date: "4/6", text: "新歓説明会・体験参加" },
    { date: "4/13", text: "ハンズオン勉強会" },
    { date: "4/20", text: "ミニハッカソン" },
    { date: "4/27", text: "交流会・プロジェクト相談会" },
  ]

  useAnimation(async (context) => {
    await context.move(progress).to(1, seconds(10), BEZIER_SMOOTH)
  }, [])

  const currentProgress = progress.use()

  const revealAt = (index: number) => {
    const start = 0.18 + index * 0.16
    const end = start + 0.22
    if (currentProgress <= start) return 0
    if (currentProgress >= end) return 1
    return (currentProgress - start) / (end - start)
  }

  return (
    <>
      <FillFrame
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          position: "relative",
          background: "radial-gradient(circle at top, #2b3446 0%, #182030 56%, #0a111b 100%)",
        }}
      >
        <div
          style={{
            marginTop: "34px",
            marginLeft: "40px",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          <DrawText
            text="四月のサークル予定"
            fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
            fillColor="#ffffff"
            durationFrames={42}
            delayFrames={0}
          />

          <div
            style={{
              marginTop: "28px",
              width: "980px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {plans.map((plan, index) => {
              const opacity = revealAt(index)
              const translateX = (1 - opacity) * 24

              return (
                <div
                  key={plan.date}
                  style={{
                    opacity,
                    transform: `translateX(${translateX}px)`,
                    display: "flex",
                    alignItems: "center",
                    minHeight: "102px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.22)",
                    background: "linear-gradient(120deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04))",
                    boxShadow: "0 10px 26px rgba(0, 0, 0, 0.25)",
                    padding: "0 24px",
                  }}
                >
                  <div
                    style={{
                      width: "170px",
                      fontSize: "46px",
                      color: "#9dd6ff",
                      textShadow: "0 3px 12px rgba(0, 0, 0, 0.28)",
                    }}
                  >
                    {plan.date}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: "44px",
                      color: "#f1f8ff",
                      letterSpacing: "0.01em",
                      textShadow: "0 3px 12px rgba(0, 0, 0, 0.28)",
                    }}
                  >
                    {plan.text}
                  </div>
                </div>
              )
            })}
          </div>
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
  )
}
