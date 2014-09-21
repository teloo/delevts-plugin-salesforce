var _ = require('underscore');

var VALID_USERNAME = 'VALID USERNAME';
var VALID_PASSWORD = 'VALID PASSWORD';
var VALID_SECURITY_TOKEN = 'VALID SECURITY TOKEN';

var events = [];

var login = function(username, password, callback) {
  if (username === VALID_USERNAME && password === VALID_PASSWORD + VALID_SECURITY_TOKEN) {
    callback(null, {});
    return;
  }
  callback(new Error('StubError: Failed to login'));
};

var sobject = function(objectType) {
  if (objectType !== 'Event') {
    throw new Error('StubError: Type is not "Event"');
  }
  return {
    find: find,
    destroy: destroy
  };
};

var find = function(conditions, fields) {
  if (!conditions || !_.has(conditions, 'OwnerId')) {
    throw new Error('StubError: conditions.OwnerId is needed');
  }
  if (!_.every(['Id', 'IsRecurrence'], function(field) {
    return _.contains(fields, field);
  }) && fields.length !== 3) {
    throw new Error('StubError: expected fields to ["Id", "IsDeleted", "IsRecurrence"]');
  }
  return {
    execute: execute
  };
};

var execute = function(callback) {
  callback(null, events);
};

var destroy = function(ids, callback) {
  var deletedEvents = _.filter(events, function(event) {
    return _.contains(ids, event.Id);
  });
  events = _.reject(events, function(event) {
    return _.contains(ids, event.Id);
  });
  callback(null, _.map(deletedEvents, function() {
    return {
      success: true
    };
  }));
};

var Connection = function() {
  this.login = login;
  this.sobject = sobject;
};

var pushEvents = function(event) {
  events.push(event);
};

var countEvents = function() {
  return events.length;
};

var clearEvents = function() {
  events = [];
};

exports.Connection = Connection;
exports.pushEvents = pushEvents;
exports.countEvents = countEvents;
exports.clearEvents = clearEvents;
