
// “This Snow Crash thing--is it a virus, a drug, or a religion?” 

// Juanita shrugs. “What's the difference?” 

G.TextManager = function() {

  var textHeight = G.camHeight + 5
  var textZPos = 300
  var textZInc = 30
  var xSpacing = 15
  var text = new G.TextPrimitive({
    string: "This Snow Crash thing...",
    position: new THREE.Vector3(-xSpacing, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)


  var text = new G.TextPrimitive({
    string: "Is it a virus...",
    position: new THREE.Vector3(xSpacing, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "a drug...",
    position: new THREE.Vector3(-xSpacing, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "or a religion?",
    position: new THREE.Vector3(xSpacing, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)


  var text = new G.TextPrimitive({
    string: "What's the difference?",
    position: new THREE.Vector3(0, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "Welcome to the Metaverse",
    position: new THREE.Vector3(0, textHeight- 2, -50)
  })
  G.app.addObject(text)

}