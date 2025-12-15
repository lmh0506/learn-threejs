import * as THREE from "three"
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
// 导入GUI
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"

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
// scale 缩放也是相对的， 父元素缩放，子元素也会跟着缩放，子元素最后缩放的大小是父元素乘以子元素的缩放尺寸
// parentCube.scale.set(2, 2, 2)
// cube.scale.set(0.5, 0.5, 0.5)

// position 是相对位置 如果被添加到父元素中则是相对父元素位置，如果没有父元素则是相对世界坐标系
cube.position.set(2, 0, 0)

// 绕x轴转
// 旋转也是相对的， 父元素旋转，子元素也会跟着旋转，子元素最后旋转的角度是父元素加上子元素的旋转角度
parentCube.rotation.x = Math.PI / 4
cube.rotation.x = Math.PI / 4

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

window.addEventListener("resize", () => {
  // 重置渲染器的宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 重置相机的宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix()
})

let eventObj = {
  fullScreen: () => {
    document.body.requestFullscreen()
  },
  exitFullScreen: () => {
    document.exitFullscreen()
  },
}

// 添加gui
const gui = new GUI()
// 添加事件
// 第一个参数是对象，第二个参数是属性名，如果值为方法则会变成按钮
gui.add(eventObj, "fullScreen").name("全屏")
gui.add(eventObj, "exitFullScreen").name("退出全屏")

const folder = gui.addFolder("子元素位置")
folder
  .add(cube.position, "x", -5, 5, 0.1)
  .name("x轴位移")
  .onChange((val) => {
    console.log(val)
  })
folder
  .add(cube.position, "y", -5, 5, 0.1)
  .name("y轴位移")
  .onFinishChange((val) => {
    console.log("结束时触发", val)
  })
folder.add(cube.position, "z", -5, 5, 0.1).name("z轴位移")

// 第一个参数是对象，第二个参数是属性名，如果值为数字则第三个参数是最小值，第四个参数是最大值，第五个参数是步长
// gui.add(cube.position, "x", -5, 5, 0.1).name("x轴位移")
// 等价于上面
// gui.add(cube.position, "x").min(-5).max(5).step(0.1).name("x轴位移")

const parentFolder = gui.addFolder("父元素位置")
parentFolder.add(parentCube.position, "x", -5, 5, 0.1).name("x轴位移")
parentFolder.add(parentCube.position, "y", -5, 5, 0.1).name("y轴位移")
parentFolder.add(parentCube.position, "z", -5, 5, 0.1).name("z轴位移")

gui.add(parentMaterial, "wireframe").name("是否为线框模式")

const cubeColorParams = {
  color: "#00ff00",
}

gui
  .addColor(cubeColorParams, "color")
  .name("子元素颜色")
  .onChange((val) => {
    cube.material.color.set(val)
  })
