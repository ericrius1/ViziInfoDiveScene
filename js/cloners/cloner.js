G.Cloner = function(params){
  Vizi.Object.call(this)
  this.transform.position.copy(params.position)
  this.params = params;
}

goog.inherits(G.Cloner, Vizi.Object)

G.Cloner.prototype.spawnPrimitives = function(){
  for(var i = 0; i < this.params.num; i++){
    var primitive = new this.params.primitive(this.params);
    primitive.transform.position.set(G.rf(this.params.posRange.x.start, this.params.posRange.x.end), G.rf(this.params.posRange.y.start, this.params.posRange.y.end), G.rf(this.params.posRange.z.start, this.params.posRange.z.end));
    primitive.transform.scale.set(G.rf(this.params.scaleRange.start, this.params.scaleRange.end), G.rf(this.params.scaleRange.start, this.params.scaleRange.end),1);
    primitive.transform.rotation.set(0, G.rf(this.params.rotRange.start, this.params.rotRange.end), 0)
    var visibilityEffector = new VisibilityEffector(G.dolly, {distance: 200});
    primitive.addComponent(visibilityEffector)
    this.addChild(primitive)
    primitive.addEventListener('distancethreshold', function(){
      this.growStrand(0)
    }.bind(primitive));
  }
}