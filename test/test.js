var expect = require('expect.js');
var proxyquire = require('proxyquire');
var jsforceStub = require('./jsforce-stub');
var pluginSalesforce = proxyquire('../lib', {'jsforce': jsforceStub});

var VALID_USERNAME = 'VALID USERNAME';
var VALID_PASSWORD = 'VALID PASSWORD';
var VALID_SECURITY_TOKEN = 'VALID SECURITY TOKEN';

describe('deleteEvents', function() {
  beforeEach(function(done) {
    jsforceStub.clearEvents();
    done();
  });

  it('delete zero events', function(done) {
    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err).to.be(null);
      expect(count).to.be(0);
      expect(jsforceStub.countEvents()).to.be(0);
      done();
    });
  });

  it('delete one event', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err).to.be(null);
      expect(count).to.be(1);
      expect(jsforceStub.countEvents()).to.be(0);
      done();
    });
  });

  it('delete two events', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });
    jsforceStub.pushEvents({
      Id: 'def',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err).to.be(null);
      expect(count).to.be(2);
      expect(jsforceStub.countEvents()).to.be(0);
      done();
    });
  });

  it('cause error when username is undefined', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: undefined,
      password: VALID_PASSWORD,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err.message).to.be('Set username in the config file');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when username is null', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: null,
      password: VALID_PASSWORD,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err.message).to.be('Set username in the config file');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when username is invalid', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: 'invalid',
      password: VALID_PASSWORD,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err.message).to.be('Failed to login. Detail: "StubError: Failed to login"');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when password is undefined', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: undefined,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err.message).to.be('Set password in the config file');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when password is null', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: null,
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err.message).to.be('Set password in the config file');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when password is invalid', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: 'invalid',
      securityToken: VALID_SECURITY_TOKEN
    }, function(err, count) {
      expect(err.message).to.be('Failed to login. Detail: "StubError: Failed to login"');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when securityToken is undefined', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
      securityToken: undefined
    }, function(err, count) {
      expect(err.message).to.be('Failed to login. Detail: "StubError: Failed to login"');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when securityToken is null', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
      securityToken: null
    }, function(err, count) {
      expect(err.message).to.be('Failed to login. Detail: "StubError: Failed to login"');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });

  it('cause error when securityToken is invalid', function(done) {
    jsforceStub.pushEvents({
      Id: 'abc',
      IsDeleted: false,
      IsRecurrence: false
    });

    pluginSalesforce.deleteEvents({
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
      securityToken: 'invalid'
    }, function(err, count) {
      expect(err.message).to.be('Failed to login. Detail: "StubError: Failed to login"');
      expect(count).to.be(undefined);
      expect(jsforceStub.countEvents()).to.be(1);
      done();
    });
  });
});
