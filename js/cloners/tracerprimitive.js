G.TracerPrimitive = function(params) {
  var obj = new Vizi.Object;

  var script = new G.TracerPrimitiveScript(params, obj);
  obj.addComponent(script);

  return obj;
}

G.TracerPrimitiveScript = function(params) {
  Vizi.Script.call(this, params);
  this.params = params;

  this.visible = false;
  this.shown = false;
}

goog.inherits(G.TracerPrimitiveScript, Vizi.Script);

G.TracerPrimitiveScript.prototype.realize = function() {

  Vizi.Script.prototype.realize.call(this);
  this.growTime = G.rf(10, 30)
  this._numSteps = 1000;
  this._step = 1 / this._numSteps;
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
  var points = [];

  points.push(new THREE.Vector3(G.rf(-50, -40), 5, 0))
  points.push(new THREE.Vector3(G.rf(-40, -30), 0, 0))
  points.push(new THREE.Vector3(G.rf(-30, -20), 5, 0))
  points.push(new THREE.Vector3(G.rf(-20, -10), 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(G.rf(10, 20), 0, 0))
  points.push(new THREE.Vector3(G.rf(20, 30), 5, 0))
  points.push(new THREE.Vector3(G.rf(30, 40), 0, 0))
  points.push(new THREE.Vector3(G.rf(40, 50), 5, 0))
  var tracerPath = new THREE.SplineCurve3(points);

  var opacity = this.strandMat.attributes.opacity.value
  for (var j = 0; j < 1; j+=this._step) {
    var point = tracerPath.getPoint(j)
    strandGeometry.vertices.push(point.clone())
    opacity.push(0.0);
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, this.strandMat)

  var visual = new Vizi.Visual({
    object: strand
  });
  this._object.addComponent(visual);
  strand.material.attributes.opacity.needsUpdate = true;
}

G.TracerPrimitiveScript.prototype.update = function() {
  if (this.visible && !this.shown) {
    this.growStrand(0);
    this.shown = true;
  }
}

G.TracerPrimitiveScript.prototype.appear = function(vertexIndex) {
  this.visible = true;
}

G.TracerPrimitiveScript.prototype.growStrand = function(vertexIndex){
  var opacity = this.strandMat.attributes.opacity;
  opacity.value[vertexIndex++] = 1;
  opacity.needsUpdate = true
  if (vertexIndex === opacity.value.length) return

  setTimeout(function() {
    this.growStrand(vertexIndex);
  }.bind(this), this.growTime)

}