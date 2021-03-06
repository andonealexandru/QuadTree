class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h
           );
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
        range.x + range.w < this.x - this.w ||
        range.y - range.h > this.y + this.h ||
        range.y + range.h < this.y - this.h);
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    // northwest
    let nw = new Rectangle(this.boundary.x - this.boundary.w / 2,
                           this.boundary.y - this.boundary.h / 2,
                           this.boundary.w / 2,
                           this.boundary.h / 2
                         );
    this.northwest = new QuadTree(nw, this.capacity);

    // northeast
   let ne = new Rectangle(this.boundary.x + this.boundary.w / 2,
                          this.boundary.y - this.boundary.h / 2,
                          this.boundary.w / 2,
                          this.boundary.h / 2
                        );
    this.northeast = new QuadTree(ne, this.capacity);

    // southwest
    let sw = new Rectangle(this.boundary.x - this.boundary.w / 2,
                           this.boundary.y + this.boundary.h / 2,
                           this.boundary.w / 2,
                           this.boundary.h / 2
                         );
    this.southwest = new QuadTree(sw, this.capacity);

    // southeast
    let se = new Rectangle(this.boundary.x + this.boundary.w / 2,
                           this.boundary.y + this.boundary.h / 2,
                           this.boundary.w / 2,
                           this.boundary.h / 2
                         );
    this.southeast = new QuadTree(se, this.capacity);

    this.divided = true;
  }

  insert(point) {
    // check if in boundaries
    if (!this.boundary.contains(point)) {
      return;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      this.northeast.insert(point);
      this.northwest.insert(point);
      this.southeast.insert(point);
      this.southwest.insert(point);
    }
  }

  query(range, found) {
    if (!this.boundary.intersects(range)) {
      // empty array
      return;
    }

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }

    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }


  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x,
         this.boundary.y,
         this.boundary.w * 2,
         this.boundary.h * 2
        );
    if (this.divided) {
      this.northwest.show();
      this.northeast.show();
      this.southwest.show();
      this.southeast.show();
    }
    for (let p of this.points) {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }
}
