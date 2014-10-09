G.Arc = function() {
  G.Primitive.apply(this, arguments);

}

G.Arc.prototype = Object.create(G.Primitive.prototype);
G.Arc.prototype.constructor = G.Arc;

G.Arc.prototype.create = function(spawnPoint, sizeRange) {
  var strandMat = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        type: 'c',
        value: new THREE.Color(_.sample(this._colorPalette))
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

  var opacity = strandMat.attributes.opacity.value
  for (var j = 0; j < SUBDIVISIONS; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / SUBDIVISIONS))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, strandMat)
  strand.rotation.set(0, G.rf(0, Math.PI * 2), 0)
  strand.position.copy(spawnPoint)
  strand.scale.multiplyScalar(G.rf(sizeRange.start, sizeRange.end));

  G.scene.add(strand)

  strand.material.attributes.opacity.needsUpdate = true

  growStrand(strand, 0)

  function growStrand(strand, vertexIndex) {
    var opacity = strand.material.attributes.opacity;
    opacity.value[vertexIndex++] = 1;
    opacity.needsUpdate = true
    if (vertexIndex === opacity.value.length) return

    setTimeout(function() {
      growStrand(strand, vertexIndex);
    }, 30)

  }

}