// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //PROJECT LEVEL RUN

  testDir: './tests',
  //global labell for ACtion
 
  //maximum time one test canrun for.
    timeout: 30*1000,

  expect:  {
    timeout:5000
  },
  reporter :'html',

  use:{
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    browserName :"chromium",
    headless : true,
    screenshot :'on', // it is using to take the Screenshot
    trace : 'retain-on-failure', //Trace is useful to take the detailed information of executing testcases.
    //It shows the failure reason as wll .we can set Trace 's value by thee way-on,off and retain-on-failure.
   
  },
  
 

  /* Configure projects for major browsers */
  //projects: [
   // {
   //   name: 'chromium',
   //   use: { ...devices['Desktop Chrome'] },
   // },

  

 
});

