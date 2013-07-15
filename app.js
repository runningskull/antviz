;(function() {

var container = document.getElementById('display')
var two = new Two({
   width: 640
  ,height: 480
}).appendTo(container)


window.shiner = new Ant(two, {
  meat: 'mouth'
})

shiner.draw()



two.bind('update', function() {
}).play()


}());
