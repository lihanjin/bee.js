var test = require('tape');
var Bee = require('../../');
var $ = require('jquery')
if(typeof window === 'undefined') {
  $ = $(Bee.doc.parentWindow)
}

test('b-if', function(t) {
  var tpl = '<span><span b-if="flag" b-ref="span">{{text}}</span></span>'

  var bee = new Bee(tpl, {$data: {flag: true, text: 'text'}})

  t.equal($(bee.$refs.span).text(), 'text', 'all right when true')

  bee.$set('flag', false)
  bee.$set('text', 'test')
  t.equal($(bee.$refs.span).text(), 'text', 'hide form change')

  bee.$set('flag', true)
  t.equal($(bee.$refs.span).text(), 'test', 'show again')

  t.end();
})

test('b-if-start, b-if-end', function(t) {
  var Test = Bee.tag('test', {});
  var tpl = '<div><span b-if-start="flag">{{text}}</span><div>123</div><div b-if-end>456</div></div>'

  var bee = new Bee(tpl, {$data: {flag: true, text: 'text'}})

  t.equal($(bee.$el).text(), 'text123456', 'all right when true')

  bee.$set('flag', false)
  bee.$set('text', 'test')
  t.equal($(bee.$el).text(), '', 'hide form change')

  bee.$set('flag', true)
  t.equal($(bee.$el).text(), 'test123456', 'show again')

  t.end();
})

test('component b-if', function(t) {
  var Test = Bee.tag('test', {
    $tpl: '<div>test</div>'
  })

  var tpl = '<div><span b-component="test" b-if="flag"></span></div>'
  var bee = new Bee(tpl)

  t.equal($(bee.$el).text(), '')

  bee.$set('flag', true)

  t.equal($(bee.$el).text(), 'test')

  t.end()
})