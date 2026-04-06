import { useAnimation, useVariable } from "../src/lib/animation";
import { DrawText } from "../src/lib/animation/effect/draw-text";
import { BEZIER_SMOOTH } from "../src/lib/animation/functions";
import { seconds } from "../src/lib/frame";
import { FillFrame } from "../src/lib/layout/fill-frame";

export const MembersScene = () => {
  const progress = useVariable(0);
  const currentProgress = progress.use();
  const cohortData = [
    { label: "2年生", count: 47, color: "#8bd3ff" },
    { label: "3年生", count: 16, color: "#c2e7ff" },
    { label: "4年生以上", count: 9, color: "#e3f6ff" },
  ];
  const maxCount = Math.max(...cohortData.map((item) => item.count));

  useAnimation(async (context) => {
    await context.move(progress).to(1, seconds(7), BEZIER_SMOOTH);
  }, []);

  return (
    <>
      <FillFrame
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
        }}
      >
        <img
          src="assets/geeken_logo_white_trimmed.png"
          alt="geeken logo"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "230px",
            height: "230px",
            objectFit: "contain",
            backgroundColor: "transparent",
            borderRadius: "0px",
            boxShadow: "none",
            border: "none",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            width: "1420px",
            fontSize: "60px",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          <DrawText
            text="サークルメンバーの構成"
            fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
            fillColor="#ffffff"
          />

          <div
            style={{
              marginTop: "30px",
              width: "1360px",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
              boxShadow: "0 16px 30px rgba(0, 0, 0, 0.28)",
              padding: "28px 34px",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            {cohortData.map((item) => {
              const animatedRatio = (item.count / maxCount) * currentProgress;
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: "18px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "72px",
                      borderRadius: "14px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(6, 16, 28, 0.38)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      padding: "0 8px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: `${animatedRatio * 100}%`,
                        minWidth: currentProgress > 0 ? "8px" : "0px",
                        height: "52px",
                        borderRadius: "11px",
                        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.25), ${item.color})`,
                        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
                        transition: "width 180ms linear",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: "280px",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      color: "#ffffff",
                      borderLeft: "2px solid rgba(255, 255, 255, 0.55)",
                      paddingLeft: "18px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "44px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                    <span style={{ fontSize: "34px", color: "#d3ecff" }}>
                      {item.count}人
                    </span>
                  </div>
                </div>
              );
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
          height: "20%",
          display: "flex",
          alignItems: "center",
          margin: "0",
          padding: "0 40px",
          boxSizing: "border-box",
          background: "rgba(7, 12, 20, 0.68)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 1,
          fontSize: "50px",
          fontWeight: "bold",
          lineHeight: 1.3,
          letterSpacing: "0.01em",
          color: "#e3f0ff",
          textShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        公認サークルになってまだ半年たってないくらいだけど、
        <br />
        こんなにたくさんのメンバーがいるよ！！（2026年4月現在）
      </div>
    </>
  );
};
