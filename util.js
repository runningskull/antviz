;(function() {

// ghetto module export
window.util = {
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
         value: ctor
        ,enumerable: false
        ,writable: true
        ,configurable: true
      }
    })
  }
}

}());