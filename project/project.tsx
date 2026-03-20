import { useAnimation, useVariable } from "../src/lib/animation"
import { DrawText } from "../src/lib/animation/effect/draw-text"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { Clip, ClipSequence } from "../src/lib/clip"
import { Sound } from "../src/lib/sound/sound"
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



const TypewriterText = ({ text, fontSize = "48px", color = "#ffffff", delay = 0 }: { text: string; fontSize?: string; color?: string; delay?: number }) => {
  const progress = useVariable(0);

  useAnimation(async (context) => {
    await context.sleep(seconds(delay));
    await context.move(progress).to(1, seconds(text.length * 0.1), BEZIER_SMOOTH);
  }, [text, delay]);

  const visibleChars = Math.floor(progress.use() * text.length);
  const displayText = text.slice(0, visibleChars);

  return (
    <div style={{ fontSize, color, fontFamily: "Noto Serif CJK JP", fontWeight: "bold", textAlign: "center", margin: "8px 0" }}>
      {displayText}
    </div>
  );
};

const AnimatedCharacter = ({ char, delayIndex }: { char: string, delayIndex: number }) => {
  const opacity = useVariable(0);
  const positionY = useVariable(20);

  useAnimation(async (ctx) => {
    await ctx.sleep(seconds(delayIndex * 0.1));
    const fade = ctx.move(opacity).to(1, seconds(0.3));
    const moveUp = ctx.move(positionY).to(0, seconds(0.3));
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

const IntroScene = () => {
  const phase = useVariable(0);

  useAnimation(async (context) => {
    await context.sleep(seconds(0.5));

    // 1: 序盤テキスト
    await context.move(phase).to(1, seconds(0.1), BEZIER_SMOOTH);
    await context.sleep(seconds(1));

    // 2: 「情報」表示 + 効果音タイミング
    await context.move(phase).to(2, seconds(0.01));
    await context.sleep(seconds(1));

    // 3: メイン文
    await context.move(phase).to(3, seconds(0.01));
    await context.sleep(seconds(1.3));

    // 4: サークル名
    await context.move(phase).to(4, seconds(0.01));
    await context.sleep(seconds(1))
  }, []);

  return (
    <FillFrame style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" }}>
      <div style={{ textAlign: "center", color: "#ffffff" }}>
        {phase.use() >= 1 && (
          <TypewriterText text="大学生に一番大事なもの。それは...." fontSize="48px" color="#ffffff" delay={0} />
        )}

        {phase.use() >= 2 && (
          <div style={{ fontSize: "140px", fontWeight: "bold", margin: "12px 0", color: "#00ffea" }}>
            {"情報".split("").map((char, index) => (
              <AnimatedCharacter key={index} char={char} delayIndex={index} />
            ))}
          </div>
        )}

        {phase.use() >= 3 && (
          <TypewriterText text="そんな情報を得ることができ、かつ自分のやりたいこともできる。それが、、、" fontSize="48px" color="#ffffff" delay={0} />
        )}

        {phase.use() >= 4 && (
          <div style={{ fontSize: "88px", fontWeight: "bold", margin: "20px 0", color: "#00ffea" }}>
            {"情報技術メディア研究会".split("").map((char, index) => (
              <AnimatedCharacter key={index} char={char} delayIndex={index} />
            ))}
          </div>
        )}
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
        {Array.from({ length: 0 }, (_, i) => (
          <Clip key={i} label={`EffectSound${i + 1}`} start={seconds(i * 0.3)} duration={seconds(0.3)}>
            <Sound
              sound="assets/軽いパンチ1.mp3"
              volume={1}
            />
          </Clip>
        ))}

        <Clip label="InfoSound" start={seconds(1.5)} duration={seconds(0.6)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.5}
          />
        </Clip>
        <Clip label="InfoSound" start={seconds(4)} duration={seconds(0.6)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.5}
          />
        </Clip>

        <ClipSequence>
          <Clip label="Intro" duration={seconds(8)}>
            <IntroScene />
          </Clip>
          <Clip label="Activities" duration={seconds(10)}>
            <ActivitiesScene />
          </Clip>
          <Clip label="Members" duration={seconds(10)}>
            <MembersScene />
          </Clip>
          <Clip label="Benefits" duration={seconds(10)}>
            <BenefitsScene />
          </Clip>
          <Clip label="Closing" duration={seconds(10)}>
            <ClosingScene />
          </Clip>
        </ClipSequence>
      </TimeLine>
    </Project>
  )
}
