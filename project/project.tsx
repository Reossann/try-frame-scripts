import { Clip, ClipSequence } from "../src/lib/clip";
import { seconds } from "../src/lib/frame";
import { Project, type ProjectSettings } from "../src/lib/project";
import { Sound } from "../src/lib/sound/sound";
import { TimeLine } from "../src/lib/timeline";
import { ActivitiesScene } from "./activities";
import { AprilScheduleScene } from "./april-schedule";
import { BenefitsScene } from "./benefits";
import { ClosingScene } from "./closing";
import {
  Intro1Scene,
  Intro2Scene,
  Intro3Scene,
  Intro4Scene,
  Intro5Scene,
} from "./intro";
import { MembersScene } from "./members";

export const PROJECT_SETTINGS: ProjectSettings = {
  name: "framescript-template",
  width: 1920,
  height: 1080,
  fps: 60,
};

const INTRO1_DURATION = 2.3;
const INTRO2_DURATION = 1.7;
const INTRO3_DURATION = 3.9;
const INTRO4_DURATION = 7.4;
const INTRO5_DURATION = 2.2;
const ACTIVITIES_START =
  INTRO1_DURATION +
  INTRO2_DURATION +
  INTRO3_DURATION +
  INTRO4_DURATION +
  INTRO5_DURATION;

const ACTIVITIES_DURATION = 40.6;
const MEMBERS_DURATION = 10;
const BENEFITS_DURATION = 32.6;
const APRIL_SCHEDULE_DURATION = 10;
const CLOSING_DURATION = 10;
const BGM_DURATION = 16;
const ACTIVITIES_TO_END_DURATION =
  ACTIVITIES_DURATION +
  MEMBERS_DURATION +
  BENEFITS_DURATION +
  APRIL_SCHEDULE_DURATION +
  CLOSING_DURATION;
const ACTIVITIES_BGM_PATH = "assets/Freeze__Clock.mp3";
const ACTIVITIES_BGM_LOOP_CROSSFADE = 0.05;
const ACTIVITIES_BGM_SINGLE_DURATION = 56.52;
const ACTIVITIES_BGM_LOOP_STEP = Math.max(
  0.1,
  ACTIVITIES_BGM_SINGLE_DURATION - ACTIVITIES_BGM_LOOP_CROSSFADE,
);
const ACTIVITIES_BGM_LOOP_COUNT =
  ACTIVITIES_BGM_SINGLE_DURATION > 0
    ? Math.ceil(ACTIVITIES_TO_END_DURATION / ACTIVITIES_BGM_LOOP_STEP)
    : 1;

export const PROJECT = () => {
  return (
    <Project>
      <TimeLine>
        <Clip
          label="MainBGM"
          start={seconds(0)}
          duration={seconds(BGM_DURATION)}
        >
          <Sound sound="assets/Unrest.mp3" volume={1} />
        </Clip>
        {Array.from({ length: ACTIVITIES_BGM_LOOP_COUNT }).map((_, index) =>
          (() => {
            const segmentStartOffset = index * ACTIVITIES_BGM_LOOP_STEP;
            const remainingDuration =
              ACTIVITIES_TO_END_DURATION - segmentStartOffset;
            if (remainingDuration <= 0) return null;

            const segmentDuration = Math.min(
              ACTIVITIES_BGM_SINGLE_DURATION > 0
                ? ACTIVITIES_BGM_SINGLE_DURATION
                : ACTIVITIES_TO_END_DURATION,
              remainingDuration,
            );

            return (
              <Clip
                key={index}
                label={`ActivitiesBGM-${index + 1}`}
                start={seconds(ACTIVITIES_START + segmentStartOffset)}
                duration={seconds(segmentDuration)}
              >
                <Sound
                  sound={ACTIVITIES_BGM_PATH}
                  volume={0.75}
                  fadeInFrames={seconds(0.12)}
                  fadeOutFrames={seconds(0.16)}
                />
              </Clip>
            );
          })(),
        )}

        <ClipSequence>
          <Clip label="Intro1" duration={seconds(INTRO1_DURATION)}>
            <Intro1Scene />
          </Clip>
          <Clip label="Intro2" duration={seconds(INTRO2_DURATION)}>
            <Intro2Scene />
          </Clip>
          <Clip label="Intro3" duration={seconds(INTRO3_DURATION)}>
            <Intro3Scene />
          </Clip>
          <Clip label="Intro4" duration={seconds(INTRO4_DURATION)}>
            <Intro4Scene />
          </Clip>
          <Clip label="Intro5" duration={seconds(INTRO5_DURATION)}>
            <Intro5Scene />
          </Clip>
          <Clip label="Activities" duration={seconds(ACTIVITIES_DURATION)}>
            <ActivitiesScene />
          </Clip>
          <Clip label="Members" duration={seconds(MEMBERS_DURATION)}>
            <MembersScene />
          </Clip>
          <Clip label="Benefits" duration={seconds(BENEFITS_DURATION)}>
            <BenefitsScene />
          </Clip>
          <Clip
            label="AprilSchedule"
            duration={seconds(APRIL_SCHEDULE_DURATION)}
          >
            <AprilScheduleScene />
          </Clip>
          <Clip label="Closing" duration={seconds(CLOSING_DURATION)}>
            <ClosingScene />
          </Clip>
        </ClipSequence>
      </TimeLine>
    </Project>
  );
};
