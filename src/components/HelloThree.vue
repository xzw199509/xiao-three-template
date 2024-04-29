<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import vertexShader from '../glsl/demo/main.vert'
import fragmentShader from '../glsl/demo/main.frag'

let scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
// 添加相机控制器
new OrbitControls(camera, renderer!.domElement)



const createLight = () => {
  // 设置环境光
  const ambientLight = new THREE.AmbientLight(0xffffff) // 环境光
  scene.add(ambientLight)
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0x00ff00, 1)
  // 设置光源的方向
  directionalLight.position.set(50, 50, 50)
  scene.add(directionalLight)
}
createLight()

// 用方法包裹创建一个立方体
const createMesh = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial()
  return new THREE.Mesh(geometry, material)
}
const mesh = createMesh()
scene.add(mesh)

// 添加经典猴子头模型
// 提前设置shader材质
const material = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader,
  vertexShader: vertexShader,
  uniforms: {
    uTime: { value: 0 },
  },
  transparent: true,
})
// 直接使用load方法加载方式
const loader = new THREE.BufferGeometryLoader()
loader.load('models/json/suzanne_buffergeometry.json', (geometry) => {
  geometry.computeVertexNormals()
  geometry.scale(0.5, 0.5, 0.5)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -2
  scene.add(mesh)
})
// 添加经典机器人
const loader2 = new GLTFLoader()
loader2.load(
  'models/gltf/RobotExpressive.glb',
  (gltf) => {
    gltf.scene.position.set(2, -0.5, 0)
    gltf.scene.scale.set(0.2, 0.2, 0.2)
    scene.add(gltf.scene)
  },
  undefined,
   (e)=> {
    console.error(e)
  }
)

// 使用promise 加载方式
const addPlaneMesh = async () => {
  const loadTexture = (path: string) => {
    return new Promise((resolve) => {
      new THREE.TextureLoader().load(path, (texture) => {
        resolve(texture)
      })
    })
  }
  let texture = await loadTexture('/img/wp2698514.png')
  const geometry = new THREE.PlaneGeometry(16, 9)
  const material = new THREE.MeshLambertMaterial({
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture as THREE.Texture, //map表示材质的颜色贴图属性
  })
  const planeMesh = new THREE.Mesh(geometry, material)
  planeMesh.position.z = -3
  scene.add(planeMesh)
}
addPlaneMesh()

const render = (): void => {
  renderer.render(scene, camera)
}
const clock = new THREE.Clock()
const animate = (): void => {
  requestAnimationFrame(animate)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  material.uniforms.uTime.value = clock.getElapsedTime()
  render()
}
animate()


onBeforeUnmount(() => {
  // destroyThree() // TODO: 后面再补
  document.body.removeChild(renderer.domElement) // 避免热更新时创建新的canvas
})
</script>

<template>
  <div class="demo"></div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
