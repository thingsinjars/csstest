(function(window, document) {
  // If this is running with socket.io
  if(typeof io !== "undefined") {
    // Connect to the slide server and listen for change messages
    // The socket.io client side library connects to your server, the node address
    // can be a domain name or an ip address.
    var socket = io.connect('http://' + window.location.hostname);

    // When the server pushes a message handle it accordingly
    socket.on('message', function(e) {
      e = JSON.parse(e);
      // Set the hash to match the state
      if(e.state) {
        location.hash = e.state;
      }

    });


    csstest._setHash = csstest.setHash;
    csstest.setHash = function(i) {
      $.get('/seit/' + i);
      csstest._setHash(i);
    };
    ///
    // 'Next slide view' on a touch device
    ///
    if("ontouchstart" in document) {
      // For when I'm looking at my notes on my phone
      $('body').removeClass('projector').addClass("phone");
    } else {
      // If this isn't 'next slide view',
      // attach a keyevent handler to sync current page
      $(document).on('keydown', function(e) {
        var target = opener ? opener : window;
        if(e.which === 83) {
          $.get('/seit/' + csstest.currentIndex);
        }
      });
    }
  }
})(this, this.document);