G.Fresnal = function() {
  G.Primitive.apply(this, arguments);

  this._dTheta = 0.01

}

G.Fresnal.prototype = Object.create(G.Primitive.prototype);
G.Fresnal.prototype.constructor = G.Fresnal;


G.Fresnal.prototype.create = function(spawnPoint, sizeRange) {
  var geometry = new THREE.Geometry();
  var R = 100

  for (var y = 0; y < 100; y += 1) {
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

  pCloud.position.copy(spawnPoint);
  // pCloud.scale.multiplyScalar(G.rf(sizeRange.start, sizeRange.end));
  G.scene.add(pCloud);

}