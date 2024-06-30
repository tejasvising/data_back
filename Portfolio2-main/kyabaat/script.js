function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}




/////////sound start

const soundCloud = document.querySelector('.sound-cloud')
const off = document.querySelector('#off')
const on = document.querySelector('#on')
const myAudio = document.querySelector('#myAudio')

off.addEventListener('click', () => soundTrack('off'))
on.addEventListener('click', () => soundTrack('on'))

const soundTrack = (soundState) => {
  if (soundState === 'off') {
    on.style.display = 'block'
    off.style.display = 'none'
    soundCloud.style.color = '#08fdd8'
    myAudio.play()
  } else if (soundState === 'on') {
    on.style.display = 'none'
    off.style.display = 'block'
    soundCloud.style.color = '#f50057'
    myAudio.pause()
  }
}

// Play music functionality

const btnBars = document.querySelector('.bars')
const btnTimes = document.querySelector('.times')
const SideNav = document.querySelector('.aside')

btnBars.addEventListener('click', () => myFunc('open'))
btnTimes.addEventListener('click', () => myFunc('close'))

const myFunc = (navCondition) => {
  if (navCondition === 'open') {
    SideNav.classList.add('show-nav')
    btnTimes.style.display = 'block'
    btnBars.style.display = 'none'
  } else if (navCondition === 'close') {
    SideNav.classList.remove('show-nav')
    btnTimes.style.display = 'none'
    btnBars.style.display = 'block'
  }
}
///////////sound end

window.addEventListener("DOMContentLoaded",() => {
	const c = new Clock30(".clock");
});

class Clock30 {
	time = [];

	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.timeUpdate();
	}
	get timeAsObject() {
		const date = new Date();
		const h = date.getHours();
		const m = date.getMinutes();

		return {h,m};
	}
	get timeInWords() {
		let {h} = this.timeAsObject;
		const {m} = this.timeAsObject;
		// hour
		if (h > 12) h -= 12;
		else if (h === 0) h = 12;

		const hrDigits = `${h}`.split("");
		if (h < 10) hrDigits.unshift("0");
		// minute
		const minDigits = `${m}`.split("");
		if (m < 10) minDigits.unshift("0");

		const numbers = {
			_1: "one",
			_2: "two",
			_3: "three",
			_4: "four",
			_5: "five",
			_6: "six",
			_7: "seven",
			_8: "eight",
			_9: "nine",
			_10: "ten",
			_11: "eleven",
			_12: "twelve",
			_13: "thirteen",
			_14: "fourteen",
			_15: "fifteen",
			_16: "sixteen",
			_17: "seventeen",
			_18: "eighteen",
			_19: "nineteen",
			_20: "twenty"
		};

		let words = "";
		const hour = numbers[`_${h}`];
		let nextHourProp = h + 1;
	
		if (nextHourProp > 12) nextHourProp %= 12;
	
		const nextHour = numbers[`_${nextHourProp}`];

		if (m === 0) {
			words = `${hour} o’clock`;
		} else if (m === 15) {
			words = `quarter past ${hour}`;
		} else if (m < 30) {
			let min = numbers[`_${m}`];
			// values higher than 20 won’t be found
			if (!min) {
				const minFirstDigit = +minDigits[0];
				const minLastDigit = +minDigits[1];
				const firstWord = numbers[`_${minFirstDigit}0`];
				const lastWord = numbers[`_${minLastDigit}`];
				min = `${firstWord}-${lastWord}`;
			}
			words = `${min} minutes past ${hour}`;
		} else if (m === 30) {
			words = `half past ${hour}`;
		} else if (m === 45) {
			words = `quarter to ${nextHour}`;
		} else if (m > 30) {
			const minsLeft = 60 - m;
			let min = numbers[`_${minsLeft}`];
			// values higher than 20 won’t be found
			if (!min) {
				const digitString = `${minsLeft}`;
				const minsLeftFirstDigit = +digitString[0];
				const minsLeftLastDigit = +digitString[1];
				const firstWord = numbers[`_${minsLeftFirstDigit}0`];
				const lastWord = numbers[`_${minsLeftLastDigit}`];
				min = `${firstWord}-${lastWord}`;
			}
			words = `${min} minutes to ${nextHour}`;
		}

		return words;
	}
	timeUpdate() {
		const flyInClass = "clock__word--fade-fly-in";
		const time = this.timeInWords.split(" ");
		// if half past, insert a space between “half” and “past” so “past” is boldfaced
		if (time.indexOf("half") > -1) {
			time.splice(1,0,"");
		}
		// display the time
		const timeWordEls = Array.from(this.el.querySelectorAll(".clock__word"));

		for (let i = 0; i < timeWordEls.length; ++i) {
			const wordEl = timeWordEls[i];
			wordEl.innerText = time[i] || "";

			if (time[i] !== this.time[i]) {
				wordEl.classList.add(flyInClass);
			} else {
				wordEl.classList.remove(flyInClass);
			}
		}

		this.time = time;
		// loop
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
	}
}