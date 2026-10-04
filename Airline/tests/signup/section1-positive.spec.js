// @ts-check
/**
 * Playwright Test specs mirroring Section 1 data.
 * Primary execution for MCP integration: Airline/framework/mcp/run-section1-positive.js
 * via Playwright MCP `browser_run_code_unsafe` (filename).
 */
const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../../framework/pages/SignupPage');
const { section1PositiveScenarios } = require('../../framework/data/section1-positive');

test.describe('Section 1 — Positive registration scenarios (local POM)', () => {
  for (const scenario of section1PositiveScenarios) {
    test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.goto();

      const userValidateOk = page.waitForResponse(
        (res) =>
          res.url().includes('/api/v1/token/userValidate') && res.status() === 200,
        { timeout: 45_000 },
      );

      await signup.fillRegistration(scenario.data);
      await userValidateOk;
      expect(await signup.inlineErrors(), 'inline validation errors').toEqual([]);

      if (scenario.data.submit) {
        await signup.submitButton.click();
        expect(await signup.inlineErrors()).toEqual([]);
      }

      if (scenario.expect.passwordLength) {
        expect(scenario.data.password.length).toBe(scenario.expect.passwordLength);
      }
    });
  }
});
