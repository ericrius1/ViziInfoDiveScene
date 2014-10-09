G.ArcClonerPrefab = function(params) {
  this._primitives = []
  var obj = new Vizi.Object;
  var tracker = new TrackerScript(G.dolly);

  for(var i = 0; i < params.num; i++){
    this._primitives.push(new G.ArcPrimitive())
  }
  obj.addComponent(tracker)
  return obj;
}


G.ArcPrimitive = function() {

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
    opacity[j] = 1.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, this.strandMat)
  strand.scale.set(G.rf(1, 10), G.rf(1, 10), 1)
  strand.rotation.set(0, G.rf(0, Math.PI * 2), 0)

  var strandObject = new Vizi.Object();
  var visual = new Vizi.Visual({
    object: strand
  });
  strandObject.addComponent(visual);
  Vizi.Application.instance.addObject(strandObject);
  strand.material.attributes.opacity.needsUpdate = true
}