var app = new Vue({
		el: '#app',
		data: {
			isChoose: -1,
			animals: [{
				id: 1,
				level: 1,
				name: '象',
				player: 1,
				show: 1,
				img: 'img/1.png',
			}, {
				id: 2,
				level: 2,
				name: '狮',
				player: 1,
				show: 1,
				img: 'img/2.png',
			}, {
				id: 3,
				level: 3,
				name: '虎',
				player: 1,
				show: 1,
				img: 'img/3.png',
			}, {
				id: 4,
				level: 4,
				name: '豹',
				player: 1,
				show: 1,
				img: 'img/4.png',
			}, {
				id: 5,
				level: 5,
				name: '狼',
				player: 1,
				show: 1,
				img: 'img/5.png',
			}, {
				id: 6,
				level: 6,
				name: '狗',
				player: 1,
				show: 1,
				img: 'img/6.png',
			}, {
				id: 7,
				level: 7,
				name: '猫',
				player: 1,
				show: 1,
				img: 'img/7.png',
			}, {
				id: 8,
				level: 8,
				name: '鼠',
				player: 1,
				show: 1,
				img: 'img/8.png',
			}, {
				id: 9,
				level: 1,
				name: '象',
				player: 2,
				show: 1,
				img: 'img/9.png',
			}, {
				id: 10,
				level: 2,
				name: '狮',
				player: 2,
				show: 1,
				img: 'img/10.png',
			}, {
				id: 11,
				level: 3,
				name: '虎',
				player: 2,
				show: 1,
				img: 'img/11.png',
			}, {
				id: 12,
				level: 4,
				name: '豹',
				player: 2,
				show: 1,
				img: 'img/12.png',
			}, {
				id: 13,
				level: 5,
				name: '狼',
				player: 2,
				show: 1,
				img: 'img/13.png',
			}, {
				id: 14,
				level: 6,
				name: '狗',
				player: 2,
				show: 1,
				img: 'img/14.png',
			}, {
				id: 15,
				level: 7,
				name: '猫',
				player: 2,
				show: 1,
				img: 'img/15.png',
			}, {
				id: 16,
				level: 8,
				name: '鼠',
				player: 2,
				show: 1,
				img: 'img/16.png',
			}, ]
		},
		created: function() {
			if(!Array.prototype.shuffle) {
				Array.prototype.shuffle = function() {
					for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
					return this;
				};
			}
			this.animals.shuffle();
			this.animals.shuffle();
		},
		methods: {
			choose: function(index) {
				this.isChoose = index;
			},
			gernerateId: function(index) {
				return "back_" + index;
			},
			gernerateBtmId: function(index) {
				return "btm_" + index;
			},
			gernerateItemId: function(index) {
				return index;
			},
			moveitem: function(e) {
				$target_top = e.target.style.top;
				$target_left = e.target.style.left;
				$target_id = e.target.getAttribute('id');
				$item_self = document.getElementsByClassName('choose');
				if($item_self[0] == undefined) {
					e.target.style.background = 'url(' + this.animals[$target_id].img;
				} else if(e.target.style.background == 'url("img/default.jpg")') {
					this.isChoose = -1;
					$item_self[0].classList.remove('choose');
				} else {
					$item_id = $item_self[0].getAttribute('id');
					if(this.animals[$item_id].level < this.animals[$target_id].level && this.animals[$item_id].player != this.animals[$target_id].player) {
						this.animals[$target_id].show = 0;
						this.isChoose = -1;
						$item_self[0].style.top = $target_top;
						$item_self[0].style.left = $target_left;
						$item_self[0].classList.remove('choose');
					} else if(this.animals[$item_id].level == this.animals[$target_id].level && this.animals[$item_id].player != this.animals[$target_id].player) {
						this.animals[$item_id].show = 0;
						this.animals[$target_id].show = 0;
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					} else {
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					}
				}
			},
			moveblank: function(e) {
				$target_top = e.target.style.top;
				$target_left = e.target.style.left;
				$item_self = document.getElementsByClassName('choose');
				if($item_self[0] == undefined) {} else {
					this.isChoose = -1;
					$item_self[0].style.top = $target_top;
					$item_self[0].style.left = $target_left;
					$item_self[0].classList.remove('choose');
				}
			}
		},
	}

)