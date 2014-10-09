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
G.ClonerManager = function(){
  this.cloners = [];
  var cloner = new G.ArcClonerPrefab({
    num: 100,
    position: new THREE.Vector3(),
    posRange: {x: 100, y: 0, z: 0}
  })
  G.app.addObject(cloner)

}
