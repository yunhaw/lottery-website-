
$ (function(){
	var speed = 150, //跑馬燈速度150
		click = true, //阻止多次點擊
		img_index = -1, //陰影停在當前獎品的序號
		circle = 0, //跑馬燈跑了多少次
		maths,//取一個隨機數;
		temp=[], //暫存以去重複
		num=$('.red').text();

	$('.start').click(function() {
		if(click&&num>0) {
			click = false;			
			//for(var i=0;i<16;i++){ //測試方便用
			check = true;	
			while(check == true){
				again = false; //初始化
				maths = Math.round( Math.random() * 16 );

				for( var i=0; i<temp.length; i++){ //依序檢查
					if(temp[i] == maths || maths == 0) //與抽過的結果相等或抽到0
						again = true; //再抽一次
				}
				if(again == false) check = false; //沒有重複不用抽，跳出迴圈
			}		
			temp.push(maths); //紀錄抽獎結果，放入陣列
            //alert(maths); //測試方便用
			//} //測試方便用
            light();
		} else {
			return false;
		}
	});

	function light() {
		img();
		circle++;
        var newMaths = maths + 80;

		var timer = setTimeout(light, speed);
		if(circle > 0 && circle < 5) {
			speed -= 10;
		} else if(circle > 5 && circle < 20) {
			speed -= 5;
		} else if(circle > 50 && circle < 70) {
			speed += 5
		} else if(circle > 70 && circle < maths) {
			speed += 10
		} else if(circle == newMaths) {
			var text = $('.gift_div .gift:eq(' + img_index + ')').text();
			console.log(circle + maths, 'aaa', img_index, $('.gift_div .gift:eq(' + img_index + ')').text())
			clearTimeout(timer);

			setTimeout(function() {
				alert('恭喜獲得' + text)
			}, 300)
			click = true;
			speed = 150;
			circle = 0;
			img_index = -1;
			num--;
			$('.red').text(num)
		}
	}

	function img() {
		if(img_index < 15) {
			img_index++;
		} else if(img_index == 15) {
			img_index = 0;
		}
		$('.gift_div .gift:eq(' + img_index + ')').addClass('gift_b').siblings().removeClass('gift_b');
	}
});