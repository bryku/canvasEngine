function canvasEngine(query){
	let engine = {};
		engine.paused = false;
		engine.canvas = typeof query == 'string' 
			? document.querySelector('canvas') // query selector string
			: query; // element
		engine.updateSize = function(){
			// This prevents stretching when settings size in css.
			// You should use an eventListener to trigger this function on screensize change.
			this.canvas.width = this.canvas.offsetWidth;
			this.canvas.height = this.canvas.offsetHeight;
		};
		engine.updateSize();
	
		engine.context = engine.canvas.getContext('2d', {alpha: false});
		// prevent smoothing for pixel art.
		engine.context.imageSmoothingEnabled = false; 
		engine.context.wekitImageSmoothingEnable = false;
		engine.context.mozImageSmoothingEnabled = false;
		engine.context.msImageSmoothingEnabled = false;
		engine.context.oImageSmoothingEnabled = false;

		engine.images = {};
		engine.importImage = function(url){
			// ensures you only have 1 copy of that image.
			if(!this.images[url]){
				this.images[url] = new Image();
				this.images[url].src = url;
			}
			return this.images[url];
		}
		engine.audios = {};
		engine.importAudio = function(url){
			// ensures you only have 1 copy of that audio.
			if(!this.audios[url]){
				this.audios[url] = new Audio();
				this.audios[url].src = url;
			}
			return this.audios[url];
		}

		engine.importObject = function(url, options = {}, callback = false){
			fetch(url, options)
				.then((res)=>{
					if(res.status != 200){ throw new Error('Status ' + res.status); }
					return res.json()
				})
				.then((objects)=>{
					if(Array.isArray(objects)){ this.objects = this.objects.concat(objects); }
					else{ this.objects.push(objects); }
					if(callback){ callback(objects); }
				})
				.catch((err)=>{
					console.log(`Error: ${err.message}`);
					console.log(`--- url: ${url}`);
				});
		},
		engine.objects = [];
		engine.objectsRender = function(){
			this.objects.forEach((object)=>{
				this.objectRender(object);
			});
		}
		engine.objectsSortTicks = 0;
		engine.objectsSortLimit = 15; 
		engine.objectsSort = function(){
			// sorts objects by canvasPosition.y.
			// ensures lower objects are on top.
			this.objectsSortTicks++;
			if(this.objectsSortTicks > this.objectsSortLimit){
				this.objectsSortTicks = 0;
				this.objects.sort((object1, object2)=>{
					if(object1.canvasPosition.y < object2.canvasPosition.y){ return -1; }
					else if(object1.canvasPosition.y > object2.canvasPosition.y){ return 1; }
					return 0;
				});
			}
		}
		engine.objectRender = function(object){
			// automatically triggers before rendering.
			// useful for movement or attacks to change the sourceAnimationState.
			if(object.onRender){
				object.onRender(object);
			}
			
			let image = this.images[object.source];
			if(!image && !object.sourceText){ 
				console.log(`Error: Image not found`);
				console.log(`--- url: ${object.source}`);
				console.log(`--- try: game.importImage(${object.source})`);
				return false;
			}

			if(object.sourceAnimation){
				// automatically handles the animation.
				if(!object.sourceAnimationTicks){ object.sourceAnimationTicks = 0; }
				if(!object.sourceAnimationFrame){ object.sourceAnimationFrame = 0; }

				object.sourceAnimationTicks++;
				if(object.sourceAnimationTicks >= object.sourceAnimationLimit){
					object.sourceAnimationTicks = 0;
					object.sourceAnimationFrame++;
				}
				if(object.sourceAnimationFrame > object.sourceAnimation[object.sourceAnimationState].length - 1){
					object.sourceAnimationFrame = 0;
				}

				let frame = object.sourceAnimation[object.sourceAnimationState][object.sourceAnimationFrame];
				this.context.drawImage(image, frame.x, frame.y, frame.w, frame.h, object.canvasPosition.x, object.canvasPosition.y, object.canvasPosition.w || frame.w, object.canvasPosition.h || frame.h);
			}else if(object.sourcePosition){
				this.context.drawImage(image, object.sourcePosition.x, object.sourcePosition.y, object.sourcePosition.w, object.sourcePosition.h, object.canvasPosition.x, object.canvasPosition.y, object.canvasPosition.w || object.w, object.canvasPosition.h || object.h);
			}else if(object.sourceText){
				this.context.font = `${object.sourceTextSize} ${object.sourceTextFont}`;
				this.context.fillStyle = object.sourceTextColor || '#000000';
				this.context.fillText(object.sourceText, object.canvasPosition.x, object.canvasPosition.y);
			}
		}

		engine.fps = 0;
		engine.fpsTicks = 0;
		engine.fpsUpdate = function(){
			engine.fpsTicks++;
		}
		engine.fpsInterval = setInterval(()=>{
			engine.fps = engine.fpsTicks;
			engine.fpsTicks = 0;
		}, 1000, engine);
		engine.interval = setInterval((e)=>{
			if(e.paused == false){
				e.objectsRender();
				e.objectsSort();
				e.fpsUpdate();
			}
		}, 1000/60, engine);

	return engine;
}