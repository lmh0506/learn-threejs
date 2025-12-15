import * as THREE from "three"
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 创建场景
const scene = new THREE.Scene()

// 创建相机
// PerspectiveCamera 透视相机 近大远小
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面 最近能看到的物体
  1000 // 远平面 最远能看到的物体
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建父元素材质
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)
const parentCube = new THREE.Mesh(geometry, parentMaterial)

parentCube.position.set(-2, 0, 0)

// position 是相对位置 如果被添加到父元素中则是相对父元素位置，如果没有父元素则是相对世界坐标系
cube.position.set(2, 0, 0)

// 添加坐标系辅助线
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05

// 将网格添加到场景中
parentCube.add(cube)
scene.add(parentCube)

// 设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
// 默认看向原点
camera.lookAt(0, 0, 0)

// 渲染
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()
