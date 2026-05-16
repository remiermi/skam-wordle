import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-black text-white text-center p-4 mt-10 text-sm">
      <p>
        Made by{" "}
        <a
          href="https://twitter.com/dilfsIeif"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          @dilfsIeif
        </a>
        . All trademarks, characters, and media belong to their respective
        owners. Embedded video content is provided via YouTube.
      </p>
    </footer>
  );
};