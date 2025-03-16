"use client";

import { useEffect, useState } from "react";
import "@/styles/printer-animation.css";

export default function PrinterAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setIsAnimating(true);
  }, []);

  return (
    <div className="printer-animation-wrapper">
      <div className="printer">
        <div className="printer-body">
          <div className="printer-top"></div>
          <div className="printer-front">
            <div className="printer-slot"></div>
            <div className="printer-controls">
              <div className="printer-button"></div>
              <div className="printer-light"></div>
            </div>
          </div>
        </div>

        {isAnimating && (
          <>
            <div className="paper paper-1">
              <div className="paper-content">
                <div className="print-image banner"></div>
              </div>
            </div>
            <div className="paper paper-2">
              <div className="paper-content">
                <div className="print-image vehicle"></div>
              </div>
            </div>
            <div className="paper paper-3">
              <div className="paper-content">
                <div className="print-image building"></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="printer-shadow"></div>
    </div>
  );
}
