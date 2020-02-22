// Tristan Andersen - TSKÓLI VOR 2020

// Grab canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Configure scale
let width = window.innerWidth - 50;
let height = window.innerHeight - 50;
let scale;

if (width < height) {
  scale = canvas.width = canvas.height = width;
} else {
  scale = canvas.width = canvas.height = height;
}

// Public Vars
let planets = [];

// Random in range
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomColor() {
  return ('rgb('+random(0, 255)+','+random(0,255)+','+random(0,255));
}


class Planet {
  // Assign Vars
  constructor(id, radius, offset, speed, color) {
    this.id       = id;
    this.radius   = radius;
    this.offset   = offset;
    this.speed    = speed;
    this.color    = color;
    this.rotation = 0;
  }

  // Begin drawing
  draw(ctx) {
    // Setup
    ctx.fillStyle = ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.translate(scale/2, scale/2);
    ctx.rotate(this.rotation);

    // Draw the planet
    ctx.beginPath();
    ctx.arc(this.offset, this.offset * 0.1, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();

    // Draw the planet's orbit
    ctx.beginPath();
    ctx.arc(0, 0, this.offset, 0, 2 * Math.PI, false);
    ctx.stroke();

    // Reset translation
    ctx.translate(-(scale/2), -(scale/2));

    // Increase rotation value
    this.rotation += this.speed / this.offset;
  }

  // Attempt to remove colliding orbits
  detectCollission() {
    for (let i = 0; i < planets.length; i++) {
      if (!(this === planets[i])) {
        const doff = this.offset - planets[i].offset;
        const distance = Math.sqrt(doff * doff + doff * doff);

        if (distance < this.radius + planets[i].radius) {
          planets.splice(i, 1);
        }
      }
    }
  }
}

// Create the Sun
planets[0] = new Planet('SOL-' + Math.random().toString(36).substr(2, 4), 25, 0, 0);


// Create Planets
for (let i = 0; i < random(3, 10); i++) {
  planets[i+1] = new Planet(Math.random().toString(36).substr(2, 4), random(10, 15), random(40, scale/2), random(0.5, 2), randomColor());
}

// Animation loop
function loop() {
  // Clear the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, scale, scale);

  // Iterate through the planets
  for (let i = 0; i < planets.length; i++) {
    planets[i].draw(ctx);
    planets[i].detectCollission();
  }
  requestAnimationFrame(loop);
}

// Let us begin =3
loop();
