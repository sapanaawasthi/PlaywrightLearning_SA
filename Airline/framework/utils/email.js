const { randomBytes } = require('crypto');

/**
 * Unique local-part token for signup (avoids "Member account exists with given email ID").
 */
function emailRunToken() {
  return `${Date.now()}-${randomBytes(4).toString('hex')}`;
}

/**
 * @param {{ emailPrefix?: string, emailDomain?: string }} options
 * @returns {string}
 */
function buildSignupEmail({ emailPrefix, emailDomain }) {
  const token = emailRunToken();
  if (emailDomain) {
    const at = emailDomain.lastIndexOf('@');
    const local = emailDomain.slice(0, at);
    const domain = emailDomain.slice(at + 1);
    return `${local}+pw.${token}@${domain}`;
  }
  const prefix = emailPrefix || 'spiceclub';
  return `${prefix}+${token}@automation.test`;
}

module.exports = { buildSignupEmail, emailRunToken };
