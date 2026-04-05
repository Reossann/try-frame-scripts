import { useAnimation, useVariable } from "../src/lib/animation";
import { DrawText } from "../src/lib/animation/effect/draw-text";
import { seconds } from "../src/lib/frame";
import { FillFrame } from "../src/lib/layout/fill-frame";

export const ActivitiesScene = () => {
  const progress = useVariable(0);
  const items = [
    "ハッカソン",
    "ゼミ",
    "テスト勉強会",
    "プロジェクト",
    "外部イベント",
  ];
  const itemDescriptions = [
    "期間を設けて集中的にチーム開発を行うイベント",
    "各々が学んだことを共有する取り組み",
    "テスト前に集まって勉強する会",
    "やりたいことを実現できる",
    "他会社や他大学のイベントに参加する活動",
  ];
  const subtitleTexts = [
    "チーム開発に取り組めるイベントです。いろんな知識がいっぱい知れる！！",
    "学生だけで行う教え合いのようなものです。隔週水曜日に開催中",
    "まだ一度しか実施できてないですが常習化していきたいですね。",
    "開発以外にも取り扱ってて、一言では言い表せないくらいなんでもできます。",
    "エンジニアの方から有益な話を聞けるタイミングがたくさん！！",
  ];
  const titleDrawFrames = 42;
  const sceneDuration = seconds(40.6);
  const firstItemDelay = seconds(1);
  const itemInterval = seconds(1);
  const itemFadeDuration = seconds(0.2);
  const emphasisStartDelay = seconds(0.4);
  const emphasisFadeInDuration = seconds(1);
  const emphasisHoldDuration = seconds(5);
  const emphasisFadeOutDuration = seconds(1);
  const emphasisItemDuration =
    emphasisFadeInDuration + emphasisHoldDuration + emphasisFadeOutDuration;

  useAnimation(async (context) => {
    await context.move(progress).to(1, sceneDuration);
  }, []);

  const currentProgress = progress.use();
  const elapsedFrames = currentProgress * sceneDuration;
  const allItemsShownAt =
    firstItemDelay + (items.length - 1) * itemInterval + itemFadeDuration;
  const emphasisStart = allItemsShownAt + emphasisStartDelay;

  const revealAt = (index: number) => {
    const appearAt = firstItemDelay + index * itemInterval;
    const value = (elapsedFrames - appearAt) / itemFadeDuration;
    return Math.max(0, Math.min(1, value));
  };

  const getEmphasisLevel = (index: number) => {
    const emphasisElapsed =
      elapsedFrames - (emphasisStart + index * emphasisItemDuration);
    if (emphasisElapsed < 0 || emphasisElapsed >= emphasisItemDuration) {
      return 0;
    }
    if (emphasisElapsed < emphasisFadeInDuration) {
      return emphasisElapsed / emphasisFadeInDuration;
    }
    if (emphasisElapsed < emphasisFadeInDuration + emphasisHoldDuration) {
      return 1;
    }
    const fadeOutElapsed =
      emphasisElapsed - (emphasisFadeInDuration + emphasisHoldDuration);
    return 1 - fadeOutElapsed / emphasisFadeOutDuration;
  };

  const emphasisLevels = items.map((_, index) => getEmphasisLevel(index));
  let activeDescriptionIndex = -1;
  let activeDescriptionOpacity = 0;
  for (let index = 0; index < emphasisLevels.length; index += 1) {
    if (emphasisLevels[index] > activeDescriptionOpacity) {
      activeDescriptionOpacity = emphasisLevels[index];
      activeDescriptionIndex = index;
    }
  }
  const activeDescriptionText =
    activeDescriptionIndex >= 0 ? itemDescriptions[activeDescriptionIndex] : "";
  const activeSubtitleText =
    activeDescriptionIndex >= 0
      ? subtitleTexts[activeDescriptionIndex]
      : "サークル紹介するよ！！主に取り扱っているのはこの5つ！！";
  const isHackathonActive = activeDescriptionIndex === 0;
  const isZemiActive = activeDescriptionIndex === 1;
  const isStudyActive = activeDescriptionIndex === 2;
  const isProjectActive = activeDescriptionIndex === 3;

  return (
    <>
      <FillFrame
        style={{
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "20%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          position: "relative",
          margin: "0",
          padding: "0",
          background:
            "radial-gradient(circle at top, #3b3b3b 0%, #202020 55%, #161616 100%)",
        }}
      >
        <img
          src="assets/geeken_logo_white_trimmed.png"
          alt="geeken logo"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "210px",
            height: "210px",
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
            width: "560px",
            marginTop: "0px",
            marginLeft: "24px",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          <DrawText
            text="活動実績と活動内容"
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
              width: "470px",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
              borderRadius: "14px",
              overflow: "visible",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
            }}
          >
            {items.map((item, index) => {
              const opacity = revealAt(index);
              const translateX = (1 - opacity) * 28;
              const emphasisLevel = getEmphasisLevel(index);

              const itemShadow = 10 + emphasisLevel * 8;
              const itemGlow = 0.08 + emphasisLevel * 0.14;
              const itemScale = 1 + emphasisLevel * 0.16;

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
                    transition:
                      "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "44px",
                      lineHeight: 1.3,
                      letterSpacing: "0.015em",
                      textShadow: `0 2px ${itemShadow}px rgba(0, 0, 0, 0.28)`,
                      transform: `scale(${itemScale})`,
                      transformOrigin: "left center",
                      width: "100%",
                    }}
                  >
                    {item}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          style={{
            position: "absolute",
            left: "600px",
            top: "180px",
            width: "1200px",
            minHeight: "460px",
            opacity: activeDescriptionOpacity,
            transform: `translateY(${(1 - activeDescriptionOpacity) * 10}px)`,
            color: "#d7ecff",
            textShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
            transition: "opacity 120ms linear, transform 120ms linear",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            border: "2px dashed rgba(131, 215, 255, 0.9)",
            borderRadius: "16px",
            padding: "18px",
            boxSizing: "border-box",
            background: "rgba(9, 18, 32, 0.2)",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            {activeDescriptionText}
          </div>

          {isHackathonActive ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <img
                src="assets/Menhera.png"
                alt="Menhera"
                style={{
                  width: "420px",
                  height: "340px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.34)",
                }}
              />
              <img
                src="assets/MeCHAKCHA.png"
                alt="MeCHAKCHA"
                style={{
                  width: "420px",
                  height: "420px",
                  objectFit: "contain",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.34)",
                }}
              />
            </div>
          ) : null}

          {isZemiActive ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <img
                src="assets/zemi1.png"
                alt="zemi1"
                style={{
                  width: "620px",
                  height: "340px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.34)",
                }}
              />
              <img
                src="assets/zemi2.png"
                alt="zemi2"
                style={{
                  width: "420px",
                  height: "230px",
                  objectFit: "contain",
                  borderRadius: "14px",
                  border: "none",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.34)",
                }}
              />
            </div>
          ) : null}

          {isStudyActive ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <img
                src="assets/study.jpg"
                alt="study"
                style={{
                  width: "620px",
                  height: "340px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.34)",
                }}
              />
            </div>
          ) : null}

          {isProjectActive ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <img
                src="assets/project.png"
                alt="project1"
                style={{
                  width: "620px",
                  height: "340px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.34)",
                }}
              />
            </div>
          ) : null}
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
        {activeSubtitleText}
      </div>
    </>
  );
};
