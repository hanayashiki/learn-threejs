import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";

class Gl {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#app")!,
    antialias: true,
  });

  clock = new THREE.Clock();

  controls = new OrbitControls(this.camera, this.renderer.domElement);

  geometry = new THREE.PlaneGeometry(0.4, 0.6, 16, 16);

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
    },
    wireframe: true,
    side: THREE.DoubleSide,
  });

  mesh = new THREE.Mesh(this.geometry, this.material);

  constructor() {
    this.camera.position.z = 1;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 1);
    this.scene.add(this.mesh);
    this.run();
  }

  run() {
    requestAnimationFrame(this.run.bind(this));
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

const canvas = document.createElement("canvas");
canvas.id = "app";

document.body.appendChild(canvas);

new Gl();
