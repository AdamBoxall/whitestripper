var fs = require('fs');

fs.open('./test.txt', 'r+', function(err, fd) {
  fs.write(fd, 'foo', 4, function(err, written, string) {
    console.log(err, written, string);
  });
});
