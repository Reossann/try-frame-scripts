import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"

export const ClosingScene = () => {
  const opacity = useVariable(0);

  useAnimation(async (context) => {
    await context.sleep(seconds(1));
    await context.move(opacity).to(1, seconds(2), BEZIER_SMOOTH);
    await context.sleep(seconds(7));
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <div style={{
        opacity: opacity.use(),
        fontSize: "80px",
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        <DrawText
          text="Welcome to my circle"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
        />
      </div>
    </FillFrame>
  );
};
