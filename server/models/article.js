const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name:{
        type: String
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    body : {
      type : String,
    },
    comments : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Comment'
    }]
},{
    timestamps: true
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;