# Bunny-Hop MVP Specification

## Promise
Upload one controlled side-on bunny-hop clip. Receive one evidence-backed correction and one drill. Submit a second attempt and see whether the targeted movement improved.

## First version: concierge, not fake automation
The first useful MVP is human-in-the-loop. A rider submits a clip; the founder or an experienced MTB coach reviews it using a fixed rubric. Software packages the review into the product result. Model assistance may suggest phases or landmarks, but a human approves every correction. The interface must never imply that sample feedback was generated from a rider's clip.

## Required input
- MP4, MOV, or WebM under 250 MB
- Camera directly side-on and stationary
- Full rider, bicycle, ground, approach, and landing visible
- Good light with limited motion blur
- Flat, predictable practice area
- Rider confirms the clip is their own or they have permission to submit it

## Reject when
- The camera angle is strongly front/rear three-quarter
- Rider, wheels, or landing leave frame
- Critical joints or wheels are hidden for most of the movement
- Motion blur prevents phase identification
- The reviewer cannot support a correction confidently

## Review phases
1. Approach
2. Front-wheel lift
3. Hip extension and rearward shift
4. Rear-wheel lift
5. Peak height
6. Landing

## Result contract
Every accepted analysis returns:
1. One primary issue, written in rider language
2. Two annotated evidence frames
3. One focused corrective drill
4. Confidence: high, medium, or insufficient evidence
5. A direct request for a second attempt

No generic numeric score. No claims about hidden inputs such as brake pressure, grip force, gaze, or pedal force.

## Second-attempt comparison
Compare only visible, repeatable signals: front/rear wheel lift timing, approximate wheel height relative to the bike, peak sequence, body position in visible frames, and landing consistency. Report improvement only when the evidence supports it.

## Pilot
- Recruit 20 founding riders from the waitlist
- Collect 30–50 controlled clips
- Have two experienced riders/coaches independently label at least 20 clips
- Deliver first analysis within 24 hours
- Ask every rider for a second attempt

## Validation gates
- At least 80% of accepted corrections judged useful and not misleading by an independent experienced reviewer
- At least 70% of submissions meet or can be corrected to meet the filming protocol
- At least 25% submit a second clip without an incentive
- At least 30% of useful-result users say they would be disappointed if the product disappeared
- Zero safety-critical claims without visible evidence

## Current web build
The published page validates the filming protocol and video file locally, previews the clip without uploading it, shows a clearly labeled example result, and captures founding-rider interest. It is the acquisition and workflow prototype, not the completed analysis engine.
