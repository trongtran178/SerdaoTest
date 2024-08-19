module.exports = {
  root: true,
  extends: '@react-native',
  override: [
    {
      files: ['tests/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
