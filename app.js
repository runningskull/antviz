;(function() {

var container = document.getElementById('display')
var two = new Two({
   width: 640
  ,height: 480
}).appendTo(container)


window.shiner = new Ant(two, {
  meat: 'mouth'
})

window.scent = new Pheremone(two)

shiner.draw()
scent.draw()



two.bind('update', function(tick) {
  shiner.tick(tick)
  scent.tick(tick)
}).play()


}());
