let particles = [];

function setup() {
  createCanvas(1000, 800);



  // for (let i = 0; i < 500; i++) {
  //   particles[i] = new Particle(random(width), random(height));
  // }
}

function draw() {
  if (mouseIsPressed) {
    let newParticle = new Particle(mouseX, mouseY);
    particles.push(newParticle);
  }
  background(0);

  let boundary = new Rectangle(width / 2, height / 2, width, height);
  let qtree = new QuadTree(boundary, 4);

  for (let p of particles) {

    let point = new Point(p.x, p.y, p);
    qtree.insert(point);

    p.move();
    p.render();
    p.setHighlight(false);
  }

  qtree.show();

  // inefficient way
  // for (let p of particles) {
  //   for (let other of particles) {
  //     if (p !== other && p.intersects(other)) {
  //       p.setHighlight(true);
  //     }
  //   }
  // }

  // efficient way
  for (let p of particles) {
    let range = new Rectangle(p.x, p.y, p.r*2, p.r*2);
    let points = [];
    qtree.query(range, points);
    for (let point of points) {
      let other = point.userData;
      if (p !== other && p.intersects(other)) {
        p.setHighlight(true);
      }
    }
  }
}
