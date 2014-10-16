G.TextManager = function() {


  var text = new G.TextPrimitive({
    string: "Welcome",
    position: new THREE.Vector3(0, G.camHeight, 350)
  })
  G.app.addObject(text)


  var text = new G.TextPrimitive({
    string: "To",
    position: new THREE.Vector3(0, G.camHeight, 300)
  })
  G.app.addObject(text)
}