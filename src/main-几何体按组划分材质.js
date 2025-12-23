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
// const geometry = new THREE.BufferGeometry()
// // 创建顶点数据 顶点是有序的，每三个是为一个顶点，逆时针为正面
// const vertices = new Float32Array([
//   // 第一个顶点 x, y, z
//   -1.0, -1.0, 0.0,
//   // 第二个顶点 x, y, z
//   1.0, -1.0, 0.0,
//   // 第三个顶点 x, y, z
//   1.0, 1.0, 0.0,

//   1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
// ])

// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

// 通过索引创建顶点
const geometry = new THREE.BufferGeometry()
// 创建顶点数据
const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0])
// 创建顶点索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 设置两个顶点组，形成两个材质
// 参数分别为:起始索引，顶点个数，材质索引
geometry.addGroup(0, 3, 0)
geometry.addGroup(3, 3, 1)

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
})
// 创建材质2
const material2 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})
// 创建网格
const cube = new THREE.Mesh(geometry, [material, material2])

const box = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const material3 = new THREE.MeshBasicMaterial({ color: 0xff00ff })
const material4 = new THREE.MeshBasicMaterial({ color: 0xffffff })
const material5 = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const material6 = new THREE.MeshBasicMaterial({ color: 0x00ffff })

const boxMesh = new THREE.Mesh(box, [
  material1,
  material2,
  material3,
  material4,
  material5,
  material6,
])
boxMesh.position.set(2, 0, 0)

scene.add(boxMesh)

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
scene.add(cube)

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
