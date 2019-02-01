const carouselContent = {
	ids: [1, 2, 3, 4, 5, 6]
};

class Carousel {
	constructor(data){
		this.data = data;
		this.slides = [];
		this.currentlySelected = 0;

		this.generateContainer();
		this.generateSlides();
		this.generateControls();
		this.renderSlides();
		this.playCarousel();
	}

	generateContainer(){
		let carousel_container = document.createElement('div');
		carousel_container.classList.add('carousel-container');
		document.querySelector('.box').parentNode.prepend(carousel_container);
		document.querySelectorAll('.box').forEach(elem => elem.remove());
	}

	generateSlides(){
		let carousel_container = document.querySelector('.carousel-container');
		this.data.ids.forEach((id) => {
			let i = id-1;
			let slide = document.createElement('div');
			slide.classList.add('slide', 'fade')
			
			let numbertext = document.createElement('div');
			numbertext.classList.add('numbertext');
			numbertext.textContent = `${this.data.ids[i]} / ${this.data.ids.length}`;
			
			let image = document.createElement('img');
			image.setAttribute('src', `./img/${this.data.ids[i]}.jpg`);
			image.style.width = "100%";
			
			let txt = document.createElement('div');
			txt.classList.add('txt');
			txt.textContent = `Caption ${this.data.ids[i]}`;
			
			
			slide.appendChild(numbertext);
			slide.appendChild(image);
			slide.appendChild(txt);
			
			carousel_container.appendChild(slide);
		});
	}

	generateControls(){
		let carousel_container = document.querySelector('.carousel-container');
		let prev = document.createElement('a');
		prev.classList.add('prev');
		prev.textContent = "<";

		let next = document.createElement('a');
		next.classList.add('next');
		next.textContent = ">";

		this.renderSlideNavs([prev, next]);

		carousel_container.appendChild(prev);
		carousel_container.appendChild(next);
	}

	renderSlides(){
		document.querySelectorAll('.slide').forEach(slide => {
			let new_slide = new Slide(slide);
			this.slides.push(new_slide);
		});
	}

	renderSlideNavs(arr){
		return arr.forEach(elem => new SlideNav(elem));
	}

	updateCurrentlySelected(direction){
		this.slides[this.currentlySelected % this.slides.length].deselect();
		this.currentlySelected += direction ? 1 : -1;
		this.slides[this.currentlySelected % this.slides.length].select();
	}

	playCarousel(){
		this.slides[this.currentlySelected % this.slides.length].select();
	}
}

class SlideNav {
	constructor(element){
		this.element = element;
		
		this.element.addEventListener('click', () => this.changeSlide());
	}

	changeSlide(){
		return carousel.updateCurrentlySelected(this.element.classList.contains('next') ? true : false);
	}

}

class Slide {
	constructor(element){
		this.element = element;
	}

	select(){
		this.element.classList.toggle('active');
	}

	deselect(){
		this.element.classList.remove('active');
	}
}


let carousel = new Carousel(carouselContent);