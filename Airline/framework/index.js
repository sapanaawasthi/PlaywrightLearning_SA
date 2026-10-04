const { environment } = require('./config/environment');
const { SignupPage } = require('./pages/SignupPage');
const { section1PositiveScenarios } = require('./data/section1-positive');
const { dobForExactAge } = require('./utils/dates');
const { buildSignupEmail } = require('./utils/email');
const { resolveUniquePhone } = require('./utils/phone');

module.exports = {
  environment,
  SignupPage,
  section1PositiveScenarios,
  dobForExactAge,
  buildSignupEmail,
  resolveUniquePhone,
};
