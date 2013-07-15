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
      , radius = SIZE / 2

    this.shape = this.two.makePolygon(p.x, p.y,
                                      p.x - radius, p.y - radius/2,
                                      p.x - radius, p.y + radius/2)

    this.shape.fill = this._.fill
    this.shape.stroke = this._.stroke
    this.shape.linewidth = this._.linewidth || 0
  }
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~ Entity "Classes"

function Entity(two, options, defaults) {
  this.two = two
  this._ = _.defaults(options, defaults)

  this.position = this._.position || new Vector(0, 0)
  this.velocity = this._.velocity || new Vector(0, 0)
  this.speed = this._.speed || 1
}

Entity.prototype.tick = function(){}

Entity.prototype._update = function() { 
  this.velocity = this.velocity.normalize()
  this.position.x += this.velocity.x * this.speed
  this.position.y += this.velocity.y * this.speed
  this.shape.translation = this.position

  this.shape.rotation = this._calculateRotation()
}

Entity.prototype._calculateRotation = function() {
  var angle = Math.atan(velocity.y, velocity.x)
  angle < -Math.PI && (angle = angle + PI2)
  if (velocity.x < 0) { angle = Math.PI - angle }
  return angle
}

//~~

function Ant(two, options) {
  Ant.super_.call(this, two, options, {
     size: 200
    ,fill: '#555555'
    ,stroke: '#111111'
  })
}
util.inherits(Ant, Entity)
asSquare.call(Ant)

Ant.prototype.tick = function() {
}

//~~

function Food(two, options) {
  Food.super_.call(this, two, options, {
     size: 1
    ,fill: '#ff0000'
  })
}
util.inherits(Food, Entity)
asSquare.call(Food)

//~~

function Pheremone(two, options) {
  Pheremone.super_.call(this, two, options, {
  })
}
util.inherits(Pheremone, Entity)
asCircle.call(Pheremone)

Pheremone.prototype.update = function(tick) {
}

Pheremone.prototype._evaporate = function(tick) {
  this.strength -= this.evaporationRate
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~ "exports"

window.Ant = Ant
window.Food = Food
window.Pheremone = Pheremone


}());
