"use client";

import { useState } from "react";

const searchResults = [
  { label: "misty ridge", score: "96%" },
  { label: "sunset trail", score: "93%" },
  { label: "alpine lake", score: "91%" },
  { label: "forest path", score: "89%" },
  { label: "cloud valley", score: "87%" },
  { label: "rocky summit", score: "84%" },
] as const;

const chainSteps = ["Producer", "Distributor", "Retailer", "Consumer"] as const;

const meetupSpots = [
  { marker: "A", name: "Sunday coffee", detail: "Cafe · 4:30 PM" },
  { marker: "B", name: "Walk in the park", detail: "Garden · 5:00 PM" },
  { marker: "C", name: "Quiet catch-up", detail: "Library · 4:45 PM" },
] as const;

function tellPip(message: string) {
  window.dispatchEvent(new CustomEvent("portfolio:reward", { detail: { message } }));
}

export function SearchPlayground({ title }: { title: string }) {
  const [selected, setSelected] = useState(0);

  const selectResult = (index: number) => {
    setSelected(index);
    tellPip(`${searchResults[index].score} visual match found!`);
  };

  const runNextSearch = () => selectResult((selected + 1) % searchResults.length);

  return (
    <div className="project-visual project-visual--search" role="group" aria-label={`Interactive visual search demo for ${title}`}>
      <span className="interaction-hint">Tap a match</span>
      <div className="search-window">
        <div className="mock-window-bar" aria-hidden="true">
          <span /><span /><span />
          <b>image_search</b>
        </div>
        <div className="mock-search-bar">
          <span aria-hidden="true">⌕</span>
          <strong>find similar landscapes</strong>
          <button type="button" onClick={runNextSearch} aria-label="Run the next sample image search">↵</button>
        </div>
        <div className="mock-result-grid">
          {searchResults.map((result, index) => (
            <button
              className={selected === index ? "is-selected" : ""}
              type="button"
              key={result.label}
              aria-pressed={selected === index}
              aria-label={`Select ${result.label}, ${result.score} match`}
              onClick={() => selectResult(index)}
            >
              <i aria-hidden="true" />
              <small>{result.score}</small>
            </button>
          ))}
        </div>
        <p className="visual-feedback" role="status">
          {searchResults[selected].label} · {searchResults[selected].score} match
        </p>
      </div>
      <div className="pipeline-row" aria-hidden="true">
        <span>FastAPI</span><i>→</i><span>CLIP</span><i>→</i><span>Qdrant</span>
      </div>
    </div>
  );
}

export function SupplyChainPlayground({ title }: { title: string }) {
  const [stage, setStage] = useState(0);

  const selectStage = (index: number) => {
    setStage(index);
    tellPip(`${chainSteps[index]} checkpoint verified!`);
  };

  return (
    <div className="project-visual project-visual--chain" role="group" aria-label={`Interactive product journey for ${title}`}>
      <span className="interaction-hint">Trace the parcel</span>
      <div className="chain-title">
        <span>LIVE LEDGER</span>
        <strong>Product journey</strong>
      </div>
      <div className="chain-track">
        {chainSteps.map((step, index) => (
          <button
            className={`chain-step${index === stage ? " is-active" : ""}${index < stage ? " is-verified" : ""}`}
            type="button"
            key={step}
            aria-pressed={index === stage}
            onClick={() => selectStage(index)}
          >
            <span>{index <= stage ? "✓" : `0${index + 1}`}</span>
            <b>{step}</b>
          </button>
        ))}
      </div>
      <div className="ledger-stack" aria-live="polite">
        <span>Block 024{stage + 1} · verified</span>
        <span>{chainSteps[stage]} signed the handoff</span>
        <span>{stage === chainSteps.length - 1 ? "Journey complete" : `Next stop: ${chainSteps[stage + 1]}`}</span>
      </div>
    </div>
  );
}

export function MeetupPlayground({ title }: { title: string }) {
  const [selected, setSelected] = useState(0);

  const chooseSpot = (index: number) => {
    setSelected(index);
    tellPip(`${meetupSpots[index].name} selected!`);
  };

  return (
    <div className="project-visual project-visual--meetup" role="group" aria-label={`Interactive meeting spot picker for ${title}`}>
      <span className="interaction-hint">Pick a place</span>
      <div className="map-backdrop">
        {meetupSpots.map((spot, index) => (
          <button
            className={`map-pin map-pin--${["one", "two", "three"][index]}${selected === index ? " is-selected" : ""}`}
            type="button"
            key={spot.marker}
            aria-pressed={selected === index}
            aria-label={`Choose ${spot.name}`}
            onClick={() => chooseSpot(index)}
          >
            {spot.marker}
          </button>
        ))}
      </div>
      <div className="meetup-phone">
        <span className="phone-speaker" aria-hidden="true" />
        <div className={`phone-map phone-map--spot-${selected + 1}`} aria-hidden="true">
          <i className="route route--one" />
          <i className="route route--two" />
          <span className="phone-pin">★</span>
        </div>
        <div className="meeting-sheet" aria-live="polite">
          <strong>{meetupSpots[selected].name}?</strong>
          <span>{meetupSpots[selected].detail}</span>
        </div>
      </div>
      <span className="meetup-bubble meetup-bubble--yes" aria-hidden="true">I’m in!</span>
      <span className="meetup-bubble meetup-bubble--time" aria-hidden="true">Spot {meetupSpots[selected].marker}</span>
    </div>
  );
}
