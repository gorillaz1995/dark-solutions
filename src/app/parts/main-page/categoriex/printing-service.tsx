"use client";

import { useEffect, useRef } from "react";
import "./printing-service.css";

export default function PrintingService() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for paper sheets
    const paperSheets = document.querySelectorAll(".paper-sheet");
    paperSheets.forEach((sheet, index) => {
      const delay = index * 0.5;
      const element = sheet as HTMLElement;
      element.style.animationDelay = `${delay}s`;
    });

    // Animation for ink drops
    const inkDrops = document.querySelectorAll(".ink-drop");
    inkDrops.forEach((drop, index) => {
      const delay = index * 0.3 + 0.2;
      const element = drop as HTMLElement;
      element.style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div className="printing-service-wrapper">
      {/* External lines */}
      <div className="external-line line-1"></div>
      <div className="external-line line-2"></div>
      <div className="external-line line-3"></div>

      <div className="printing-service-container" ref={containerRef}>
        <h2 className="service-title">Professional Printing Services</h2>

        {/* Printer component representation */}
        <div className="printer-component">
          <div className="printer-top"></div>
          <div className="printer-body">
            {/* Internal lines */}
            <div className="internal-line line-4"></div>
            <div className="internal-line line-5"></div>

            {/* Paper sheets */}
            <div className="paper-sheet sheet-1"></div>
            <div className="paper-sheet sheet-2"></div>
            <div className="paper-sheet sheet-3"></div>

            {/* Ink drops */}
            <div className="ink-drop drop-1"></div>
            <div className="ink-drop drop-2"></div>
            <div className="ink-drop drop-3"></div>
            <div className="ink-drop drop-4"></div>
          </div>
          <div className="printer-tray"></div>
        </div>

        <div className="service-description">
          <p>High-quality printing solutions for all your business needs</p>
          <ul>
            <li>Business Cards</li>
            <li>Brochures</li>
            <li>Posters</li>
            <li>Custom Designs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
