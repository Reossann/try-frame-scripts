import { useAnimation, useVariable } from "../src/lib/animation"
import { BEZIER_SMOOTH } from "../src/lib/animation/functions"
import { seconds } from "../src/lib/frame"

export const TypewriterText = ({ text, fontSize = "48px", color = "#ffffff", delay = 0, textAlign = "center", writingMode = "horizontal-tb" }: { text: string; fontSize?: string; color?: string; delay?: number; textAlign?: string; writingMode?: string }) => {
  const progress = useVariable(0);

  useAnimation(async (context) => {
    await context.sleep(seconds(delay));
    await context.move(progress).to(1, seconds(text.length * 0.1), BEZIER_SMOOTH);
  }, [text, delay]);

  const visibleChars = Math.floor(progress.use() * text.length);
  const displayText = text.slice(0, visibleChars);

  return (
    <div style={{ fontSize, color, fontFamily: "Noto Serif CJK JP", fontWeight: "bold", textAlign: textAlign as any, writingMode: writingMode as any, margin: "8px 0" }}>
      {displayText}
    </div>
  );
};

export const AnimatedCharacter = ({ char, delayIndex }: { char: string, delayIndex: number }) => {
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
        {characters.map((char, index) => (
          <AnimatedCharacter 
            key={index} 
            char={char} 
            delayIndex={index}
          />
        ))}
      </div>
    </div>
  );
};
