G.TextManager = function() {

  var textHeight = G.camHeight + 2
  var textZPos = 300
  var textZInc = 30
  var text = new G.TextPrimitive({
    string: "Welcome",
    position: new THREE.Vector3(-3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)


  var text = new G.TextPrimitive({
    string: "to",
    position: new THREE.Vector3(3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "the",
    position: new THREE.Vector3(-3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "MettaVerse",
    position: new THREE.Vector3(3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

}