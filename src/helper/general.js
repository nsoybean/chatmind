/**
 *
 * @param {promise} promise
 * @returns {data, error}
 */
const awaitWrap = (promise) => {
  return promise
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ error, data: null }))
}

module.exports = {
  awaitWrap
}
