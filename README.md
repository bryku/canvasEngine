### Canvas Engine

Add sprites to the canvas with animation support.

```
let game = canvasEngine('canvas');
	game.importImage('./img/planet-tiles.png');
	game.importAudio('./aud/jumpland.wav');
	game.importObject('./dat/moon.json');
	game.importObject('./dat/stars.json');
```

### Adding Image

```
	game.objects.push({
		source: './img/planet-tiles.png',
		sourcePosition: {x:  96, y: 32, w: 32, h: 32},
		canvasPosition: {x:  0, y: 0, w: game.canvas.width, h: game.canvas.height},
	});
```

### Adding Animation

```
	game.objects.push({
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
	});
```

### Adding Text

```
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
```
