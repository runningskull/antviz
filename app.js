;(function() {

var WIDTH = 640
  , HEIGHT = 480

var container = document.getElementById('display')
var two = new Two({
   width: 640
  ,height: 480
}).appendTo(container)


// Stores a group of entities
function Container() { this.store = {} }
Container.prototype.add = function(o) { this.store[o.__name] = o }
Container.prototype.remove = function(o) { delete this.store[o.__name] }
Container.prototype.each = function(fn) {
  var _fn = function(key) { fn(this.store[key]) }.bind(this)
  Object.keys(this.store).forEach(_fn)
}

window.game.ants = new Container()
window.game.foods = new Container()
window.game.pheremones = new Container()


var ant
for (var i=0; i<30; i++) {
  game.ants.add(new Ant(two, {
     velocity: new Two.Vector(2*Math.random()-1, 2*Math.random()-1)
    ,position: new Two.Vector(~~(WIDTH/2), ~~(HEIGHT/2))
    //,debug: true
  }))
}


var bite = new Food(two, {
  position: new Two.Vector(40, 200)
})

game.pheremones.add(new Pheremone(two, {
  position: new Two.Vector(500, 350)
}))

two.bind('update', function(frameCount, tick) {
  window.game.ants.each(function(a){ a.tick(tick) })
  window.game.foods.each(function(f){ f.tick(tick) })
  window.game.pheremones.each(function(p) { p.tick(tick) })
}).play()


}());
