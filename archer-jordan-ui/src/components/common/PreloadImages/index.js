import React from 'react';
// IMAGES
import whiteLogo from 'lib/media/arrow-logo-white.png';
import checkSVG from 'lib/media/check-circle.svg';
import hamburgerSVG from 'lib/media/hamburger-menu.svg';

const imagesToLoad = [whiteLogo, checkSVG, hamburgerSVG];

export default () => {
  return (
    <div style={{opacity: 0, display: 'none'}}>
      {imagesToLoad.map((src, i) => (
        <img src={src} alt={`preload-img-${i}`} rel="preload" />
      ))}
    </div>
  );
};
