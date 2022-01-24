const randomBorderColor = () => {
  const borderColors = [
    'border-red-400',
    'border-green-400',
    'border-green-400',
    'border-blue-400',
    'border-sky-400',
    'border-purple-400',
    'border-orange-400',
  ];

  return borderColors[Math.floor(Math.random() * borderColors.length)];
};

export default randomBorderColor;
