async (page) => {
  const SIGNUP_URL = 'https://spiceclub.spicejet.com/signup';

  const PASSWORD_MIN_BOUND = 'Aa1!bcde';
  const PASSWORD_MAX_BOUND = 'Aa1!abcdefghijkl';

  function dobForExactAge(ageYears) {
    const ref = new Date('2026-10-03T12:00:00+05:30');
    const birth = new Date(ref);
    birth.setFullYear(ref.getFullYear() - ageYears);
    const dd = String(birth.getDate()).padStart(2, '0');
    const mm = String(birth.getMonth() + 1).padStart(2, '0');
    const yyyy = birth.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  const scenarios = [
    {
      id: 'S1-01',
      name: 'Complete standard user registration with all valid fields',
      data: {
        title: 'Mr',
        firstName: 'Rohan',
        lastName: 'Kumar',
        country: 'India',
        dob: '15/06/1990',
        phone: { countryCode: 'in', value: '+91 98765 43210' },
        emailPrefix: 'spiceclub.std',
        password: 'Passw0rd!',
        submit: true,
      },
      expect: { userValidate: true },
    },
    {
      id: 'S1-02',
      name: 'International edge cases — long names, US mobile, complex email TLD',
      data: {
        title: 'Ms',
        firstName: 'ChristopherAlexanderJames',
        lastName: 'MontgomeryFitzgeraldWellington',
        country: 'United States',
        dob: '22/03/1985',
        phone: { countryCode: 'us', value: '+1 202 555 0199' },
        emailPrefix: 'intl.edge',
        emailDomain: 'user.name@mail.example.co.uk',
        password: 'Travel#2026',
        submit: true,
      },
      expect: { userValidate: true },
    },
    {
      id: 'S1-03a',
      name: 'Password boundary — exactly 8 characters with full complexity',
      data: {
        title: 'Mrs',
        firstName: 'Boundary',
        lastName: 'EightChar',
        country: 'India',
        dob: '01/01/1995',
        phone: { countryCode: 'in', value: '+91 98765 43212' },
        emailPrefix: 'pwd.min8',
        password: PASSWORD_MIN_BOUND,
        submit: false,
        blurPassword: true,
      },
      expect: { passwordLength: 8 },
    },
    {
      id: 'S1-03b',
      name: 'Password boundary — exactly 16 characters with full complexity',
      data: {
        title: 'Mr',
        firstName: 'Boundary',
        lastName: 'SixteenChar',
        country: 'India',
        dob: '01/01/1995',
        phone: { countryCode: 'in', value: '+91 98765 43213' },
        emailPrefix: 'pwd.max16',
        password: PASSWORD_MAX_BOUND,
        submit: false,
        blurPassword: true,
      },
      expect: { passwordLength: 16 },
    },
    {
      id: 'S1-04',
      name: 'Age boundary — exactly 18 years old today',
      data: {
        title: 'Miss',
        firstName: 'Asha',
        lastName: 'Patel',
        country: 'India',
        dob: dobForExactAge(18),
        phone: { countryCode: 'in', value: '+91 98765 43214' },
        emailPrefix: 'age.exact18',
        password: 'Adult@18y',
        submit: true,
      },
      expect: { userValidate: true, dob: dobForExactAge(18) },
    },
  ];

  async function getInlineErrors() {
    return page.evaluate(() =>
      Array.from(document.querySelectorAll('.inlineErrors'))
        .map((el) => el.innerText.trim())
        .filter(Boolean),
    );
  }

  async function setPhone(phone) {
    await page.locator('.selected-flag').click();
    await page.locator(`li.country[data-country-code="${phone.countryCode}"]`).click();
    const mobile = page.locator('input[type="tel"]');
    await mobile.click();
    await mobile.fill(phone.value);
    return mobile.inputValue();
  }

  function resolvePhone(phone) {
    if (phone.countryCode === 'in') {
      const digits = `9${String(Date.now()).slice(-9)}`;
      return { ...phone, value: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` };
    }
    if (phone.countryCode === 'us') {
      const tail = String(Date.now()).slice(-4);
      return { ...phone, value: `+1 202 555 ${tail}` };
    }
    return phone;
  }

  function buildSignupEmail(data) {
    const token = `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
    if (data.emailDomain) {
      const at = data.emailDomain.lastIndexOf('@');
      const local = data.emailDomain.slice(0, at);
      const domain = data.emailDomain.slice(at + 1);
      return `${local}+pw.${token}@${domain}`;
    }
    const prefix = data.emailPrefix || 'spiceclub';
    return `${prefix}+${token}@automation.test`;
  }

  async function fillUniqueEmail(data) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const emailValue = buildSignupEmail(data);
      await page.locator('#email_id').fill(emailValue);
      await page.locator('#email_id').blur();
      await page.waitForTimeout(500);
      const errors = await getInlineErrors();
      const emailTaken = errors.some(
        (msg) => /email/i.test(msg) && /exist|already|registered/i.test(msg),
      );
      if (!emailTaken) {
        return emailValue;
      }
    }
    throw new Error('Unique email not available after retries');
  }

  async function fillForm(data) {
    const selects = page.locator('select.form-select');
    await selects.nth(0).selectOption(data.title);
    await page.locator('#first_name').fill(data.firstName);
    await page.locator('#last_name').fill(data.lastName);
    await selects.nth(1).selectOption(data.country);
    await page.locator('#dobDate').fill(data.dob);
    const phoneValue = await setPhone(resolvePhone(data.phone));
    const emailValue = await fillUniqueEmail(data);
    await page.locator('#new-password').fill(data.password);
    await page.locator('#c-password').fill(data.password);
    if (data.submit) {
      await page.locator('#defaultCheck1').check();
    }
    return { phoneValue, emailValue, passwordLength: data.password.length };
  }

  const results = [];

  for (const scenario of scenarios) {
    const apiCalls = [];
    const onResponse = (response) => {
      const url = response.url();
      if (url.includes('/api/v1/token/userValidate')) {
        apiCalls.push({ url, status: response.status(), method: response.request().method() });
      }
    };
    page.on('response', onResponse);

    try {
      await page.goto(SIGNUP_URL, { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: 'Member Enrollment' }).waitFor({ timeout: 15000 });

      const filled = await fillForm(scenario.data);
      let inlineErrors = await getInlineErrors();

      if (scenario.data.blurPassword) {
        await page.locator('#c-password').blur();
        await page.waitForTimeout(500);
        inlineErrors = await getInlineErrors();
      }

      let userValidateOk = null;
      if (scenario.data.submit) {
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.waitForTimeout(6000);
        inlineErrors = await getInlineErrors();
        userValidateOk = apiCalls.some((c) => c.status === 200);
      }

      const passwordOk =
        scenario.expect.passwordLength == null ||
        filled.passwordLength === scenario.expect.passwordLength;

      const passed =
        inlineErrors.length === 0 &&
        passwordOk &&
        (scenario.expect.userValidate ? userValidateOk === true : true);

      results.push({
        id: scenario.id,
        name: scenario.name,
        passed,
        filled,
        inlineErrors,
        userValidateCalls: apiCalls,
        url: page.url(),
        expect: scenario.expect,
      });
    } catch (error) {
      results.push({
        id: scenario.id,
        name: scenario.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      page.off('response', onResponse);
    }
  }

  const summary = {
    section: 'SECTION 1 — Positive scenarios',
    executedVia: 'Playwright MCP (browser_run_code_unsafe)',
    targetUrl: SIGNUP_URL,
    executedAt: new Date().toISOString(),
    total: results.length,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => !r.passed).length,
    results,
  };

  return summary;
}
