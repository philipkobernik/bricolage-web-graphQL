let node_size = 100; //initial
let spacing_distance = 0;

let nodes = [];
let global_hashtags = [];

class Hashtag {
  constructor(p5_, name_) {
		this.p5 = p5_;
    this.name = name_;
		this.textSize = 15;
		// TO DO: Fix overlapping
		this.position = this.p5.createVector(  this.p5.random(spacing_distance * 1.5, this.p5.width - spacing_distance * 1.5), this.p5.random(spacing_distance * 1.5, this.p5.height - spacing_distance * 1.5)  );
    this.isDragged = false;
  }
  
  getName() { return this.name; }
  getPosition() { return this.position; }
  getDragged() {return this.isDragged; }
  
  setPosition(p) { this.position = p; }
  setDragged(b) {this.isDragged = b; }
  
  display() {
		this.p5.fill(0);
		this.p5.noStroke();
    this.p5.text(this.name, this.position.x, this.position.y);
  }
  
  checkPositions() {
    if (this.p5.mouseX >= this.position.x - this.textSize * 2 && 
				this.p5.mouseX <= this.position.x + this.textSize * 2 && 
				this.p5.mouseY >= this.position.y - this.textSize && 
				this.p5.mouseY <= this.position.y + this.textSize) 
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
		this.authors = [];
		this.authors.push(authors_); //array of strings
		this.date = date_; //string
		//this.shortDescription = shortDescription_; //string
		this.project_description = project_description_; //string
		//this.medium = medium_; //array
		//this.category = category_; //string
		this.hashtags = []; //array
		for(var i = 0; i < hashtags_.length; i++){
			var found = false;
			this.hashtags.push(hashtags_[i]["name"]);
			//set the global hashtag array
			for (var j = 0; j < global_hashtags.length; j++) {
				if (global_hashtags[j].getName().includes(hashtags_[i]["name"])) {
					found = true;
				}
			}
			if (!found) {
				console.log("new hashtag added");
				global_hashtags.push(new Hashtag(this.p5, hashtags_[i]["name"]));
			}
		}

		this.slug = slug_; //string

		// this.lab_affiliation = lab_affiliation_;

		// set random initial positions
		this.position = this.p5.createVector(  this.p5.random(spacing_distance, this.p5.windowWidth-400 - spacing_distance), this.p5.random(spacing_distance, this.p5.height - spacing_distance)  );
		this.final_position = this.p5.createVector(0, 0);
		this.random_spread = this.p5.createVector(this.p5.random(-spacing_distance, spacing_distance), this.p5.random(-spacing_distance, spacing_distance));
		this.size = node_size;
		this.alpha = 255;
		this.line_alpha = 50;
		this.color = [50, 124, 155];
		this.is_clicked = false; //are we in project mode or homepage mode?
	}

	//getters
	getPosition() { return this.position; }
	getFinalPosition() { return this.final_position; }
	getRandomSpread() { return this.random_spread; }
	getHashtags() { return this.hashtags; }
	getLineAlpha() { return this.line_alpha; }
	//getLabAffiliation() { return this.lab_affiliation; }
	getTitle() { return this.title; }
	getAuthors() { return this.authors; }
	getSize() { return this.size; }

	//setters
	setLineAlpha(l_a) { this.line_alpha = l_a; }
	setClick() { this.is_clicked = !this.is_clicked; }
	setPosition(p) { this.position = p }
	setFinalPosition(p) { this.final_position = p; }

	update() {
		if (this.p5.round(this.position.mag()) != this.p5.round(this.final_position.mag())) {
			var pos_difference = this.p5.createVector((this.final_position.x - this.position.x), (this.final_position.y - this.position.y));
			pos_difference.normalize();
			this.position.add(pos_difference);
		}

		if (this.is_clicked) {
			window.open("/projects/" + this.slug);
			this.is_clicked = false;
    } 
	}

	display() {
		this.p5.noStroke();
    this.p5.fill(this.color[0], this.color[1], this.color[2], this.alpha);
		this.p5.rectMode(this.p5.CENTER);
		this.p5.rect(this.getPosition().x, this.getPosition().y, this.size, this.size);
	}
}

const setup = (p5, canvasParentRef,props) => {
  p5.createCanvas(p5.windowWidth-400, 555).parent(canvasParentRef);
  p5.background(255);
	p5.noStroke();
	console.log(props);
	node_size = node_size/props.p.length; // the more projects we add, the smaller the nodes will become
	spacing_distance = node_size/2 + 20;
	for(var i =0; i< props.p.length; i++){
		// switched props.p[i].tags with props.p[i].category
		var n = new Node(p5, props.p[i].coverImage, props.p[i].title, props.p[i].author["name"], props.p[i].category, props.p[i].date, props.p[i].excerpt, props.p[i].slug);
		nodes.push(n);
	}
	for (var i = 0; i < nodes.length; i++) {
		console.log(nodes[i].final_position);
	}
	for(var i = 0; i < nodes.length; i++){
		gravitationalPull(p5, nodes[i]);
	}
	for (var i = 0; i < nodes.length; i++) {
		console.log(nodes[i].final_position);
	}
 }

const draw = p5 => {
	p5.background(255);
	p5.background(234, 227, 148, 100);
	for (var i = 0; i < nodes.length; i++) {
    for (var j = i; j < nodes.length; j++) {
      assignRelatedness(p5, nodes[i], nodes[j]);
    }
	}

	displayHashtags();
	
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].update();
		nodes[i].display();
		hover(p5, nodes[i]);
	}
}

const windowResized = p5 => {
	var amount_changed = p5.width;
	p5.resizeCanvas(p5.windowWidth-400, 555);
	amount_changed -= p5.width;
	for(var i = 0; i < nodes.length; i++){
		console.log(nodes[i].getPosition().x, amount_changed);
		var reset_position = p5.createVector(nodes[i].getPosition().x-amount_changed, nodes[i].getPosition().y);
		nodes[i].setPosition(reset_position);
	}
}

const mousePressed = p5 => {
  for (var i = 0; i < nodes.length; i++) {
    if (p5.mouseX > nodes[i].getPosition().x - nodes[i].size / 2 &&
      p5.mouseX < nodes[i].getPosition().x + nodes[i].size / 2 &&
      p5.mouseY > nodes[i].getPosition().y - nodes[i].size / 2 &&
      p5.mouseY < nodes[i].getPosition().y + nodes[i].size / 2) {
      nodes[i].setClick();
    }
	}
	
	for (var i = 0; i < global_hashtags.length; i++) {
    global_hashtags[i].checkPositions();
  }
}

const mouseDragged = p5 => {
  for (var i = 0; i < global_hashtags.length; i++) {
    if (global_hashtags[i].getDragged() == true) { // if its being dragged
      global_hashtags[i].setPosition(p5.createVector(p5.mouseX, p5.mouseY));
    }
  }
}

const mouseReleased = p5 => {
  for (var i = 0; i < global_hashtags.length; i++) {
    if (global_hashtags[i].getDragged() == true) {
      global_hashtags[i].setDragged(false);
    }
	}
	
	for (var i = 0; i < nodes.length; i++) {
		gravitationalPull(p5, nodes[i]);
	}
}

function displayHashtags() {
	for (var i = 0; i < global_hashtags.length; i++) {
		//grab their positions and visualize their names at that coordinate
		global_hashtags[i].display();
	}
}

function hover(p5, p) {
  if (p5.mouseX > p.getPosition().x - p.getSize() / 2 &&
    p5.mouseX < p.getPosition().x + p.getSize() / 2 &&
    p5.mouseY > p.getPosition().y - p.getSize() / 2 &&
		p5.mouseY < p.getPosition().y + p.getSize() / 2) 
	{
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
	for (var i = 0; i < p2.getAuthors().length; i++) {
		if (p1.getAuthors().includes(p2.getAuthors()[i])) {
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

//this organizes the node position based on hashtag location
function gravitationalPull(p5, p) {
  var ht_array = p.getHashtags();
  var directionVector = p5.createVector(0);
	var count = 0;

  for (var i = 0; i < ht_array.length; i++) {
    for (var j = 0; j < global_hashtags.length; j++) {
      var finalPos = p5.createVector(global_hashtags[j].getPosition().x, global_hashtags[j].getPosition().y);
      if (p5.match(global_hashtags[j].getName(), ht_array[i])) {
				count++;
        directionVector.add(finalPos);
      }
    }
	}
	directionVector.div(count); // MAY NOT BE NEEDED???
	directionVector.add(p.getRandomSpread()); //this ensures that the projects won't go on top of one another
	p.setFinalPosition(directionVector);
}

export { setup, draw, mousePressed, mouseDragged, mouseReleased, windowResized };