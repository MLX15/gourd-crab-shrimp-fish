const randomBgc = () => {
  const backgrounds = ['bg-red-400', 'bg-green-400', 'bg-green-400', 'bg-blue-400', 'bg-sky-400'];

  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

export default randomBgc;
