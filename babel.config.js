module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          chrome: "98",
          firefox: "97",
          safari: "15",
        },
      },
    ],
  ],
};
