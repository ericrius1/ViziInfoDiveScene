G.ArcCloner = function(params) {
  Vizi.Object.call(this)
  this.transform.position.copy(params.position)
  this.params = params;
}
goog.inherits(G.ArcCloner, Vizi.Object);

G.ArcCloner.prototype.spawnPrimitives = function() {
  for (var i = 0; i < this.params.num; i++) {
    var primitive = new G.ArcPrimitive(this.params);
    var visibilityEffector = new VisibilityEffector(G.dolly, {distance: 400});
    primitive.addComponent(visibilityEffector)
    this.addChild(primitive)
    primitive.addEventListener('distancethreshold', function(){
      this.growStrand(0)
    }.bind(primitive));
  }

}

G.ArcPrimitive = function(params) {
  Vizi.Object.call(this)
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

  var SUBDIVISIONS = 100;

  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.QuadraticBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(G.rf(1, 10), G.rf(10, 20), 0);
  curve.v2 = new THREE.Vector3(G.rf(10, 30), 0, 0);

  var opacity = this.strandMat.attributes.opacity.value
  for (var j = 0; j < SUBDIVISIONS; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / SUBDIVISIONS))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, this.strandMat)
  strand.scale.set(G.rf(params.scaleRange.start, params.scaleRange.end), G.rf(params.scaleRange.start, params.scaleRange.end), G.rf(params.scaleRange.start, params.scaleRange.end));
  strand.rotation.set(0, G.rf(params.rotRange.start, params.rotRange.end), 0)

  var visual = new Vizi.Visual({
    object: strand
  });
  this.addComponent(visual);
  this.transform.position.set(G.rf(params.posRange.x.start, params.posRange.x.end), G.rf(params.posRange.y.start, params.posRange.y.end), G.rf(params.posRange.z.start, params.posRange.z.end));

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