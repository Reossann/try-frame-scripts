import { Clip, ClipSequence } from "../src/lib/clip"
import { Sound } from "../src/lib/sound/sound"
import { seconds } from "../src/lib/frame"
import { Project, type ProjectSettings } from "../src/lib/project"
import { TimeLine } from "../src/lib/timeline"
import { Intro1Scene, Intro2Scene, Intro3Scene, Intro4Scene } from "./intro"
import { ActivitiesScene } from "./activities"
import { MembersScene } from "./members"
import { BenefitsScene } from "./benefits"
import { ClosingScene } from "./closing"

export const PROJECT_SETTINGS: ProjectSettings = {
  name: "framescript-template",
  width: 1920,
  height: 1080,
  fps: 60,
}

const INTRO1_DURATION = 2.4
const INTRO2_DURATION = 1.4
const INTRO3_DURATION = 2.8
const INTRO4_DURATION = 2.2

const INTRO2_START = INTRO1_DURATION
const INTRO4_START = INTRO1_DURATION + INTRO2_DURATION + INTRO3_DURATION



export const PROJECT = () => {
  return (
    <Project>
      <TimeLine>
        <Clip label="Intro2TransitionSound" start={seconds(INTRO2_START)} duration={seconds(0.45)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.35}
          />
        </Clip>
        <Clip label="Intro4TransitionSound" start={seconds(INTRO4_START)} duration={seconds(0.45)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.35}
          />
        </Clip>

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
          <Clip label="Activities" duration={seconds(40.6)}>
            <ActivitiesScene />
          </Clip>
          <Clip label="Members" duration={seconds(10)}>
            <MembersScene />
          </Clip>
          <Clip label="Benefits" duration={seconds(26.6)}>
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
