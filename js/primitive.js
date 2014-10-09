G.Primitive = function() {
  this.effectors = [];
  this._colorPalette = [0xEF2D5E, 0xFCED49, 0x1BA0D1, 0xA00B5F, 0x93B75E];
  this._materials = []
  this._spawnInterval = 100;
  _.each(this._colorPalette, function(colorValue) {
    this._materials.push(
      new THREE.MeshBasicMaterial({
        color: colorValue
      })
    )
  }.bind(this));

}

// G.Primitive.prototype.update = function() {}

G.Primitive.prototype = {
  constructor: G.Primitive,
  unspawn: function() {},
  update: function() {}
};

//arg 1: num clones to create
//arg 2: size range to randomize by
//arg 3: spawn point to randomize position around
G.Primitive.prototype.init = function(numClones, posData, sizeRange){
  for(var i = 0; i < numClones; i++){
    var position = new THREE.Vector3()
    position.x = G.rf(posData.x - posData.rangeX, posData.x + posData.rangeX)
    position.y = G.rf(posData.y - posData.rangeY, posData.y + posData.rangeY)
    position.z = G.rf(posData.z - posData.rangeZ, posData.z + posData.rangeZ)
    this.create(position, sizeRange);
  }
}


