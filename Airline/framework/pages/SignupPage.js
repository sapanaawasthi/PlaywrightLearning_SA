const { environment } = require('../config/environment');
const { resolveUniquePhone } = require('../utils/phone');
const { buildSignupEmail } = require('../utils/email');

/**
 * Page Object Model for SpiceClub member enrollment (signup).
 * Used by local Playwright tests; MCP runner mirrors these selectors.
 */
class SignupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = environment.signupUrl;
    this.titleSelect = page.locator('select.form-select').first();
    this.countrySelect = page.locator('select.form-select').nth(1);
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.dob = page.locator('#dobDate');
    this.mobile = page.locator('input[type="tel"]');
    this.email = page.locator('#email_id');
    this.password = page.locator('#new-password');
    this.confirmPassword = page.locator('#c-password');
    this.termsCheckbox = page.locator('#defaultCheck1');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.phoneFlag = page.locator('.selected-flag');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.getByRole('heading', { name: 'Member Enrollment' }).waitFor();
  }

  /**
   * @param {{ countryCode: string, value: string }} phone
   */
  async setPhone(phone) {
    await this.phoneFlag.click();
    await this.page.locator(`li.country[data-country-code="${phone.countryCode}"]`).click();
    await this.mobile.click();
    await this.mobile.fill(phone.value);
  }

  async fillRegistration(data) {
    await this.titleSelect.selectOption(data.title);
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.countrySelect.selectOption(data.country);
    await this.dob.fill(data.dob);
    await this.setPhone(resolveUniquePhone(data.phone));
    await this.fillUniqueEmail(data);
    await this.password.fill(data.password);
    await this.confirmPassword.fill(data.password);
    if (!data.validatePasswordOnly) {
      await this.termsCheckbox.check();
    }
  }

  /**
   * Fills email and blurs; retries once if server reports duplicate email.
   * @returns {Promise<string>} address used
   */
  async fillUniqueEmail(data) {
    const maxAttempts = 3;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const email = buildSignupEmail(data);
      await this.email.fill(email);
      await this.email.blur();
      await this.page.waitForTimeout(500);
      const errors = await this.inlineErrors();
      const emailTaken = errors.some((msg) =>
        /email/i.test(msg) && /exist|already|registered/i.test(msg),
      );
      if (!emailTaken) {
        return email;
      }
    }
    throw new Error(
      'Could not obtain a unique email after retries (Member account exists with given email ID).',
    );
  }

  async inlineErrors() {
    return this.page.evaluate(() =>
      Array.from(document.querySelectorAll('.inlineErrors'))
        .map((el) => el.innerText.trim())
        .filter(Boolean),
    );
  }
}

module.exports = { SignupPage };
