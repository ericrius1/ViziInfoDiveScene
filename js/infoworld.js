var parameters = (function() {
  var parameters = {};
  var parts = window.location.search.substr(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var parameter = parts[i].split('=');
    parameters[parameter[0]] = parameter[1];
  }
  return parameters;
})();

InfoWorld = function(param) {
  Vizi.Application.call(this, param);

  G.loader = new Loader();
  var effect;

  var controls2, clock = new THREE.Clock();

  var sky, water;

  G.primitives = {}

  G.shaders = new ShaderLoader('shaders')


  G.loader.addLoad()
  G.shaders.load('vs-strand', 'strand', 'vertex');
  G.shaders.load('fs-strand', 'strand', 'fragment');

  G.shaders.shaderSetLoaded = function() {
    G.loader.onLoad();
  }
  var c4dLoader = new THREE.C4DLineLoader();
  G.loader.addLoad();
  c4dLoader.load('models/campath-3.txt', function(line) {
    G.loader.onLoad();
    G.cameraPath = line;

  });

  var objLoader = new THREE.ObjectLoader();
  G.loader.addLoad();
  objLoader.load('models/ID-scene-2.json', function(sceneObj) {

    G.sceneObj = sceneObj;
    G.loader.onLoad();
    surface = sceneObj.getObjectByName('surface', true)
    surface.children[0].material.wireframe = true;
    surface.children[0].material.transparent = true;
    surface.children[0].material.opacity = 0.05;
    // surface.children[0].scale.z = 100

  });

  G.loader.addLoad();
  $.get('models/sampleData.json', function(data) {
    G.primitiveData = data;
    G.loader.onLoad();
  })

  VRClient.ready().then(function() {
    console.log('kicked off ready');
  });

  G.loader.onStart = function() {
    Vizi.Application.instance.init()
    Vizi.Application.instance.run()
  }.bind(G)
}

goog.inherits(InfoWorld, Vizi.Application)

InfoWorld.prototype.init = function(param) {
  //tracker obj 


  G.app = Vizi.Application.instance;


  G.dolly = new Vizi.Object()
  var startingPoint = G.cameraPath.getPointAt(0);
  startingPoint.y = G.camHeight
  startingPoint.z = -startingPoint.z
  G.dolly.transform.position.copy(startingPoint)
  var flightPath = new FlightPathScript(G.cameraPath)
  this.addObject(G.dolly)
  G.dolly.addComponent(flightPath)

  var cam = new Vizi.PerspectiveCamera();
  cam.far = 100000;
  cam.near = 1;
  cam.fov = 75;

  var camera = new Vizi.Object();
  camera.addComponent(cam);
  cam.active = true;
  G.dolly.addChild(camera);

  var effect = new Vizi.Effect(new THREE.BloomPass(1));
//  Vizi.Graphics.instance.addEffect(effect);


  this.controller = Vizi.Prefabs.ModelController({
    active: true
  })
  // this.controllerScript = this.controller.getComponent(Vizi.ModelControllerScript);
  // this.addObject(this.controller)
  // this.controllerScript.camera = cam;
  G.scene = Vizi.Graphics.instance.scene

  if (parameters.mode === 'cardboard') {
    // effect = new THREE.StereoEffect(G.renderer);
    alert("Cardboard");

  } else {

    var controller2 = Vizi.Prefabs.RiftController({
      active: true,
    });
    var controllerScript2 = controller2.getComponent(Vizi.RiftControllerScript);
    controllerScript2.camera = cam;

    G.app.addObject(controller2);
    // effect = new THREE.VREffect(G.renderer);
  }


  var vSceneObj = new Vizi.Object();
  var visual = new Vizi.Visual({
    object: G.sceneObj
  })
  vSceneObj.addComponent(visual);
  this.addObject(vSceneObj);

  G.scene.fog = new THREE.Fog(0x00000, -4000, 80000)

  var cloners = new G.ClonerManager();
  var textManager = new G.TextManager();
  // announce to JAVRIS host that we are ready to go.
  VRClient.ready();
  //Should be able to just update matrix world oncee before we start rendering, because then threejs renderer automatically calls this every frame... something with vizi?

}