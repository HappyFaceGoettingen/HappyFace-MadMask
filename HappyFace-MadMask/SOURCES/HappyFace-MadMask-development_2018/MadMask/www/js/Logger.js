var LoggerLevel = {
	ALL : -99,
	DEBUG : -1,
	INFO : 0,
	WARN : 1,
	ERROR : 2,
	OFF : 99
};


var Logger = function(level) {
	var self = this;
	self.level = isNaN(level) ? LoggerLevel.INFO : level;
};


Logger.prototype.__print = function(level, message) {

		if (level == null) level = LoggerLevel.OFF;

		if (this.level <= level) {
		    if (navigator.platform == "Linux x86_64"){
				switch (level) {
					case LoggerLevel.INFO :
						console.info(message);
						break;
					case LoggerLevel.WARN :
						console.warn(message);
						break;
					case LoggerLevel.DEBUG :
						console.debug(message);
						break;
					case LoggerLevel.ERROR :
						console.error(message);
						break;
					default :
						console.log(message);
						break;
				};				
			}else{
				console.log(message);
			}
		} 
};


/*
 * methods
 */
Logger.prototype.info = function(message){
	this.__print(LoggerLevel.INFO, message);
};

Logger.prototype.debug = function(message){
	this.__print(LoggerLevel.DEBUG, message);
};

Logger.prototype.warn = function(message){
	this.__print(LoggerLevel.WARN, message);
};

Logger.prototype.error = function(message){
	this.__print(LoggerLevel.ERROR, message);
};


/*
 * Level
 */
Logger.prototype.setLevel = function(level) {
	this.level = level;
};

Logger.prototype.getLevel = function() {
	return this.level;
};


// Generating an instance of Logger
var logger = new Logger(LoggerLevel.INFO);

