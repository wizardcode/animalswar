var app = new Vue({
		el: '#app',
		data: {
			isChoose: -1,
			players: 0,
			timeID: 0, //定时器ID，保证单击和双击事件间的时间
			available: 1, //确保单击事件后可否进行双击事件
			animals: [{
				id: 1,
				level: 1,
				name: '象',
				player: 1,
				show: 1,
				img: 'img/1.png',
				safe: 0,
			}, {
				id: 2,
				level: 2,
				name: '狮',
				player: 1,
				show: 1,
				img: 'img/2.png',
				safe: 0,
			}, {
				id: 3,
				level: 3,
				name: '虎',
				player: 1,
				show: 1,
				img: 'img/3.png',
				safe: 0,
			}, {
				id: 4,
				level: 4,
				name: '豹',
				player: 1,
				show: 1,
				img: 'img/4.png',
				safe: 0,
			}, {
				id: 5,
				level: 5,
				name: '狼',
				player: 1,
				show: 1,
				img: 'img/5.png',
				safe: 0,
			}, {
				id: 6,
				level: 6,
				name: '狗',
				player: 1,
				show: 1,
				img: 'img/6.png',
				safe: 0,
			}, {
				id: 7,
				level: 7,
				name: '猫',
				player: 1,
				show: 1,
				img: 'img/7.png',
				safe: 0,
			}, {
				id: 8,
				level: 8,
				name: '鼠',
				player: 1,
				show: 1,
				img: 'img/8.png',
				safe: 0,
			}, {
				id: 9,
				level: 1,
				name: '象',
				player: 2,
				show: 1,
				img: 'img/9.png',
				safe: 0,
			}, {
				id: 10,
				level: 2,
				name: '狮',
				player: 2,
				show: 1,
				img: 'img/10.png',
				safe: 0,
			}, {
				id: 11,
				level: 3,
				name: '虎',
				player: 2,
				show: 1,
				img: 'img/11.png',
				safe: 0,
			}, {
				id: 12,
				level: 4,
				name: '豹',
				player: 2,
				show: 1,
				img: 'img/12.png',
				safe: 0,
			}, {
				id: 13,
				level: 5,
				name: '狼',
				player: 2,
				show: 1,
				img: 'img/13.png',
				safe: 0,
			}, {
				id: 14,
				level: 6,
				name: '狗',
				player: 2,
				show: 1,
				img: 'img/14.png',
				safe: 0,
			}, {
				id: 15,
				level: 7,
				name: '猫',
				player: 2,
				show: 1,
				img: 'img/15.png',
				safe: 0,
			}, {
				id: 16,
				level: 8,
				name: '鼠',
				player: 2,
				show: 1,
				img: 'img/16.png',
				safe: 0,
			}, ]
		},
		created: function() {
			if(!Array.prototype.shuffle) {
				Array.prototype.shuffle = function() {
					for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
					return this;
				};
			}
			for(var j = 0; j < 100; j++) {
				this.animals.shuffle();
			}
		},
		methods: {
			result: function(info) {
				this.$confirm('' + info, '游戏结果', {
					confirmButtonText: '再来一局',
					cancelButtonText: '关闭',
				}).then(() => {
					location.reload();
				}).catch(() => {
				});
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
			safeId: function(index) {
				return 'safe_' + index;
			},
			moveitem: function(e) {
				$target_top = e.target.style.top; //单击目标位置
				$target_left = e.target.style.left;
				$target_id = e.target.getAttribute('id'); //单击目标id
				$item_self = document.getElementsByClassName('choose'); //已选中DOM
				$background = e.target.style.backgroundImage.indexOf("img/default.jpg"); //获取目标图片属性，后续判断目标是否被掀开。
				if(this.available == 0) { //快速点击时，进入以下逻辑
					if($background > 0 && $item_self[0] != undefined) { //保证未掀开时多击取消选择。
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					}
					//else中缺省，有种在掀开牌时快速双击保持选中状态。
				} else if($background > 0 && $item_self[0] != undefined) { //保证选中的动物目的地为未掀开动物时无效
					this.isChoose = -1;
					$item_self[0].classList.remove('choose');
				} else if($item_self[0] == undefined && $background > 0) { //在没有选中的情况下，单击未掀开的动物可掀开
					clearTimeout(this.timeID);
					e.target.style.backgroundImage = 'url(' + this.animals[$target_id].img + ')'; //加载动物图片
					this.available = 0; //掀牌时修改记录值
					if(this.players === 0) { //记录第一次掀牌的玩家id
						this.players = this.animals[$target_id].player;
					} else {
						this.players = 3 - this.players; //控制权移交另一玩家
					}
					this.timeID = setTimeout(function() { //保证在掀牌时双击或多击事件只触发单击操作，不出现选中情况
						app.available = 1;
					}, 500); //500毫秒后恢复记录值，确保可进行正常操作
				} else if($background < 0 && $item_self[0] == undefined) { //在未选择情况下，单击已掀开的动物可进行选择
					clearTimeout(this.timeID);
					this.available = 0; //掀牌时修改记录值
					if(this.animals[$target_id].player != this.players) {
						this.isChoose = $target_id;
					}
					this.timeID = setTimeout(function() { //保证在掀牌时双击或多击事件只触发单击操作，不出现选中情况
						app.available = 1;
					}, 500); //500毫秒后恢复记录值，确保可进行正常操作

				} else { //选中动物后，单击掀开动物执行此后操作。
					clearTimeout(this.timeID);
					$item_id = $item_self[0].getAttribute('id'); //获取目标id
					if(this.animals[$target_id].safe === 1) { //若动物在保护区，不能对目标采取任何操作。
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					} else if(this.animals[$item_id].level == this.animals[$target_id].level - 7) { //禁止大象吃鼠
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
						//高战斗力可干掉低战斗力者，同时保证鼠可以干掉大象
					} else if((this.animals[$item_id].level < this.animals[$target_id].level || this.animals[$item_id].level == this.animals[$target_id].level + 7) && this.animals[$item_id].player != this.animals[$target_id].player) {
						this.animals[$target_id].show = 0; //目标被干掉
						this.isChoose = -1; //移除选中动物
						$item_self[0].style.top = $target_top;
						$item_self[0].style.left = $target_left;
						this.players = this.animals[$item_id].player; //记录玩家id
						this.animals[$item_id].safe = 0; //恢复正常模式
						$item_self[0].classList.remove('choose');
						//同一战斗力的不同方可以同归于尽
					} else if(this.animals[$item_id].level == this.animals[$target_id].level && this.animals[$item_id].player != this.animals[$target_id].player) {
						this.animals[$item_id].show = 0; //目标双双被干掉
						this.animals[$target_id].show = 0;
						this.players = this.animals[$item_id].player;
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					} else { //不符合规则的操作到此
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					}
				}
			},
			moveblank: function(e) { //点击空白处触发事件
				$target_top = e.target.style.top; //获取目的地的坐标地址
				$target_left = e.target.style.left;
				$item_self = document.getElementsByClassName('choose'); //获取已选中的DOM
				if($item_self[0] == undefined) {} else {
					$item_id = $item_self[0].getAttribute('id'); //获取动物ID
					this.isChoose = -1; //取消选择
					$item_self[0].style.top = $target_top; //移动选中动物到目的地
					$item_self[0].style.left = $target_left;
					$item_self[0].classList.remove('choose'); //取消选择样式
					this.players = this.animals[$item_id].player; //记录玩家操作
					this.animals[$item_id].safe = 0; //恢复正常模式
				}
			},
			movesafe: function(e) { //点击安全区域，触发此事件
				$target_top = e.target.style.top; //获取目的地的坐标地址
				$target_left = e.target.style.left;
				$item_self = document.getElementsByClassName('choose');
				if($item_self[0] == undefined) {} else {
					$item_id = $item_self[0].getAttribute('id'); //获取动物ID
					this.isChoose = -1; //取消选择
					$item_self[0].style.top = $target_top; //移动选中动物到目的地
					$item_self[0].style.left = $target_left;
					$item_self[0].classList.remove('choose'); //取消选择样式
					this.players = this.animals[$item_id].player; //记录玩家操作
					this.animals[$item_id].safe = 1; //安全，不可被杀死。
				}
			}
		},
		mounted: function() {
			var u = navigator.userAgent;
			if(u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('Windows Phone') > -1 || u.indexOf('iPod') > -1) {
				var width = window.screen.width;
				var height = window.screen.height;
				var top = parseInt((height - width) / 2);
				if(top > 0) {
					document.getElementById('backbox').style.marginTop = top + 'px';
				}
			}

		}
	}

)

function gameResult() {
	var data = app.animals;
	var plays1 = 0;
	var plays2 = 0;
	for(var i = 0; i < data.length; i++) {
		if(data[i]['show'] == 0 && data[i]['player'] == 1) {
			plays1++;
		} else if(data[i]['show'] == 0 && data[i]['player'] == 2) {
			player2++;
		}
		if(plays1 == plays2 && plays1 == 8) {
			app.result('平局！');
		} else if(plays1 == 8) {
			app.result('蓝方胜出！');
		} else if(plays2 == 8) {
			app.result('红方胜出！');
		}
	}
}
setInterval(function() {
	gameResult();
}, 2000);