# Quality assurance

Last run: 2026-11-04T15:54:38.244Z
Machine-readable report: [validation.json](../output/validation.json). Overall automatic status: **automated-checks-passed**.

Run `npm run validate` after all exports finish. It validates the current files and probes actual MP4 streams; an absent export is pending, never passed. `--skip-visual` skips interior frame comparison and leaves that check pending.

Current dataset: 93 historical events, 72 composed shots, 36 sourced route schematics, 72 spoken segments and 138 measured subtitle cues.

## What is checked

- The exact 12 requested chapter boundaries and 36,000 contiguous half-open 60FPS frame ranges.
- No year 0 in data or in any of the 36,000 generated date labels.
- Coordinate bounds, source URLs and registry references; explicit approximate-map and route uncertainty flags.
- Shot and narration alignment, source coverage across four continents, chapter climaxes and at least ten scheduled animation forms.
- Complete measured subtitle text, non-overlapping timings, utterance containment and exact SRT/JSON consistency.
- Real speech manifest, utterance slot fit, 600-second audio durations, actual exported codec/resolution/frame rate/frame count and audio streams.
- Two interior frames per shot compared in the geographic/scene stage, excluding the title/year/subtitle HUD. This finds static rendering but cannot certify visual richness.

## Results requiring action

- No automatic check currently fails.
- All expected automated artifact checks are complete.

## Editorial and playback limits

- **manual:historical-interpretation:** URLs, chronology and geography are structurally checked. Source interpretation, historical completeness and approximate overlays require human editorial review; the script does not establish scholarly consensus.
- **manual:cinematic-transitions:** Distinct transition names and changing frames do not prove director-level transition quality. Watch the rendered film to assess spatial continuity, route following, map dives, and object-to-world transitions.
- **manual:spoken-audio:** Word-boundary timing verifies scheduling. Listen to a complete playback for pronunciation, pacing, music balance and semantic emphasis.

Historical influence overlays are representative schematic regions, not reconstructed exact sovereign boundaries. A point inside a coarse continent bounding box establishes geographical coverage only. “Climax” and transition names are director metadata, not an aesthetic score. Distinct transitions must be judged from their actual rendered behavior.

The final intentional fade to black is part of the ending. This script does not automatically classify every dark frame as an accidental splice gap. Chapter concatenation must preserve absolute frame numbering, and the full assembled video should be decoded or watched once before distribution.
