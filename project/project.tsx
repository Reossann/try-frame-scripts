import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { Clip } from "../src/lib/clip"
import { seconds } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"
import { Project, type ProjectSettings } from "../src/lib/project"
import { TimeLine } from "../src/lib/timeline"

export const PROJECT_SETTINGS: ProjectSettings = {
  name: "framescript-template",
  width: 1920,
  height: 1080,
  fps: 60,
}



const HelloScene = () => {
  const progress = useVariable(0)
  const color = useVariable("#FFFFFF")

  useAnimation(async (context) => {
    await context.parallel([
      context.move(progress).to(1, seconds(3), BEZIER_SMOOTH),
      context.move(color).to("#75a9bd", seconds(3), BEZIER_SMOOTH),
    ])
    await context.sleep(seconds(1))
    await context.move(progress).to(0, seconds(3), BEZIER_SMOOTH)
  }, [])

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center" }}>
      <DrawText
        text="bay"
        fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
        strokeWidth={2}
        progress={progress}
        strokeColor={color.use()}
        fillColor={color.use()}
      />
    </FillFrame>
  )
}

const AnimatedCharacter = ({ char, delayIndex }: { char: string, delayIndex: number }) => {
  // この文字専用の変数（1つの数値のみを保持）
  const opacity = useVariable(0);
  const positionY = useVariable(20);

  useAnimation(async (ctx) => {
    // 順番（delayIndex）に応じて、動き出す前に少し待機する（時差を作る）
    await ctx.sleep(seconds(delayIndex * 0.1));

    // アニメーションの指示
    const fade = ctx.move(opacity).to(1, seconds(0.3));
    const moveUp = ctx.move(positionY).to(0, seconds(0.3));
    
    // 同時に動かす場合は、Promise.allではなく ctx.parallel を使うのがFrameScript流です！
    await ctx.parallel([fade, moveUp]);
  },[]);
return (
    <span style={{
      opacity: opacity.use(),
      transform: `translateY(${positionY.use()}px)`,
      display: 'inline-block',
      width: char === ' ' ? '20px' : 'auto'
    }}>
      {char}
    </span>
  );
};

export const TypewriterScene = () => {
  const textToDisplay = "一文字ずつ表示したい";
  const characters = textToDisplay.split("");

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      fontSize: '180px', color: '#00d4ff', fontWeight: 'bold'
    }}>
      <div style={{ display: 'flex' }}>
        {/* 文字の配列を展開し、先ほど作った1文字コンポーネントを並べる */}
        {characters.map((char, index) => (
          <AnimatedCharacter 
            key={index} 
            char={char} 
            delayIndex={index} // 何番目の文字かを渡す
          />
        ))}
      </div>
    </div>
  );
};

const EmphasisLineScene = () => {
  const underlineProgress = useVariable(0);

  useAnimation(async (context) => {
    await context.sleep(seconds(1)); // テキスト表示後に待機
    await context.move(underlineProgress).to(1, seconds(2), BEZIER_SMOOTH); // アンダーラインが左から右へアニメーション
    await context.sleep(seconds(1)); // 完了後に待機
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
      <div style={{ position: "relative", fontSize: "120px", color: "#000000", fontWeight: "bold" }}>
        <DrawText
          text="たにし"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#000000"
        />
        {/* アンダーライン */}
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            height: "8px",
            backgroundColor: "#ff0000",
            width: `${underlineProgress.use() * 100}%`, // プログレスに応じて幅が変わる
            transition: "width 0.1s ease-out", // スムーズなアニメーション
          }}
        />
      </div>
    </FillFrame>
  );
};



export const PROJECT = () => {
  return (
    <Project>
      <TimeLine>
        <Clip label="Hello">
          <HelloScene />
        </Clip>
        <Clip label="otamesi">
          <TypewriterScene />
        </Clip>
        <Clip label="Emphasis Line">
          <EmphasisLineScene />
        </Clip>
      </TimeLine>
    </Project>
    
    
  )
}
