Connections = {
  count: 0,
  ports: {}
};

function broadcast(msg) {
  Object.keys(Connections.ports).forEach(function (pid) {
    Connections.ports[pid].postMessage(msg);
  });
}

function newid() {
  return Math.floor(new Date().getTime() * Math.random());
}

onconnect = function(oev) {
  var port = oev.ports[0];
  var id = newid();
  Connections.ports[id] = port;
  Connections.count++;

  broadcast({
    id: id,
    status: "connected",
    count: Connections.count,
    keys: Object.keys(Connections.ports)
  });

  port.onmessage = function(iev) {
    if(iev.data.status === "close") {
      delete Connections.ports[iev.data.id];
      Connections.count--;
      broadcast({ status: "closed", id: iev.data.id });
    } else {
      broadcast({ payload: iev.data });
    }
  };
};
