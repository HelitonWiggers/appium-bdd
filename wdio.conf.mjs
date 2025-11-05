export const config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  maxInstances: 1,
  logLevel: 'info',

  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    import: [
      './steps/index.js',
      './support/index.js'
    ],
    timeout: 60000,
    failFast: false,
    strict: true
  },

  services: [
    ['appium', { args: {} }],
  ],

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:app': `${process.cwd()}/apps/my-demo-app.apk`,
    'appium:noReset': true,
    'appium:newCommandTimeout': 120,
  }],

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
};
