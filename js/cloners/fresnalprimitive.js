G.FresnalPrimitive = function(params) {

  var obj = new Vizi.Object;

  var script = new G.FresnalPrimitiveScript(params, obj);
  obj.addComponent(script);
  return obj;
}

G.FresnalPrimitiveScript = function(params) {
  Vizi.Script.call(this, params);
  this.params = params;
}

goog.inherits(G.FresnalPrimitiveScript, Vizi.Script);

G.FresnalPrimitiveScript.prototype.realize = function() {

  Vizi.Script.prototype.realize.call(this);
  
  this._dTheta = 0.01;
  this._material = new THREE.PointCloudMaterial({
    color: _.sample(G.colorPalette)
  });
  var geometry = new THREE.Geometry();
  var R = 100

  for (var y = 0; y < R; y += 1) {
    for (var theta = 0; theta < Math.PI / 2;) {
      var radius = Math.sqrt(R * R - y * y);
      var x = radius * Math.cos(theta);
      var z = radius * Math.sin(theta);

      //probabilties decrease as we move towards sphere edges in relation to camera

      var p1 = G.map(theta, 0, Math.PI / 2, .5, 1);
      var p2 = G.map(y, 0, 100, 1, 0.5);
      if (p1 < Math.random() && p2 < Math.random()) {

        geometry.vertices.push(new THREE.Vector3(x, -y, -z));
        geometry.vertices.push(new THREE.Vector3(-x, -y, -z));

        geometry.vertices.push(new THREE.Vector3(x, -y, z));
        geometry.vertices.push(new THREE.Vector3(-x, -y, z));

        geometry.vertices.push(new THREE.Vector3(x, y, -z));
        geometry.vertices.push(new THREE.Vector3(-x, y, -z));

        geometry.vertices.push(new THREE.Vector3(x, y, z));
        geometry.vertices.push(new THREE.Vector3(-x, y, z));
      }


      theta += this._dTheta

    }
  }
  var pCloud = new THREE.PointCloud(geometry, this._material)
  pCloud.lookAt(G.dolly.transform.position);

  var visual = new Vizi.Visual({
    object: pCloud
  })

  this._object.addComponent(visual);

}



G.FresnalPrimitiveScript.prototype.update = function() {
}

G.FresnalPrimitiveScript.prototype.appear = function() {
}