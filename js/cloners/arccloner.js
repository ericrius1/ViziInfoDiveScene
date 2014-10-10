G.ArcCloner = function(params) {
  Vizi.Object.call(this)
  this.params = params;
}
goog.inherits(G.ArcCloner, Vizi.Object);

G.ArcCloner.prototype.spawnPrimitives = function() {
  for (var i = 0; i < this.params.num; i++) {
    var primitive = new G.ArcPrimitive();
    var visibilityEffector = new VisibilityEffector(G.dolly, {distance: 100});
    primitive.addComponent(visibilityEffector)
    primitive.transform.position.x = G.rf(-100, 100)
    G.app.addObject(primitive)
    primitive.addEventListener('distancethreshold', function(){
      this.growStrand(0)
    }.bind(primitive));
  }

}

G.ArcPrimitive = function() {
  Vizi.Object.call(this)
  this.strandMat = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        type: 'c',
        value: new THREE.Color(0xff0000)
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

  var SUBDIVISIONS = 100;

  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.QuadraticBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(G.rf(0.1, 1), G.rf(1, 2), 0);
  curve.v2 = new THREE.Vector3(G.rf(1, 3), 0, 0);

  var opacity = this.strandMat.attributes.opacity.value
  for (var j = 0; j < SUBDIVISIONS; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / SUBDIVISIONS))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, this.strandMat)
  strand.scale.set(G.rf(10, 100), G.rf(10, 100), 1)
  strand.rotation.set(0, G.rf(0, Math.PI * 2), 0)

  var strandObject = new Vizi.Object();
  var visual = new Vizi.Visual({
    object: strand
  });
  strandObject.addComponent(visual);
  Vizi.Application.instance.addObject(strandObject);
  strand.material.attributes.opacity.needsUpdate = true
}

goog.inherits(G.ArcPrimitive, Vizi.Object);

G.ArcPrimitive.prototype.growStrand = function(vertexIndex) {
  var opacity = this.strandMat.attributes.opacity;
  opacity.value[vertexIndex++] = 1;
  opacity.needsUpdate = true
  if (vertexIndex === opacity.value.length) return

  setTimeout(function() {
    this.growStrand(vertexIndex);
  }.bind(this), 30)
}