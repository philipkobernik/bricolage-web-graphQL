let spacing_distance = 25;
let node_size = 30;

let nodes = [];

class Node {
	constructor(p5_, coverImage_, title_, authors_, hashtags_, date_, project_description_, slug_) {
		this.p5 = p5_;

		this.coverImage = coverImage_;
		//this.coverImage = this.p5.loadImage(coverImage_); //image object
		this.title = title_; //string
		console.log(authors_);
		this.authors = [];
	//	for (var i = 0; i < authors_.; i++) {
			this.authors.push(authors_["name"]); //array of strings
		//}
		this.date = date_; //string
		//this.shortDescription = shortDescription_; //string
		this.project_description = project_description_; //string
		//this.medium = medium_; //array
		//this.category = category_; //string
		this.hashtags = hashtags_; //array
		this.slug = slug_; //string

		// for (var i = 0; i < imageGallery_.length; i++) {
		// 	let img = this.p5.loadImage(imageGallery_[i]);
		// 	this.imageGallery.push(  img  );
		// }

		//this.lab_affiliation = lab_affiliation_;

		// set random initial positions
		this.position = this.p5.createVector(  this.p5.random(spacing_distance, this.p5.width - spacing_distance), this.p5.random(spacing_distance, this.p5.height - spacing_distance)  );
		this.velocity = this.p5.createVector(0, 0, 0);
		this.size = node_size;
		this.alpha = 255;
		this.line_alpha = 255;
		this.color = [50, 124, 155];
		this.is_clicked = false; //are we in project mode or homepage mode?
	}

	//getters
	getPosition() { return this.position; }
	getHashtags() { return this.hashtags; }
	getLineAlpha() { return this.line_alpha; }
	//getLabAffiliation() { return this.lab_affiliation; }
	getTitle() { return this.title; }
	getAuthors() { return this.authors; }
	getSize() { return this.size; }

	//setters

	update() {


	}

	display() {
		this.p5.noStroke();
    this.p5.fill(this.color[0], this.color[1], this.color[2], this.alpha);
		this.p5.rectMode(this.p5.CENTER);
		//this.p5.image(this.coverImage, this.getPosition().x, this.getPosition().y, this.size, this.size);
		this.p5.rect(this.getPosition().x, this.getPosition().y, this.size, this.size);

	}
}

const setup = (p5, canvasParentRef,props) => {
  p5.createCanvas(750, 185).parent(canvasParentRef);
  p5.background(255);
	p5.noStroke();
	//console.log(props);
	for(var i =0; i< props.p.length; i++){
		//console.log(props.p[i].author["name"])
		var n = new Node(p5, props.p[i].coverImage, props.p[i].title, props.p[i].author["name"], props.p[i].tags, props.p[i].date, props.p[i].excerpt, props.p[i].slug);
		nodes.push(n);
		//console.log("new node added!");
	}
 }

const draw = p5 => {
	p5.background(255);
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].display();
	}

	for (var i = 0; i < nodes.length; i++) {
    for (var j = i+1; j < nodes.length; j++) {
			//console.log(i,j)
      assignRelatedness(p5, nodes[i], nodes[j]);
    }
  }
}

const mousePressed = () => {

}

function assignRelatedness(p5, p1, p2) { //takes in two projects and checks their relation
	// var hashtagCounter = 0;
	// for (var i = 0; i < p2.getHashtags().length; i++) {
	// 	if (p1.getHashtags().includes(p2.getHashtags()[i])) {
	// 		hashtagCounter++;
	// 	}
	// }
	// //print(hashtagCounter);
	// if (hashtagCounter > 0) {
	// 	p5.strokeWeight(hashtagCounter);
	// 	var alpha = 20;
	// 	if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
	// 		alpha = 255;
	// 	}
	// 	p5.stroke(211, 103, 60, alpha)
	// 	p5.line(  p1.getPosition().x - p1.getSize()/3, p1.getPosition().y - p1.getSize()/3, p2.getPosition().x - p2.getSize()/3, p2.getPosition().y - p2.getSize()/3  );
	// }

	// if (p1.getLabAffiliation() == p2.getLabAffiliation()) {
	// 	strokeWeight(1);
	// 	var alpha = 20;
	// 	if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
	// 		alpha = 255;
	// 	}s
	// 	this.p5.stroke(96, 99, 134, alpha);
	// 	this.p5.line(p1.getPosition().x + 5, p1.getPosition().y, p2.getPosition().x + 5, p2.getPosition().y);
	// }

	// var nameCounter = 0;
	// // console.log("Authors", p2.getAuthors().length);
	// for (var i = 0; i < p2.getAuthors().length; i++) {
	// 	// console.log(p1.getAuthors(), p2.getAuthors());
	// 	if (p1.getAuthors().includes(p2.getAuthors()[i])) {
	// 		//print("match!");
	// 		nameCounter++;
	// 	}
	// }
	
	// if (nameCounter > 0) {
	// 	p5.strokeWeight(nameCounter/10);
	// 			var alpha = 20;
	// 	if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
	// 		alpha = 255;
	// 	}
	// 	p5.stroke(96, 99, 134,alpha);
	// 	p5.line(p1.getPosition().x + p1.getSize()/3, p1.getPosition().y + p1.getSize()/3, p2.getPosition().x + p2.getSize()/3, p2.getPosition().y + p2.getSize()/3);
	// }
}
export { setup, draw, mousePressed};
