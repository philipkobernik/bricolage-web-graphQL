let spacingDistance = 25;
let nodeSize = 50;

class Node {
	constructor(p5_, coverImage_, title_, authors_, date_, shortDescription_, projectDescription_, medium_, category_, hashtags_, slug_, imageGallery_, labAffiliation_, ) {
		this.p5 = p5_;

		this.coverImage = this.p5.loadImage(coverImage_); //image object
		this.title = title_; //string
		this.authors = authors_; //array of strings
		this.date = date_; //string
		this.shortDescription = shortDescription_; //string
		this.projectDescription = projectDescription_; //string
		this.medium = medium_; //array
		this.category = category_; //string
		this.hashtags = hashtags_; //array
		this.slug = slug_; //string

		for (var i = 0; i < imageGallery_.length; i++) {
			let img = this.p5.loadImage(imageGallery_[i]);
			this.imageGallery.push(  img  );
		}

		this.labAffiliation = labAffiliation_;

		// set random initial positions
		this.position = this.p5.createVector(  this.p5.random(spacingDistance, width - spacingDistance), this.p5.random(spacingDistance, height - spacingDistance)  );
		this.velocity = this.p5.createVector(0, 0, 0);
		this.size = 50;
		this.alpha = 255;
		this.color = [50, 124, 155];
		this.isClicked = false; //are we in project mode or homepage mode?
	}

	//getters
	getPosition() { return this.position; }

	//setters

	update() {


	}

	display() {
		this.p5.noStroke();
    this.p5.fill(this.c[0], this.c[1], this.c[2], this.alpha);
    this.p5.rectMode(CENTER);
    this.p5.rect(this.getPosition().x, this.getPosition().y, this.size, this.size);
	}
}

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(750, 185).parent(canvasParentRef);
  p5.background(0);
  p5.noStroke();
 }

const draw = p5 => {
  p5.background(0);
}

const mousePressed = () => {

}


export { setup, draw, mousePressed};
