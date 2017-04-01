var expect = require('expect');
Browser = require('zombie');

var port = process.env.PORT || 3000;

require('../../app');


describe('User visit to do page', function(){

  before(function(done) {
    this.browser = new Browser({site: "http://localhost:" + port});
    this.browser.visit('/todo', done);
  });

  it('should reach todo page', function(){
    expect(this.browser.location.toString()).toEqual("http://localhost:" + port + "/todo");
    expect(this.browser.success).toBe(true);
    expect(this.browser.html('#add-item')).toBe('');
    expect(this.browser.html('#add')).toInclude('Add');
  });

  it('should show added item', function(){
    var browser = this.browser;
    browser.fill('item', 'clean the house');
    browser.pressButton('Add').then(function(){
      expect(browser.html()).toInclude('clean the house');
    });
  });

  it('should not show deleted item', function(){
    var browser = this.browser;
    browser.fill('item', 'clean the house');
    browser.evaluate("$('#items').click()", function(){
      expect(browser.html()).not.toInclude('clean the house')
    });
  });

});
