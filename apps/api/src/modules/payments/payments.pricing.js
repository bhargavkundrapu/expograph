/**
 * Platform fee added at checkout (must match Razorpay order amount = base + fee).
 * Single source for payment breakdown and invoice line items.
 */
const PLATFORM_FEE_COURSE_PAISE = 700; // ₹7 per course
const PLATFORM_FEE_PACK_PAISE = 1400; // ₹14 for full pack

function platformFeePaiseForItemType(item_type) {
  if (item_type === "course") return PLATFORM_FEE_COURSE_PAISE;
  if (item_type === "pack") return PLATFORM_FEE_PACK_PAISE;
  return 0;
}

/** @param {string} item_type @param {number} totalPaise charged (base + platform fee) */
function splitTotalAmount(item_type, totalPaise) {
  const fee = platformFeePaiseForItemType(item_type);
  const total = Number(totalPaise) || 0;
  const base = Math.max(0, total - fee);
  return {
    basePaise: base,
    platformFeePaise: fee,
    totalPaise: total,
  };
}

module.exports = {
  PLATFORM_FEE_COURSE_PAISE,
  PLATFORM_FEE_PACK_PAISE,
  platformFeePaiseForItemType,
  splitTotalAmount,
};
