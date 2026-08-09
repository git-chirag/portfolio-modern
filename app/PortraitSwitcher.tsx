"use client";

import Image from "next/image";
import { useState } from "react";

export function PortraitSwitcher() {
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  return (
    <div className={`portrait-image portrait-image--switchable${showRealPhoto ? " is-real" : ""}`}>
      <div className="portrait-layer portrait-layer--avatar" aria-hidden={showRealPhoto}>
        <Image
          src="/profile-avatar.webp"
          alt={showRealPhoto ? "" : "Illustrated portrait of Chirag Aparadh"}
          fill
          priority
          sizes="(max-width: 900px) 76vw, 38vw"
        />
      </div>
      <div className="portrait-layer portrait-layer--real" aria-hidden={!showRealPhoto}>
        <Image
          src="/profile.jpg"
          alt={showRealPhoto ? "Chirag Aparadh outdoors in the hills" : ""}
          fill
          sizes="(max-width: 900px) 76vw, 38vw"
        />
      </div>

      <span className="avatar-sparkle avatar-sparkle--one" aria-hidden="true">✦</span>
      <span className="avatar-sparkle avatar-sparkle--two" aria-hidden="true">✦</span>

      <button
        className="portrait-toggle"
        type="button"
        aria-pressed={showRealPhoto}
        aria-label={showRealPhoto ? "Show Chirag's illustrated avatar" : "Show a real photo of Chirag"}
        onClick={() => setShowRealPhoto((current) => !current)}
      >
        <span aria-hidden="true">{showRealPhoto ? "↺" : "●"}</span>
        {showRealPhoto ? "Avatar me" : "Real me"}
      </button>
    </div>
  );
}
