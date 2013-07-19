;(function() {

var Vector = Two.Vector


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~ Drawing

function asSquare() {
  this.prototype.draw = function() {
    var p = this.position
      , s = this._.size

    this.shape = this.two.makeRectangle(p.x, p.y, s, s)
    this.shape.fill = this._.fill
    this.shape.stroke = this._.stroke
    this.shape.linewidth = this._.linewidth || 0
  }
}

function asCircle() {
  this.prototype.draw = function() {
    var p = this.position

    this.shape = this.two.makeCircle(p.x, p.y, this._.size)
    this.shape.fill = this._.fill
    this.shape.stroke = this._.stroke
    this.linewidth = this._.linewidth || 0
  }
}

function asTri() {
  this.prototype.draw = function() {
    var p = this.position
      , radius = this._.size / 2

    this.shape = this.two.makePolygon(p.x, p.y,
                                      p.x - radius*1.2, p.y - radius/2,
                                      p.x - radius*1.2, p.y + radius/2)

    this.shape.fill = this._.fill
    this.shape.stroke = this._.stroke
    this.shape.linewidth = this._.linewidth || 0

    this._drawDebug()
  }

  this.prototype._drawDebug = function() {
    if (!this._.debug) return;
    this.__debug || (this.__debug = {})

    var v = this.velocity.clone().normalize().multiplyScalar(100)
      , p = this.position

    this.__debug.velocity = this.two.makeLine(p.x, p.y, p.x + v.x, p.y + v.y)

    this.__debug.velocity.linewidth = 1
    this.__debug.velocity.stroke = '#ff0000'
  }
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~ Entity "Classes"

function Entity(two, options, defaults) {
  this.two = two
  this._ = _.defaults(options||{}, defaults)

  this.position = this._.position || new Vector(0, 0)
  this.velocity = this._.velocity || new Vector(0, 0)
  this.speed = this._.speed || 1

  this.draw()

  this.__name = util.hash('' + (Math.random() * Date.now()))
}

Entity.prototype.tick = function(tick) {
  this._update(tick)
}

Entity.prototype._update = function(tick) { 
  // TODO: framerate
  this.velocity = this.velocity.normalize()
  this.position.x += this.velocity.x * this.speed
  this.position.y += this.velocity.y * this.speed

  this.shape.translation = this.position
  this.shape.rotation = this._calculateRotation()
}

Entity.prototype._calculateRotation = function() {
  var velocity = this.velocity
    , angle = Math.atan(velocity.y / velocity.x)

  return this.velocity.x >= 0 ? angle : angle + Math.PI
}

//~~


function Ant(two, options) {
  Ant.super_.call(this, two, options, {
     size: 14
    ,speed: 0.3
    ,fill: '#555555'
    ,stroke: '#111111'
    ,position: new Vector(10, 10)
  })
  setTimeout(this.moveRandom.bind(this, Math.PI), util.randRange(250, 500))
}
util.inherits(Ant, Entity)
asTri.call(Ant)

Ant.prototype.moveRandom = function(turn) {
  var r = rr = this.shape.rotation
    , x = util.randRange(-turn, turn)

  r += x

  this.velocity.x = Math.cos(r)
  this.velocity.y = Math.sin(r)
  setTimeout(this.moveRandom.bind(this, Math.PI/6.0),
             util.randRange(100, 500))
}

//~~


function Food(two, options) {
  Food.super_.call(this, two, options, {
     size: 10
    ,fill: '#ff0000'
  })
  this.amount = this._.size

  setInterval(this.take.bind(this), 1000)
}
util.inherits(Food, Entity)
asCircle.call(Food)

Food.prototype.take = function(n) {
  this.amount = this.amount - (n||1)
  this.shape.scale = (this.amount / this._.size)
  this.shape.scale < 0 && (this.shape.scale = 0)
}

//~~


function Pheremone(two, options) {
  Pheremone.super_.call(this, two, options, {
     maxStrength: 100
    ,strength: 100
    ,lifetime: 6000
 
    ,size: 50
    ,fill: '#f2f2e8'
    ,position: new Vector(100, 100)
  })

  this.strength = this._.strength
  this._evaporationRate = 100 / this._.lifetime // per millisecond
}
util.inherits(Pheremone, Entity)
asCircle.call(Pheremone)

Pheremone.prototype._update = function(tick) {
  Pheremone.super_.prototype._update.call(this, tick)
  this._evaporate(tick)
}

Pheremone.prototype._evaporate = function(tick) {
  this.strength -= this._evaporationRate * (tick || 1)

  this.shape.opacity = 1 - ((this._.maxStrength - this.strength) / this._.maxStrength);
  this.shape.opacity > 0 || (this.shape.opacity = 0)
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~ "exports"

window.Ant = Ant
window.Food = Food
window.Pheremone = Pheremone

}());
