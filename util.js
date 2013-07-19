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

  ,hash: function(str) {
    for(var ret = 0, i = 0, len = str.length; i < len; i++)
      ret = (31 * ret + str.charCodeAt(i)) << 0;

    return ret + ''
  }

  ,randRange: function(low, high) {
    return low + (Math.random() * (high - low))
  }

}

}());
