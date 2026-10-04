const { dobForExactAge } = require('../utils/dates');

/** Reference date aligned with MCP execution (Oct 3, 2026). */
const REFERENCE_DATE = new Date('2026-10-03T12:00:00+05:30');

const PASSWORD_MIN_BOUND = 'Aa1!bcde';
const PASSWORD_MAX_BOUND = 'Aa1!abcdefghijkl';

const section1PositiveScenarios = [
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
    expect: { userValidate: true, noInlineErrors: true },
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
      emailDomain: 'user.name+tag@mail.example.co.uk',
      password: 'Travel#2026',
      submit: true,
    },
    expect: { userValidate: true, noInlineErrors: true },
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
      validatePasswordOnly: true,
    },
    expect: { passwordLength: 8, noInlineErrors: true },
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
      validatePasswordOnly: true,
    },
    expect: { passwordLength: 16, noInlineErrors: true },
  },
  {
    id: 'S1-04',
    name: 'Age boundary — exactly 18 years old today',
    data: {
      title: 'Miss',
      firstName: 'Asha',
      lastName: 'Patel',
      country: 'India',
      dob: dobForExactAge(18, REFERENCE_DATE),
      phone: { countryCode: 'in', value: '+91 98765 43214' },
      emailPrefix: 'age.exact18',
      password: 'Adult@18y',
      submit: true,
    },
    expect: { userValidate: true, noInlineErrors: true, dobAgeYears: 18 },
  },
];

module.exports = {
  section1PositiveScenarios,
  PASSWORD_MIN_BOUND,
  PASSWORD_MAX_BOUND,
  REFERENCE_DATE,
};
