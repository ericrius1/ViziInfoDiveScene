G.CurveDotPrimitive = function(params) {
  var obj = new Vizi.Object;

  var script = new G.CurveDotPrimitiveScript(params, obj);
  obj.addComponent(script);

  return obj;
}

G.CurveDotPrimitiveScript = function(params, obj) {
  Vizi.Script.call(this);

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
  curve.v1 = new THREE.Vector3(G.rf(1, 10), G.rf(10, 15), 0);
  curve.v2 = new THREE.Vector3(G.rf(10, 30), -.5, 0);

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
  obj.addComponent(visual);

  this.dot = new Vizi.Object();
  visual = new Vizi.Visual({
    geometry: new THREE.SphereGeometry(1, 12, 10),
    material: _.sample(G.materials)
  });
  this.dot.addComponent(visual);
  // this.dot.transform.scale.set(this.dotScale, this.dotScale, this.dotScale)


  this.strand.material.attributes.opacity.needsUpdate = true

  this.visible = false;
  this.shown = false;
}

goog.inherits(G.CurveDotPrimitiveScript, Vizi.Script);

G.CurveDotPrimitiveScript.prototype.update = function() {
  if (this.visible && !this.shown) {
    this.growStrand(0);
    this.shown = true;
  }
}

G.CurveDotPrimitiveScript.prototype.appear = function(vertexIndex) {
  this.visible = true;
}

G.CurveDotPrimitiveScript.prototype.growStrand = function(vertexIndex){
  if(vertexIndex === 0){
    // G.app.addObject(this.dot);
    this._object.addChild(this.dot);
  }
  // var worldPos = this.strand.geometry.vertices[vertexIndex].clone();
  // worldPos.applyMatrix4(this.strand.matrixWorld);
  // this.dot.transform.position.set(worldPos.x, worldPos.y, worldPos.z)
  if(vertexIndex <= this.subdivisions *this.percentFullScale){
    var scale = G.map(vertexIndex, 0, this.subdivisions * this.percentFullScale, 0.01, 1);
    this.dot.transform.scale.set(scale, scale, scale)
  }
  this.dot.transform.position.copy(this.strand.geometry.vertices[vertexIndex])
  var opacity = this.strandMat.attributes.opacity;
  opacity.value[vertexIndex++] = 1;
  opacity.needsUpdate = true
  
  //stop growing strand and make dot child of strnad so if its scaling it stays attached
  if (vertexIndex === opacity.value.length){
    
    //ASK TONY: I want to remove from app and add to child of strand... why isn't it removing?
    // G.app.removeObject(this.dot)

    //then ill do
    // this.addChild(this.dot)
    return
  } 
    

  setTimeout(function() {
    this.growStrand(vertexIndex);
  }.bind(this), 30)
}