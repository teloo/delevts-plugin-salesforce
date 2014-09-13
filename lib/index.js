var _ = require('underscore');
var jsforce = require('jsforce');

var deleteEvents = function(config, callback) {
  if (!config.username) {
    callback(new Error('Set username in the config file'));
    return;
  }
  if (!config.password) {
    callback(new Error('Set password in the config file'));
    return;
  }

  doDeleteEvents(config, callback);
};

var doDeleteEvents = function(config, callback) {
  var username = config.username;
  var securityToken = config.securityToken ? config.securityToken : '';
  var password = config.password + securityToken;
  var conn = new jsforce.Connection();

  conn.login(username, password, function(err, res) {
    if (err) {
      callback('Failed to login. Detail: ' + err.message);
      return;
    }
    findAll(conn, function(err, records) {
      if (err) {
        callback('Failed to find all events. Detail: ' + err.message);
        return;
      }

      var ids = _.sortBy(records, function(record) {
        return record.IsRecurrence ? 1 : 0;
      }).map(function(record){
        return record.Id;
      });

      destroy(conn, ids, function(err, ret) {
        if (err) {
          callback('Failed to destroy. Detail: ' + err.message);
          return;
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
