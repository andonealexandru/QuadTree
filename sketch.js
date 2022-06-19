let qtree;

function setup() {
  createCanvas(400, 400);

  let boundary = new Rectangle(200, 200, 200, 200);
  qtree = new QuadTree(boundary, 4);

  console.log(qtree);

  // for (let i = 0; i < 100; i++) {
  //   let p = new Point(random(width), random(height));
  //
  //   qt.insert(p);
  // }
  //
  // background(0);
  // qt.show();
}

function draw() {
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    qtree.insert(m);
  }
  background(0);
  qtree.show();
}
