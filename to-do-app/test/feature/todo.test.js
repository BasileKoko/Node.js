var expect = require('expect');
var assert = require('assert');

Browser = require('zombie');
var port = process.env.PORT || 3000;

require('../../app');


describe('User visit to do page', function(){

  before(function(done) {
    this.browser = new Browser({site: "http://localhost:" + port});
    this.browser.visit('/todo', done);
  });

  it('should reach to do page', function(){
    expect(this.browser.location.toString()).toEqual("http://localhost:" + port + "/todo");
    expect(this.browser.success).toBe(true);
    expect(this.browser.html('#add-item')).toBe('');
    expect(this.browser.html('#add')).toInclude('Add');
  });

});
