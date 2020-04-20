const { STS } = require('aws-sdk');

module.exports = async () => await new STS()
  .getCallerIdentity()
  .promise()
  .then(res => { console.log(res.Account); return res.Account })
