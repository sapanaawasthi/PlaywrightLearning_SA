/**
 * Returns DD/MM/YYYY for a person who turns `ageYears` on `referenceDate`.
 * @param {number} ageYears
 * @param {Date} [referenceDate]
 */
function dobForExactAge(ageYears, referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  const birth = new Date(ref);
  birth.setFullYear(ref.getFullYear() - ageYears);
  const dd = String(birth.getDate()).padStart(2, '0');
  const mm = String(birth.getMonth() + 1).padStart(2, '0');
  const yyyy = birth.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

module.exports = { dobForExactAge };
