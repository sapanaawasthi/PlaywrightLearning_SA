/**
 * Unique E.164-style values for react-tel-input (avoids duplicate-mobile errors in sequential runs).
 * @param {{ countryCode: string, value: string }} phone
 */
function resolveUniquePhone(phone) {
  const stamp = Date.now();
  if (phone.countryCode === 'in') {
    const digits = `9${String(stamp).slice(-9)}`;
    return { ...phone, value: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` };
  }
  if (phone.countryCode === 'us') {
    const tail = String(stamp).slice(-4);
    return { ...phone, value: `+1 202 555 ${tail}` };
  }
  return phone;
}

module.exports = { resolveUniquePhone };
