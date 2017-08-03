var mongoose = require('../config/mongoose');
var models = {};
//用户
var userSchema = mongoose.Schema({
	tel: String,
	password: String,
	nickname: {
		type: String,
		default: ''
	},
	sex: {
		type: String,
		default: '男'
	},
	autograph: {
		type: String,
		default: ''
	},
	imgs:Object,
	friendslist:Array,
	dailist:Array,
	waitlist:Array,
});
models.User = mongoose.model("User", userSchema);
module.exports = models;