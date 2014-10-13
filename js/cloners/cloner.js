G.Cloner = function(params){
  Vizi.Object.call(this)
  this.transform.position.copy(params.position)
  this.params = params;
  this.params.posRange = this.params.posRange || {x: {start: 0, end: 0}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }}
  this.params.scaleRange = this.params.scaleRange ||  {x: {start: 1, end: 1}, y: {start: 1, end: 1}, z:{start: 1, end: 1 }}
  this.params.rotRange = this.params.rotRange || {start: 0, end: 0}
  
  //we only want to wait to spawn the primitives and show them if we've specified a visibility effector, otherwise show them right away
  if(!this.params.visibilityEffector){
    this.spawnPrimitives();
  }


}

goog.inherits(G.Cloner, Vizi.Object)

G.Cloner.prototype.spawnPrimitives = function(){
  for(var i = 0; i < this.params.num; i++){
    var primitive = new this.params.primitive(this.params);
    primitive.transform.position.set(G.rf(this.params.posRange.x.start, this.params.posRange.x.end), G.rf(this.params.posRange.y.start, this.params.posRange.y.end), G.rf(this.params.posRange.z.start, this.params.posRange.z.end));
    primitive.transform.scale.set(G.rf(this.params.scaleRange.x.start, this.params.scaleRange.x.end), G.rf(this.params.scaleRange.y.start, this.params.scaleRange.y.end),G.rf(this.params.scaleRange.z.start, this.params.scaleRange.z.end));
    primitive.transform.rotation.set(0, G.rf(this.params.rotRange.start, this.params.rotRange.end), 0)
    var visibilityEffector = new G.VisibilityEffector({distance: 200});
    primitive.addComponent(visibilityEffector)
    this.addChild(primitive)


    var scaleEffector = new G.ScaleEffector( {nearDistance: 50, farDistance: 400, nearScale: 10, farScale: 1})
    primitive.addComponent(scaleEffector)



    if(!this.params.visibilityEffector){
      primitive.appear();
    }
    else{
      primitive.addEventListener('distancethreshold', function(){
        this.appear()
      }.bind(primitive)); 
    }
  }
}

