module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontSize: require('./src/tailwind/fontSize'),
    spacing: require('./src/tailwind/spacing'),
    lineHeight: require('./src/tailwind/lineHeight'),
    container: require('./src/tailwind/container'),
  },
  plugins: [],
};
