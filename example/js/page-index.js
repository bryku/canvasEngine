

let game = canvasEngine('canvas');
	// importing
	game.importImage('./img/planet-tiles.png');
	game.importAudio('./aud/jumpland.wav');
	game.importObject('./dat/moon.json');
	game.importObject('./dat/stars.json');
	/*
		Note: you can declare a variable when importing images and audio.
			let landingSound = game.importAudio('./aud/jumpland.wav');

		Note: you can call images or audio using their url
			game.audios['./aud/jumpland.wav'].play();
			
		Note: objects supply a callback function when imported.
			game.importObject('./dat/moon.json', {method: 'GET'}, (object)=>{
				console.log(object);
			});
		
		Note: .importObject() can import an array of objects as well.
		
	*/

	// create a static image from a sprite sheet.
	game.objects.push({
		source: './img/planet-tiles.png',
		sourcePosition: {x:  96, y: 32, w: 32, h: 32},
		canvasPosition: {x:  0, y: 0, w: game.canvas.width, h: game.canvas.height},
	});

	// generate static sprites from a sprite sheet.
	for(let i = 0; i < 600; i = i + 96){
		game.objects.push({
			source: './img/planet-tiles.png',
			sourcePosition: {x:  32, y:   0, w: 32, h: 32},
			canvasPosition: {x: 0+i, y: 307, w: 96, h: 96},
		});
	}

	// player object
	game.importImage('./img/alien-1.png');
	let alien1 = { // image
		source: './img/alien-1.png',
		sourcePosition: {x:  0, y: 32, w: 32, h: 32},
		canvasPosition: {x:  100, y: 212, w: 96, h: 96},
	};
	game.objects.push(alien1);

	// player animation
	game.importImage('./img/alien-2.png');
	let alien2 = { // animation
		source: './img/alien-2.png',
		sourceAnimation: {
			'idle-right': [
				{x:  0, y: 32, w: 32, h: 32}, // frame 1 of animation
				{x: 32, y: 32, w: 32, h: 32}, // frame 2 of animation
				{x: 64, y: 32, w: 32, h: 32}, // frame 3 of animation
				{x: 96, y: 32, w: 32, h: 32}, // frame 4 of animation
				{x:128, y: 32, w: 32, h: 32}, // frame 5 of animation
			],
		},
		sourceAnimationState: 'idle-right',
		sourceAnimationLimit: 10,
			// 10 = 6 times a second
			// 15 = 4 times a second
			// 30 = 2 times a second
		canvasPosition: {x:  200, y: 212, w: 96, h: 96},
	};
	game.objects.push(alien2);


	// changing animation
	game.importImage('./img/alien-3.png');
	let alien3 = { // animation
		source: './img/alien-3.png',
		sourceAnimation: {
			'idle-right': [
				{x:  0, y: 32, w: 32, h: 32}, // frame 1 of animation
				{x: 32, y: 32, w: 32, h: 32}, // frame 2 of animation
				{x: 64, y: 32, w: 32, h: 32}, // frame 3 of animation
				{x: 96, y: 32, w: 32, h: 32}, // frame 4 of animation
				{x:128, y: 32, w: 32, h: 32}, // frame 5 of animation
			],
			'idle-left': [
				{x:  0+256, y: 32, w: 32, h: 32}, // frame 1 of animation
				{x: 32+256, y: 32, w: 32, h: 32}, // frame 2 of animation
				{x: 64+256, y: 32, w: 32, h: 32}, // frame 3 of animation
				{x: 96+256, y: 32, w: 32, h: 32}, // frame 4 of animation
				{x:128+256, y: 32, w: 32, h: 32}, // frame 5 of animation
			],
		},
		sourceAnimationState: 'idle-right',
		sourceAnimationLimit: 10,
			// 10 = 6 times a second
			// 15 = 4 times a second
			// 30 = 2 times a second
		canvasPosition: {x:  300, y: 212, w: 96, h: 96},
	};
	game.objects.push(alien3);

	setInterval(()=>{
		if(alien3.sourceAnimationState == 'idle-right'){
			game.audios['./aud/jumpland.wav'].play();
			alien3.sourceAnimationState = 'idle-left';
		}else if(alien3.sourceAnimationState == 'idle-left'){
			alien3.sourceAnimationState = 'idle-right';
			game.audios['./aud/jumpland.wav'].play();
		}
		
	}, 2000);


	// onRender - this triggers before the object is rendered.
	// useful for movement or attacks to change the sourceAnimationState.
	game.objects.push({
		source: true,
		sourceTextFont: 'tektur',
		sourceTextSize: '32px',
		sourceTextColor: '#ffffff',
		sourceText: '0',
		canvasPosition: {x: 480, y: 30},
		onRender: (object)=>{
			object.sourceText = "FPS: " + game.fps;
		},
	});

