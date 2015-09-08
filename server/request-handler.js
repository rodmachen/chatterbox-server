var database = {
  results: [
    {
      username: 'taylor',
      text: 'whatsup',
      roomname: 'myRoom',
    },
    {
      username: 'rod',
      text: 'hey',
      roomname: 'myRoom',
    },
    {
      username: 'stephan',
      text: 'what',
      roomname: 'myRoom',
    },
  ],
};

exports.requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  if (request.url !== '/classes/messages' && request.url !== '/classes/room1') {
    response.writeHead(404, headers);
    response.end();
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end();
  }

  if (request.method === 'GET') {
    response.writeHead(200, headers);
    response.end(JSON.stringify(database));
  }

  if (request.method === 'POST') {
    // add message to database results array
    // database.results.push(JSON.stringify(request.data));
    var item = '';
    var statusCode = 201;
    request.setEncoding('utf8');
    request.on('data', function(data) {
      item = item + data;
    });

    request.on('end', function() {
      database.results.unshift(JSON.parse(item));
      console.log(database.results[0].username);
      item = '';

      // .writeHead() writes to the request line and headers of the response,
      // which includes the status and all headers.
      response.writeHead(statusCode, headers);
      response.end();
    });
  }
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

// module.exports = requestHandler;

