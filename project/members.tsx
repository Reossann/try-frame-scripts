import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const MembersScene = () => {
  const progress = useVariable(0);

  useAnimation(async (context) => {
    await context.move(progress).to(1, seconds(10), BEZIER_SMOOTH);
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <div style={{ fontSize: "60px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
        <DrawText
          text="サークルメンバーの構成"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
        />
        <div style={{ marginTop: "20px", fontSize: "40px" }}>
          [何年生n人 - 例: 1年生10人, 2年生5人]
        </div>
        {/* 簡易グラフ風 */}
        <div style={{
          width: "400px",
          height: "200px",
          backgroundColor: "#444",
          marginTop: "20px",
          display: "flex",
          alignItems: "end",
          justifyContent: "space-around"
        }}>
          <div style={{
            width: "50px",
            height: `${progress.use() * 150}px`,
            backgroundColor: "#ffffff",
            transition: "height 0.5s"
          }}></div>
          <div style={{
            width: "50px",
            height: `${progress.use() * 100}px`,
            backgroundColor: "#ffffff",
            transition: "height 0.5s"
          }}></div>
        </div>
      </div>
    </FillFrame>
  );
};
