const mongoose = require("mongoose");
const config = require("../config/application");

const Schema = mongoose.Schema;

const RevisionSchema = new Schema({
  revid: {
    type: int32,
    unique: true, 
    required: true,
  },
  parentid: {
    type: int32,
    required: true,
  },
  minor: {
    type: boolean,
  },
  user: {
    type: String,
    trim: true       
  },
  anon: {
    type: String,
    trim: true
  },
  userid: {
    type: int32,
  },
  timestamp: {
    type: String,
    trim: true
  },
  size: {
    type: int32,
    trim: true
  },
  sha1: {
    type: String,
    trim: true
  },
  parsedcomment: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
});

module.exports = mongoose.model("Revision", RevisionSchema, "revisions");
