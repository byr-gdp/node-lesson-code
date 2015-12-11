for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 5);
}

for(var i = 0; i < 5; i++) {
  (function(idx) {
    setTimeout(function() {
      console.log(idx);
    }, 5);
  })(i);
}