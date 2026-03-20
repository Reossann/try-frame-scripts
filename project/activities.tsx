import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const ActivitiesScene = () => {
  const progress = useVariable(0);

  useAnimation(async (context) => {
    await context.move(progress).to(1, seconds(10), BEZIER_SMOOTH);
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#2a2a2a" }}>
      <div style={{ fontSize: "60px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
        <DrawText
          text="活動実績と活動内容"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
        />
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li style={{ opacity: progress.use() > 0.2 ? 1 : 0, transition: "opacity 0.5s" }}>・ハッカソン</li>
          <li style={{ opacity: progress.use() > 0.4 ? 1 : 0, transition: "opacity 0.5s" }}>・ゼミ</li>
          <li style={{ opacity: progress.use() > 0.6 ? 1 : 0, transition: "opacity 0.5s" }}>・テスト勉強会</li>
          <li style={{ opacity: progress.use() > 0.8 ? 1 : 0, transition: "opacity 0.5s" }}>・プロジェクト</li>
          <li style={{ opacity: progress.use() > 1 ? 1 : 0, transition: "opacity 0.5s" }}>・外部イベント</li>
        </ul>
      </div>
    </FillFrame>
  );
};
