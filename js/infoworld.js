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
  var controls, effect;

  var controls2, clock = new THREE.Clock();

  var sky, water;

  var cameraPath;

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
    cameraPath = line;

  });

  var objLoader = new THREE.ObjectLoader();
  G.loader.addLoad();
  objLoader.load('models/ID-scene-2.json', function(sceneObj) {

    G.sceneObj = sceneObj;
    G.loader.onLoad();
    surface = sceneObj.getObjectByName('surface', true)
    surface.children[0].material.wireframe = true;
    surface.children[0].material.transparent = true;
    surface.children[0].material.opacity = 0.2;

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
  var cam = new Vizi.PerspectiveCamera();
  cam.far = 100000;
  cam.near = 1;
  cam.fov = 45;

  var camera = new Vizi.Object();
  camera.addComponent(cam);
  cam.active = true;
  this.addObject(camera);

  camera.transform.position.set(0,2,4);

  var vSceneObj = new Vizi.Object();
  var visual = new Vizi.Visual({
    object: G.sceneObj
  })
  vSceneObj.addComponent(visual);
  this.addObject(vSceneObj);

  // var ground = new Vizi.Object();
  // var visual = new Vizi.Visual({
  //   geometry: new THREE.PlaneGeometry(2000, 2000, 100, 100),
  //   material: new THREE.MeshBasicMaterial({
  //     color: 0x0000ff,
  //     transparent: true,
  //     opacity: 1,
  //     wireframe: true
  //   })
  // })
  // ground.addComponent(visual);
  // ground.transform.rotation.x = -Math.PI / 2
  // this.addObject(ground)

}



// G.scene = new THREE.Scene();
// G.scene.fog = new THREE.Fog(0x00000, -4000, 80000);
// G.init = function() {
//   // this.createPrimitives();
//   G.renderer = new THREE.WebGLRenderer({
//     antialias: true
//   });
//   G.renderer.autoClear = false;
//   document.body.appendChild(G.renderer.domElement);

//   dolly = new THREE.Object3D();
//   dolly.position.set(500, 500, 500);
//   G.scene.add(dolly);

//   G.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000);
//   dolly.add(G.camera);

//   if (parameters.mode === 'cardboard') {

//     controls = new THREE.DeviceOrientationControls(G.camera);
//     effect = new THREE.StereoEffect(G.renderer);

//   } else {

//     controls = new THREE.VRControls(G.camera);
//     effect = new THREE.VREffect(G.renderer);

//   }

//   effect.setSize(window.innerWidth, window.innerHeight);

//   document.body.addEventListener('dblclick', function() {

//     effect.setFullScreen(true);

//   });



//   G.scene.add(G.sceneObj);



// }
// G.createPrimitives = function() {
//   G.primitives['arc'] = new G.Arc();
//   G.primitives['fresnal'] = new G.Fresnal();
//   _.each(G.primitiveData, function(data, name) {
//     if (G.primitives[name]) {
//       G.primitives[name].init(data.numClones, data.positionData, data.sizeRange);
//     }
//   })
// }

// G.onResize = function() {

//   G.camera.aspect = window.innerWidth / window.innerHeight;
//   G.camera.updateProjectionMatrix();

//   effect.setSize(window.innerWidth, window.innerHeight);

// }

// G.animate = function() {

//   requestAnimationFrame(this.animate);
//   if (cameraPath !== undefined) {
//     // adjust the number after "performance.now() /" to slow down the animation speed.
//     var time = (performance.now() / 160000) % 1;

//     var pointA = cameraPath.getPointAt(time);
//     var pointB = cameraPath.getPointAt(Math.min(time + 0.015, 1));

//     pointA.z = -pointA.z;
//     pointB.z = -pointB.z;

//     dolly.position.copy(pointA);
//     dolly.lookAt(pointB);

//     dolly.rotateY(Math.PI); // look forward
//   }

//   controls.update();

//   effect.render(G.scene, G.camera);

// }.bind(G)
// window.addEventListener('resize', G.onResize.bind(G), false);