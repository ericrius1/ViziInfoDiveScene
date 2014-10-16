G.TextManager = function() {


  var text = new G.TextPrimitive({
    string: "Welcome",
    position: new THREE.Vector3(-3, G.camHeight, 350)
  })
  G.app.addObject(text)


  var text = new G.TextPrimitive({
    string: "To",
    position: new THREE.Vector3(3, G.camHeight, 330)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "The",
    position: new THREE.Vector3(-3, G.camHeight, 310)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "Mettaverse",
    position: new THREE.Vector3(3, G.camHeight, 290)
  })
  G.app.addObject(text)

}