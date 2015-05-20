var util = require('util');
var consoleWindows = function() {
  var colors = {
    foreground: {
      black: 	'30',
      red: 		'31',
      green: 	'32',
      yellow: 	'33',
      blue: 	'34',
      magenta: 	'35',
      cyan: 	'36',
      white: 	'37'
    },
    background: {
      black: 	'40',
      red: 		'41',
      green: 	'42',
      yellow: 	'43',
      blue: 	'44',
      magenta: 	'45',
      cyan: 	'46',
      white: 	'47'
    },
    borders: {
    	tl: '╔',
    	t: '═',
    	tr: '╗',
    	r: '║',
    	br: '╝',
    	b: '═',
    	bl: '╚',
    	l: '║'
    }
  };
  var dice = [
  '             o             ', 
  '  o                     o  ',
  '       o     o     o       ',
  ' o     o           o     o ',
  ' o     o     o     o     o ',
  ' o     o  o     o  o     o '];



  var foreground = {};
  var background = {};
  var status = {};


  return {
    clear: function(b) {
      process.stdout.write('\033c');
      if(b !== undefined) process.stdout.write('\033[' + colors.background[b] + 'm');
      var str = Array(process.stdout.columns * process.stdout.rows).join(" ");
      console.log(str);
      process.stdout.write('\033[1;1H');

    },
    foreground: function(c) {
    	process.stdout.write('\033[' + colors.foreground[c] + ' m');
    },
    background: function(c) {
    	process.stdout.write('\033[' + colors.background[c] + ' m');
    },
    print: function(str) {
    	process.stdout.write(str);
    },
    window: function(x, y, w, h) {
    	process.stdout.write('\033[' + y + ';' + x + 'H');
    	process.stdout.write(colors.borders.tl);
    	process.stdout.write(Array(w-1).join(colors.borders.t));
    	process.stdout.write(colors.borders.tr);
    	for(var i=1; i<h-1; i++) {
    		process.stdout.write('\033[' + (y + i) + ';' + x + 'H');
    		this.print(colors.borders.l);
    		this.print(Array(w-1).join(" "));
    		this.print(colors.borders.r);
    	}
    	process.stdout.write('\033[' + (y + h-1) + ';' + x + 'H');
    	process.stdout.write(colors.borders.bl);
    	process.stdout.write(Array(w-1).join(colors.borders.b));
    	process.stdout.write(colors.borders.br);
    },
    dice: function(x, y, value) {
    	this.foreground('red');
    	this.window(x, y, 11, 5);
    	this.foreground('white');

    	for(var i=0; i<3;i++) {
    		process.stdout.write('\033[' + (y + i + 1) + ';' + (x + 1) + 'H');
    		for(var j=0; j<9; j++) {
    			process.stdout.write(dice[value][j+i*9]);
    		}
    	}
    }
  }
}


var cwin = consoleWindows();

cwin.clear();
cwin.foreground('red');
cwin.background('white');
cwin.clear('cyan');
//cwin.background.blue();
cwin.print('adios');

cwin.window(1,1, process.stdout.columns, process.stdout.rows);
//cwin.window(3, 3, 10, 5);
//cwin.window(10, 10, 20, 5);

cwin.foreground('white');
cwin.background('red');
cwin.dice(5, 2, parseInt(Math.random() * 6));
cwin.dice(17, 2, parseInt(Math.random() * 6));
cwin.dice(29, 2, parseInt(Math.random() * 6)); 

process.stdin.on('readable', function() {
	var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('data: ' + chunk);
  }
});
