let node_size = 100; //initial
let spacing_distance = 0;

let button;
let nodes = [];
let global_hashtags = [];

let node_navi_state = 0;

class Hashtag {
  constructor(name) {
    this.name = name;
    this.textSize = 15;
    this.position = createVector(random(100, width - 100), random(100, height - 100));
    this.isDragged = false;
  }
  
  getName() { return this.name; }
  getPosition() { return this.position; }
  getDragged() {return this.isDragged; }
  
  setPosition(p) { this.position = p; }
  setDragged(b) {this.isDragged = b; }
  
  display() {
    fill(0);
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    //print("name: " + this.name + " x: " + this.position.x + " y: " +  this.position.y);
    text(this.name, this.position.x, this.position.y);
  }
  
  checkPositions() {
    if (mouseX >= this.position.x - this.textSize * 2 && 
        mouseX <= this.position.x + this.textSize * 2 && 
        mouseY >= this.position.y - this.textSize && 
        mouseY <= this.position.y + this.textSize) 
    {
      this.isDragged = true;
    }
  }
}

class Node {
	constructor(p5_, coverImage_, title_, authors_, hashtags_, date_, project_description_, slug_) {
		this.p5 = p5_;

		this.coverImage = coverImage_;
		//this.coverImage = this.p5.loadImage(coverImage_); //image object
		this.title = title_; //string
		console.log(authors_);
		this.authors = [];
		console.log(authors_);
	//	for (var i = 0; i < authors_.; i++) {
		this.authors.push(authors_); //array of strings
		//}
		// console.log(this.authors);
		this.date = date_; //string
		//this.shortDescription = shortDescription_; //string
		this.project_description = project_description_; //string
		//this.medium = medium_; //array
		//this.category = category_; //string
		this.hashtags = [hashtags_]; //array
		for(var i =0; i < hashtags_.length;i++){
			this.hashtags.push(hashtags_[i]["name"]);
			//set the global hashtag array
			// if (!global_hashtags.includes(hashtags_[i])) {
			// 	global_hashtags.push(hashtags_[i]);
			// }
		}

		this.slug = slug_; //string

		// for (var i = 0; i < imageGallery_.length; i++) {
		// 	let img = this.p5.loadImage(imageGallery_[i]);
		// 	this.imageGallery.push(  img  );
		// }

		// this.lab_affiliation = lab_affiliation_;

		// set random initial positions
		this.position = this.p5.createVector(  this.p5.random(spacing_distance, this.p5.width - spacing_distance), this.p5.random(spacing_distance, this.p5.height - spacing_distance)  );
		this.velocity = this.p5.createVector(0, 0, 0);
		this.size = node_size;
		this.alpha = 255;
		this.line_alpha = 50;
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
	setLineAlpha(l_a) { this.line_alpha = l_a; }
	setClick() { this.is_clicked = !this.is_clicked; }

	update() {
		if (this.is_clicked) {
			// go to project page
    } 
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
	node_size = node_size/props.p.length; // the more projects we add, the smaller the nodes will become
	spacing_distance = node_size/2 + 10;
	for(var i =0; i< props.p.length; i++){
		var n = new Node(p5, props.p[i].coverImage, props.p[i].title, props.p[i].author["name"], props.p[i].tags, props.p[i].date, props.p[i].excerpt, props.p[i].slug);
		nodes.push(n);
	}

	button = p5.createButton("hashtag view");
	button.position(720, 250);

	console.log(global_hashtags);
 }

const mousePressed = p5 => {
	// var index = 0;
  for (var i = 0; i < nodes.length; i++) {
    if (p5.mouseX > nodes[i].getPosition().x - nodes[i].size / 2 &&
      p5.mouseX < nodes[i].getPosition().x + nodes[i].size / 2 &&
      p5.mouseY > nodes[i].getPosition().y - nodes[i].size / 2 &&
      p5.mouseY < nodes[i].getPosition().y + nodes[i].size / 2) {
      nodes[i].setClick();
    }
    else{
    }
  }
}

const draw = p5 => {
	p5.background(255);
	p5.background(234, 227, 148, 100);
	for (var i = 0; i < nodes.length; i++) {
    for (var j = i+1; j < nodes.length; j++) {
			//console.log(i,j)
      assignRelatedness(p5, nodes[i], nodes[j]);
    }
	}

	if (node_navi_state == 1) { //hashtag view
		displayHashtags();
	}
	
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].display();
		hover(p5, nodes[i]);
	}

	button.mousePressed(hashtagView);
}

function hashtagView() {
	console.log("hashtag view!");
	node_navi_state = 1;
}

function displayHashtags() {

}

function hover(p5, p) {
  if (p5.mouseX > p.getPosition().x - p.getSize() / 2 &&
    p5.mouseX < p.getPosition().x + p.getSize() / 2 &&
    p5.mouseY > p.getPosition().y - p.getSize() / 2 &&
		p5.mouseY < p.getPosition().y + p.getSize() / 2) 
	{
		//p5.textSize(16);
		//p5.textAlign(p5.CENTER);
		p5.fill(0);
		p5.text(p.getTitle(), p.getPosition().x - p.getSize()/2, p.getPosition().y - (p.getSize()/2 + 5));
		
		p.setLineAlpha(255);
  } else {
		p.setLineAlpha(20);
	}
}

function assignRelatedness(p5, p1, p2) { //takes in two projects and checks their relation
	var hashtagCounter = 0;
	for (var i = 0; i < p2.getHashtags().length; i++) {
		// console.log(p2.getAuthors(), p2.getHashtags()[i])
		if (p1.getHashtags().includes(p2.getHashtags()[i])) {
			hashtagCounter++;
		}
	}
	if (hashtagCounter > 0) {
		p5.strokeWeight(hashtagCounter);
		var alpha = 50;
		if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
			alpha = 255;
		}
		p5.stroke(211, 103, 60, alpha)
		p5.line(p1.getPosition().x, p1.getPosition().y, p2.getPosition().x, p2.getPosition().y);
	}

	// if (p1.getLabAffiliation() == p2.getLabAffiliation()) {
	// 	strokeWeight(1);
	// 	var alpha = 20;
	// 	if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
	// 		alpha = 255;
	// 	}s
	// 	this.p5.stroke(96, 99, 134, alpha);
	// 	this.p5.line(p1.getPosition().x + 5, p1.getPosition().y, p2.getPosition().x + 5, p2.getPosition().y);
	// }

	var nameCounter = 0;
	// console.log("Authors", p2.getAuthors().length);
	for (var i = 0; i < p2.getAuthors().length; i++) {
		// console.log(p1.getAuthors(), p2.getAuthors());
		if (p1.getAuthors().includes(p2.getAuthors()[i])) {
			//print("match!");
			nameCounter++;
		}
	}
	
	if (nameCounter > 0) {
		p5.strokeWeight(nameCounter);
		var alpha = 50;
		if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
			alpha = 255;
		}
		p5.stroke(96, 99, 134, alpha);
		p5.line(p1.getPosition().x + 5, p1.getPosition().y + 5, p2.getPosition().x +5, p2.getPosition().y + 5);
	}
}
export { setup, draw, mousePressed};
