var _ = require('underscore');
var jsforce = require('jsforce');

var deleteEvents = function(config) {
  if (!config.username) {
    throw new Error('"username" property is needed.');
  }
  if (!config.password) {
    throw new Error('"password" property is needed.');
  }

  doDeleteEvents(config);
};

var doDeleteEvents = function(config) {
  var username = config.username;
  var securityToken = config.securityToken ? config.securityToken : '';
  var password = config.password + securityToken;
  var conn = new jsforce.Connection();

  conn.login(username, password, function(err, res) {
    if (err) {
      throw new Error('Failed to login.');
    }
    findAll(conn, function(err, records) {
      if (err) {
        throw err;
      }

      var ids = _.sortBy(records, function(record) {
        return record.IsRecurrence ? 1 : 0;
      }).map(function(record){
        return record.Id;
      });

      destroy(conn, ids, function(err, ret) {
        if (err) {
          throw err;
        }
      });
    });
  });
};

var findAll = function(conn, callback) {
  conn.sobject('Event')
    .find(null, ['Id', 'IsDeleted', 'IsRecurrence'])
    .execute(callback);
};

var destroy = function(conn, ids, callback) {
  conn.sobject('Event')
    .destroy(ids, callback);
};

exports.deleteEvents = deleteEvents;
