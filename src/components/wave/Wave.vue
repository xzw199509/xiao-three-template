<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from './main.vert'
import fragmentShader from './main.frag'
import vertexShader2 from './main02.vert'
import fragmentShader2 from './main02.frag'

onMounted(() => {})
let scene = new THREE.Scene()
const urls = ['/skybox/px.jpg', '/skybox/nx.jpg', '/skybox/py.jpg', '/skybox/ny.jpg', '/skybox/pz.jpg', '/skybox/nz.jpg']

const cubeLoader = new THREE.CubeTextureLoader()
scene.background = cubeLoader.load(urls)
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
  // alpha: true
})
renderer.setScissorTest(true)
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1
camera.position.y = 6
// 添加相机控制器
new OrbitControls(camera, renderer!.domElement)

// 设置环境光
const ambientLight = new THREE.AmbientLight(0xffffff) // 环境光
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0x000000, 1)
// 设置光源的方向
directionalLight.position.set(50, 50, 50)
scene.add(directionalLight)

const wave = new THREE.PlaneGeometry(6, 2, 100, 100)
const material = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader,
  vertexShader: vertexShader,
  uniforms: {
    uTime: { value: 0 },
    // uColor: new THREE.Uniform(new THREE.Color('#70c1ff')),
  },
  side: THREE.DoubleSide,
  //   transparent: true,
  //   depthWrite: false,
  //   depthTest: false,
})
const waveMesh = new THREE.Mesh(wave, material)
waveMesh.rotation.x = -Math.PI / 2
scene.add(waveMesh)

const water = new THREE.PlaneGeometry(2, 2, 100, 100)
const material2 = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader2,
  vertexShader: vertexShader2,
  uniforms: {
    uTime: { value: 0 },
    // uColor: new THREE.Uniform(new THREE.Color('#70c1ff')),
  },
  side: THREE.DoubleSide,
  transparent: true,
  //   depthWrite: false,
  //   depthTest: false,
})
const waterMesh = new THREE.Mesh(water, material2)
waterMesh.rotation.x = -Math.PI / 2
waterMesh.position.z = 3
scene.add(waterMesh)

const render = (): void => {
  renderer.setScissor(0, 0, window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
const clock = new THREE.Clock()
const animate = (): void => {
  requestAnimationFrame(animate)
  // mesh.rotation.x += 0.01
  // mesh.rotation.y += 0.01
  material.uniforms.uTime.value = clock.getElapsedTime()
  material2.uniforms.uTime.value = clock.getElapsedTime()
  render()
}
animate()

const destroyThreejs = () => {
  try {
    renderer.dispose()
    renderer.forceContextLoss()

    // scene.traverse((child) => {

    //   if (child.material) {
    //     child.material.dispose();
    //   }
    //   if (child.geometry) {
    //     child.geometry.dispose();
    //   }
    //   child = null;
    // })
    // scene = null;
  } catch (e) {
    console.error('Failed to destroy threejs', e)
  }
}
onBeforeUnmount(() => {
  destroyThreejs()
  document.body.removeChild(renderer.domElement)
})
</script>

<template>
  <div class="demo"></div>
</template>

<style scoped></style>
