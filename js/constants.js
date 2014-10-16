var G = {}

G.camHeight = 100;

G.rf = THREE.Math.randFloat;

G.map = function(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

G.colorPalette = [0xEF2D5E, 0xFCED49, 0x1BA0D1, 0xA00B5F, 0x93B75E];

G.materials = []
_.each(G.colorPalette, function(colorValue) {
  G.materials.push(
    new THREE.MeshBasicMaterial({
      color: colorValue
    })
  )
})