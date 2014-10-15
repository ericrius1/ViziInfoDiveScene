// cloner system name (string)
// parent (object3D)
// position (
// objectsToClone (array)
// quantity (number)

// Create groups of clones
// Set uniform starting condition of those clones (position, rotation, scale)
// Distribute these groups of clones in varied ways. e.g.:
//   - Randomize clone position, scale and rotation within ranges (most important… gets us most of what we need)
//   - Randomize clone positions on faces of mesh (less important, but still very handy for spawning arcs on plane at start of animation, for example )
// Have clones respond to proximity / timed events. eg:
//   - Distance of camera to individual clones
//   - Time elapsed since start of animation (I suppose we can do this by simply delaying creating of the cloner system with a setTimeout, or some such)

//ranges are relative to the parent object
G.ClonerManager = function(){
 
  var visibilityEffector = new G.VisibilityEffector({distance: 600});
  var primitiveVisibilityEffector = new G.VisibilityEffector({distance: 200});
  var cloner = new G.Cloner({
    primitive: G.ArcPrimitive,
    num: 10,
    position: new THREE.Vector3(-10, 0, 300),
    posRange: {x: {start: -200, end: -20}, y: {start: 0, end: 0}, z:{start: -300, end: 0 }},
    scaleRange: { x: {start: 1, end: 2}, y: {start: 1, end: 10}, z:{start: 1, end: 2 }},
    rotRange: {start: 0, end: Math.PI * 2},
    primitiveEffectors: [primitiveVisibilityEffector]
  })
  cloner.addComponent(visibilityEffector)
  G.app.addObject(cloner)
  cloner.addEventListener('distancethreshold', function(){
    this.spawnPrimitives();
  })

  var visibilityEffector = new G.VisibilityEffector({distance: 100})
  var text = new G.TextPrimitive({
    string: "hello",
    position: new THREE.Vector3(0, 0, 200)
  })
  G.app.addObject(text)

  cloner = new G.Cloner({
    primitive: G.TracerPrimitive,
    num: 20,
    position: new THREE.Vector3(10, 0, 200),
    posRange: {x: {start: -200, end: -20}, y: {start: 20, end: 40}, z:{start: -300, end: 0 }},
    scaleRange: {x: {start: 1, end: 10}, y: {start: 1, end: 2}, z:{start: 1, end: 1 }},
  });
  var visibilityEffector = new G.VisibilityEffector({distance: 600});
  cloner.addComponent(visibilityEffector)
  G.app.addObject(cloner)
  cloner.addEventListener('distancethreshold', function(){
    this.spawnPrimitives();
  })



  //FRESNAL PRIMITIVE******************
  var scaleEffector = new G.ScaleEffector( {nearDistance: 50, farDistance: 400, nearScale: 10, farScale: 1})
  var cloner = new G.Cloner({
    primitive: G.FresnalPrimitive,
    num: 1,
    position: new THREE.Vector3(0, 0, -100),
    // posRange: {x: {start: -200, end: -20}, y: {start: 0, end: 0}, z:{start: -800, end: 0 }},
    rotRange: {start: 0, end: Math.PI * 2},
    primitiveEffectors: [scaleEffector]
  })

  G.app.addObject(cloner)

  scaleEffector = new G.ScaleEffector( {nearDistance: 50, farDistance: 400, nearScale: 2, farScale: 1})
  var cloner = new G.Cloner({
    primitive: G.CurveDotPrimitive,
    num: 1,
    position: new THREE.Vector3(0, 0, 200),
    // posRange: {x: {start: -200, end: -20}, y: {start: 0, end: 0}, z:{start: -800, end: 0 }},
    rotRange: {start: 0, end: Math.PI * 2},
    primitiveEffectors: [scaleEffector]

  })

  G.app.addObject(cloner)





  

}
