var delevtsSalesforce = require('../lib');

delevtsSalesforce.deleteEvents({
  username: '<Salesforce account username>',
  password: '<Salesforce account password>',
  securityToken: '<Salesforce account security token>'
}, function(err, count) {
  if (err) {
    throw err;
  }
  console.log('Count: ' + count);
});
