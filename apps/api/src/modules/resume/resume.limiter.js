/**
 * Concurrency limiter for resume PDF generation (no Redis).
 * Max 4 concurrent compiles, waiting queue max 50; beyond that return 429.
 */
const { env } = require("../../config/env");

const MAX_CONCURRENT = env.RESUME_PDF_MAX_CONCURRENCY || 4;
const MAX_QUEUE = 50;

let active = 0;
const queue = [];

function runWithResumeLimiter(fn) {
  return new Promise((resolve, reject) => {
    const task = () => {
      active++;
      Promise.resolve(fn())
        .then((result) => {
          active--;
          resolve(result);
          drain();
        })
        .catch((err) => {
          active--;
          reject(err);
          drain();
        });
    };

    function drain() {
      if (queue.length > 0 && active < MAX_CONCURRENT) {
        const next = queue.shift();
        next();
      }
    }

    if (active < MAX_CONCURRENT) {
      task();
    } else if (queue.length < MAX_QUEUE) {
      queue.push(task);
    } else {
      resolve("queue_full");
    }
  });
}

module.exports = { runWithResumeLimiter };
