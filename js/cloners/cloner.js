G.Cloner = function(params){
  var obj = new Vizi.Object;

  obj.addComponent(new G.ClonerScript(params));

  return obj;
}

G.ClonerScript = function(params){
  Vizi.Script.call(this)
  this.params = params;
}


goog.inherits(G.ClonerScript, Vizi.Script);

G.ClonerScript.prototype.realize = function(){

  Vizi.Script.prototype.realize.call(this);

  this._object.transform.position.copy(this.params.position)
  this.params.posRange = this.params.posRange || {x: {start: 0, end: 0}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }}
  this.params.scaleRange = this.params.scaleRange ||  {x: {start: 1, end: 1}, y: {start: 1, end: 1}, z:{start: 1, end: 1 }}
  this.params.rotRange = this.params.rotRange || {start: 0, end: 0}
  this.primitiveVis = false;

  //we only want to wait to spawn the primitives and show them if we've specified a visibility effector, otherwise show them right away
  if(!this.params.visibilityEffector){
    console.log('spawn')
    this.spawnPrimitives();
  }
}

G.ClonerScript.prototype.update = function(){
}

G.ClonerScript.prototype.spawnPrimitives = function(){
  for(var i = 0; i < this.params.num; i++){
    var primitive = this.params.primitive(this.params);
    primitive.transform.position.set(G.rf(this.params.posRange.x.start, this.params.posRange.x.end), G.rf(this.params.posRange.y.start, this.params.posRange.y.end), G.rf(this.params.posRange.z.start, this.params.posRange.z.end));
    primitive.transform.scale.set(G.rf(this.params.scaleRange.x.start, this.params.scaleRange.x.end), G.rf(this.params.scaleRange.y.start, this.params.scaleRange.y.end),G.rf(this.params.scaleRange.z.start, this.params.scaleRange.z.end));
    primitive.transform.rotation.set(0, G.rf(this.params.rotRange.start, this.params.rotRange.end), 0)
    this._object.addChild(primitive);
    _.each(this.params.primitiveEffectors, function(effector){
      if(effector === G.visibilityEffector){
        this.primitiveVis = true;
      }
      primitive.addComponent(_.clone(effector));
    }, this)


    var script = primitive.getComponent(Vizi.Script);

    if(!this.primitiveVis){
      script.appear();
    }
    else{
      primitive.addEventListener('distancethreshold', function(){
        script.appear()
      }.bind(primitive)); 
    }
  }
}

