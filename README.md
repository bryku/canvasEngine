### Canvas Engine

Add sprites to the canvas with animation support.

```
let game = canvasEngine('canvas');
	game.importImage('./img/planet-tiles.png');
	game.importAudio('./aud/jumpland.wav');
	game.importObject('./dat/moon.json');
	game.importObject('./dat/stars.json');

	game.objects.push({
		source: './img/planet-tiles.png',
		sourcePosition: {x:  96, y: 32, w: 32, h: 32},
		canvasPosition: {x:  0, y: 0, w: game.canvas.width, h: game.canvas.height},
	});
