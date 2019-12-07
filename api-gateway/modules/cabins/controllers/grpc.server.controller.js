/**
 * List all cabins
 * @controller List
 * @param {IncommingMessage} req The request
 * @param {OutcommingMessage} res The response
 */
exports.list = async function list(req, res) {
  const { cabins } = req.clients;
  const { $skip = 0, $top = 20 } = req.query;
  const data = await cabins.getService('CabinService').list({
    skip: Number.isNaN($skip) ? 0 : parseInt($skip, 10),
    top: Number.isNaN($top) ? 10 : parseInt($top, 10),
  }).toPromise();
  res.json(data);
};

/**
 * Create new cabine
 * @controller Create
 * @param {IncommingMessage} req The request
 * @param {OutcommingMessage} res The response
 */
exports.create = async function create(req, res) {
  const { cabins } = req.clients;
  const { body } = req;
  const data = await cabins
    .getService('CabinService')
    .create(body)
    .toPromise();
  res.json(data);
};
