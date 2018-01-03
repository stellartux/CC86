class Box {
  constructor(x,z,w) {
      this.x = x * w
      this.z = z * w
      this.offset = sqrt(sq(x)+sq(z)) / 2
      this.width = w
  }
  height(f) {
    return sq(sin(f + this.offset)) * this.width
  }

  render(f) {
    push()
      rotateX(-QUARTER_PI)
      rotateY(QUARTER_PI)
      translate(this.x, this.height(f), this.z)
      box(this.width, 5 * this.width + 10 * this.height(f), this.width)
    pop()
  }
}

let boxes = []
let speed
let pointColor
let ambientColor
let materialColor

function setup() {
  createCanvas(400, 400, WEBGL)
  ortho(-200,200,-200,200,-800,800,0,1000)
  frameRate(20)

  let boxwidth = 15
  let cubecount = 7
  for (let z = -cubecount; z <= cubecount; z++) {
    for (let x = -cubecount; x <= cubecount; x++) {
      let b = new Box(x, z, boxwidth)
      boxes.push(b)
    }
  }

  noStroke()
  pointColor = color("#FFDDAA")
  ambientColor = color("#2A54A2")
  materialColor = color("#E0E0B6")

  document.getElementById("pointColor").addEventListener("input", updatePointColor, false)
  document.getElementById("ambientColor").addEventListener("input", updateAmbientColor, false)
  document.getElementById("materialColor").addEventListener("input", updateMaterialColor, false)

  speed = createSlider(1.5,12,5,0.001)
}

function updatePointColor(ev) {
  pointColor = color(ev.target.value)
}

function updateAmbientColor(ev) {
  ambientColor = color(ev.target.value)
}

function updateMaterialColor(ev) {
  materialColor = color(ev.target.value)
}

function draw() {
  background(240)
  pointLight(pointColor,800,-100,200)
  ambientLight(ambientColor)
  ambientMaterial(materialColor)
  let f = frameCount/sq(speed.value())
  for (let b of boxes) {
    b.render(f)
  }
}
