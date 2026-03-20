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



export const PROJECT = () => {
  return (
    <Project>
      <TimeLine>
        <Clip label="TextSound1" start={seconds(0.6)} duration={seconds(0.4)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.2}
          />
        </Clip>
        <Clip label="TextSound2" start={seconds(2.6)} duration={seconds(0.4)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.2}
          />
        </Clip>
        <Clip label="TextSound3" start={seconds(4.6)} duration={seconds(0.4)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.2}
          />
        </Clip>
        <Clip label="TextSound4" start={seconds(6.6)} duration={seconds(0.4)}>
          <Sound
            sound="assets/軽いパンチ1.mp3"
            volume={1.2}
          />
        </Clip>

        <ClipSequence>
          <Clip label="Intro1" duration={seconds(2)}>
            <Intro1Scene />
          </Clip>
          <Clip label="Intro2" duration={seconds(2)}>
            <Intro2Scene />
          </Clip>
          <Clip label="Intro3" duration={seconds(2)}>
            <Intro3Scene />
          </Clip>
          <Clip label="Intro4" duration={seconds(2)}>
            <Intro4Scene />
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
