
G.CurveDotPrimitive = function(params) {
  Vizi.Object.call(this)
  this.subdivisions = 100
  this.dotScale = 0.01;
  this.percentFullScale = .1 // dot will be full scale by 10% of curve
  this.strandMat = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        type: 'c',
        value: new THREE.Color(_.sample(G.colorPalette))
      }
    },
    attributes: {
      opacity: {
        type: 'f',
        value: []
      },
    },
    vertexShader: G.shaders.vs.strand,
    fragmentShader: G.shaders.fs.strand,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });


  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.QuadraticBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(G.rf(1, 10), G.rf(10, 20), 0);
  curve.v2 = new THREE.Vector3(G.rf(10, 30), 0, 0);

  var opacity = this.strandMat.attributes.opacity.value
  for (var j = 0; j < this.subdivisions; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / this.subdivisions))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  this.strand = new THREE.Line(strandGeometry, this.strandMat)

  var visual = new Vizi.Visual({
    object: this.strand
  });
  this.addComponent(visual);

  this.dot = new Vizi.Object();
  visual = new Vizi.Visual({
    geometry: new THREE.SphereGeometry(1, 12, 10),
    material: _.sample(G.materials)
  });
  this.dot.addComponent(visual);
  this.dot.transform.scale.set(this.dotScale, this.dotScale, this.dotScale)

  

  this.strand.material.attributes.opacity.needsUpdate = true
}

goog.inherits(G.CurveDotPrimitive, Vizi.Object);

G.CurveDotPrimitive.prototype.appear = function(vertexIndex) {
  this.growStrand(0)
}

G.CurveDotPrimitive.prototype.growStrand = function(vertexIndex){
  if(vertexIndex === 0){
    G.app.addObject(this.dot);
  }
  var worldPos = this.strand.geometry.vertices[vertexIndex].clone();
  worldPos.applyMatrix4(this.strand.matrixWorld);
  this.dot.transform.position.set(worldPos.x, worldPos.y, worldPos.z)
  if(vertexIndex <= this.subdivisions *this.percentFullScale){
    var scale = G.map(vertexIndex, 0, this.subdivisions * this.percentFullScale, 0.01, 1);
    this.dot.transform.scale.set(scale, scale, scale)
  }
  var opacity = this.strandMat.attributes.opacity;
  opacity.value[vertexIndex++] = 1;
  opacity.needsUpdate = true
  if (vertexIndex === opacity.value.length) return

  setTimeout(function() {
    this.growStrand(vertexIndex);
  }.bind(this), 30)
}