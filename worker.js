var Connections = {
  count: 0,
  ports: {}
};

onconnect = function(oev) {
  var port = oev.ports[0];
  var id = Connections.count;
  Connections.ports[id] = port;
  Connections.count++;

  Object.keys(Connections.ports).forEach(function(cid) {
    Connections.ports[cid].postMessage({ status: "connected", id: id, ports: Object.keys(Connections.ports).length });
  });

  port.onmessage = function(iev) {
    if(iev.data.status === "close") {
      delete Connections.ports[iev.data.id];
      
      Object.keys(Connections.ports).forEach(function(cid) {
        Connections.ports[cid].postMessage({ status: "closed", id: iev.data.id });
      });
    } else {
      Object.keys(Connections.ports).forEach(function(cid) {
        Connections.ports[cid].postMessage({ payload: iev.data });
      });
    }
  };
};
