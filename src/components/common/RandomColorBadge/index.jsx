import React from 'react';
import seedrandom from 'seedrandom';

const isColorBright = color => {
  // Remove the '#' symbol if present
  color = color.replace('#', '');

  // Convert the color to its RGB representation
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate the brightness using a formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Set a brightness threshold (adjust as needed)
  const threshold = 128;

  // Return true if the brightness is above the threshold (bright color), false otherwise (dark color)
  return brightness > threshold;
}

const RandomColorBadge = props => {
  const rng = seedrandom(props.value);
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[(rng.int32() % 16 + 16) % 16];
    }
    return color;
  };

  const color = getRandomColor();

  const badgeStyle = {
    backgroundColor: color,
    color: isColorBright(color) ? 'black' : 'white',
  };

  return (
    <div className='badge badge-pill mx-1' style={{ ...badgeStyle, whiteSpace: 'break-spaces' }}>
      {props.value}
    </div>
  )
};

export default RandomColorBadge;