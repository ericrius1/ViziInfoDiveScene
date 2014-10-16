G.Media = function(){

  var planeGeo = new THREE.PlaneGeometry(1024, 692)
  var mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: G.snowCrash
  })
  var mesh = new THREE.Mesh(planeGeo, mat)

  var endingScale = 0.1
  var startingScale = 0.0001
  var mediaObj = new Vizi.Object()
  var visual = new Vizi.Visual({
    object: mesh
  })
  mediaObj.transform.scale.multiplyScalar(startingScale)

  var scaleEffector = new G.ScaleEffector( {nearDistance: 10, farDistance: 150, nearScale: endingScale, farScale: startingScale})
  mediaObj.addComponent(visual)
  mediaObj.addComponent(scaleEffector)
  mediaObj.transform.position.y +=50
  G.app.addObject(mediaObj)

}