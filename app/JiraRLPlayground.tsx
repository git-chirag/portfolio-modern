"use client";

import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";

const columns = ["Triage", "In progress", "Resolved"] as const;
const feedbackByStage = [
  "Move the pink ticket one step at a time.",
  "Valid transition · reward +4",
  "Episode complete · reward +8",
] as const;

export function JiraRLPlayground() {
  const [stage, setStage] = useState(0);
  const [feedback, setFeedback] = useState<string>(feedbackByStage[0]);
  const [invalidColumn, setInvalidColumn] = useState<number | null>(null);
  const invalidTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (invalidTimerRef.current) window.clearTimeout(invalidTimerRef.current);
  }, []);

  const announceReward = (message: string) => {
    window.dispatchEvent(new CustomEvent("portfolio:reward", { detail: { message } }));
  };

  const moveTicket = (targetStage: number) => {
    if (targetStage === stage + 1) {
      setStage(targetStage);
      setFeedback(feedbackByStage[targetStage] ?? feedbackByStage[0]);
      setInvalidColumn(null);
      announceReward(targetStage === 2 ? "Episode complete!" : "Nice move!");
      return;
    }

    if (targetStage === stage) return;

    setFeedback("Guarded action · follow the workflow order.");
    setInvalidColumn(targetStage);
    announceReward("That move is guarded.");
    if (invalidTimerRef.current) window.clearTimeout(invalidTimerRef.current);
    invalidTimerRef.current = window.setTimeout(() => setInvalidColumn(null), 650);
  };

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(stage));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetStage: number) => {
    event.preventDefault();
    moveTicket(targetStage);
  };

  const handleTicketClick = () => {
    if (stage < 2) {
      moveTicket(stage + 1);
      return;
    }

    setStage(0);
    setFeedback("New episode · move the ticket again.");
    announceReward("New episode ready!");
  };

  return (
    <div
      className="project-visual project-visual--jira"
      role="group"
      aria-label="Interactive reinforcement-learning ticket board. Drag or click the pink ticket to move it through the workflow."
    >
      <span className="interaction-hint">Drag or tap</span>
      <div className="rl-window">
        <div className="mock-window-bar" aria-hidden="true">
          <span /><span /><span />
          <b>agent_episode_07</b>
        </div>
        <div className="rl-summary" aria-hidden="true">
          <span className="rl-agent"><i>AI</i><b>guarded agent</b></span>
          <span className="rl-score"><i /> reward +{stage === 2 ? 8 : stage === 1 ? 4 : 0}</span>
        </div>
        <div className="rl-board">
          {columns.map((column, index) => (
            <div
              className={`rl-column${invalidColumn === index ? " is-invalid" : ""}${stage === index ? " is-current" : ""}`}
              key={column}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, index)}
            >
              <strong>{column}</strong>
              {stage === index && (
                <button
                  className="rl-ticket rl-ticket--interactive"
                  type="button"
                  draggable
                  onDragStart={handleDragStart}
                  onClick={handleTicketClick}
                  aria-label={stage === 2 ? "Restart the JiraRL ticket episode" : `Move login issue ticket to ${columns[stage + 1]}`}
                >
                  P1 · login issue <span aria-hidden="true">{stage === 2 ? "↺" : "↗"}</span>
                </button>
              )}
              {index === 0 && <span className="rl-ticket">P2 · search bug</span>}
              {index === 1 && <span className="rl-ticket">dependency ↗</span>}
              {index === 2 && <span className="rl-ticket">✓ API fix</span>}
            </div>
          ))}
        </div>
        <div className={`rl-guard${invalidColumn !== null ? " is-guarded" : ""}`} role="status" aria-live="polite">
          <span aria-hidden="true">◆</span><strong>{feedback}</strong><i aria-hidden="true">{invalidColumn !== null ? "×" : "✓"}</i>
        </div>
      </div>
      <div className="jira-loop" aria-hidden="true">
        <span>observe</span><i>→</i><span>act</span><i>→</i><span>reward</span>
      </div>
    </div>
  );
}
