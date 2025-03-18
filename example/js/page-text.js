let game = canvasEngine('canvas');
	game.importImage('./img/planet-tiles.png');
	game.importObject('./dat/moon.json');
	game.importObject('./dat/stars.json');
	game.importImage('./img/alien-1.png');
	game.objects.push({ // background
		source: './img/planet-tiles.png',
		sourcePosition: {x:  96, y: 32, w: 32, h: 32},
		canvasPosition: {x:  0, y: 0, w: game.canvas.width, h: game.canvas.height},
	});
	for(let i = 0; i < 600; i = i + 96){ // ground
		game.objects.push({
			source: './img/planet-tiles.png',
			sourcePosition: {x:  32, y:   0, w: 32, h: 32},
			canvasPosition: {x: 0+i, y: 307, w: 96, h: 96},
		});
	}

	for(let i = 0; i < 400; i = i + 4){
		game.objects.push({ // alien
			source: './img/alien-1.png',
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
			canvasPosition: {x: 0+i, y: 12, w: 96, h: 96},
		});
	}

	for(let i = 0; i < 400; i = i + 4){
		game.objects.push({ // alien
			source: './img/alien-1.png',
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
			canvasPosition: {x: 0+i, y: 112, w: 96, h: 96},
		});
	}
	for(let i = 0; i < 400; i = i + 4){
		game.objects.push({ // alien
			source: './img/alien-1.png',
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
			canvasPosition: {x: 0+i, y: 212, w: 96, h: 96},
		});
	}
for(let i = 0; i < 400; i = i + 4){
	game.objects.push({ // alien
		source: './img/alien-1.png',
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
		canvasPosition: {x: 0+i, y: 312, w: 96, h: 96},
	});
}
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

