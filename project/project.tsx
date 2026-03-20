import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { Clip, ClipSequence } from "../src/lib/clip"
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

// 新入生歓迎会動画のシーン

const IntroScene = () => {
  const opacity = useVariable(0);
  const scale = useVariable(0.5);

  useAnimation(async (context) => {
    await context.parallel([
      context.move(opacity).to(1, seconds(2), BEZIER_SMOOTH),
      context.move(scale).to(1, seconds(2), BEZIER_SMOOTH),
    ]);
    await context.sleep(seconds(8));
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <div style={{
        opacity: opacity.use(),
        transform: `scale(${scale.use()})`,
        fontSize: "100px",
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        <DrawText
          text="[サークル名] 新入生歓迎会"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
        />
      </div>
    </FillFrame>
  );
};

const ActivitiesScene = () => {
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

const MembersScene = () => {
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

const BenefitsScene = () => {
  const progress = useVariable(0);

  useAnimation(async (context) => {
    await context.move(progress).to(1, seconds(10), BEZIER_SMOOTH);
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#2a2a2a" }}>
      <div style={{ fontSize: "60px", color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
        <DrawText
          text="入会で得られる恩恵"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
        />
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li style={{ opacity: progress.use() > 0.3 ? 1 : 0, transition: "opacity 0.5s" }}>・人にフォーカスした魅力</li>
          <li style={{ opacity: progress.use() > 0.6 ? 1 : 0, transition: "opacity 0.5s" }}>・Discordの情報共有</li>
          <li style={{ opacity: progress.use() > 0.9 ? 1 : 0, transition: "opacity 0.5s" }}>・プロジェクト参加</li>
        </ul>
      </div>
    </FillFrame>
  );
};

const ClosingScene = () => {
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
          text="一緒にプログラミングを楽しみましょう！"
          fontUrl="assets/NotoSerifCJKJP-Medium.ttf"
          fillColor="#ffffff"
        />
      </div>
    </FillFrame>
  );
};



export const PROJECT = () => {
  return (
    <Project>
      <TimeLine>
        <ClipSequence>
          <Clip label="Intro">
            <IntroScene />
          </Clip>
          <Clip label="Activities">
            <ActivitiesScene />
          </Clip>
          <Clip label="Members">
            <MembersScene />
          </Clip>
          <Clip label="Benefits">
            <BenefitsScene />
          </Clip>
          <Clip label="Closing">
            <ClosingScene />
          </Clip>
        </ClipSequence>
      </TimeLine>
    </Project>
  )
}
