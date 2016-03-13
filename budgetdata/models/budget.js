var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regionSchema = new Schema({
  name_kr: String,
  name_en: String,
  parent: mongoose.Schema.Types.ObjectId,
  children: [mongoose.Schema.Types.ObjectId]
});

var budgetSchema = new Schema({
  region: mongoose.Schema.Types.ObjectId,
  year: Number,
  programs: [mongoose.Schema.Types.ObjectId],
  categorieS: [mongoose.Schema.Types.ObjectId],
  currency: String
});

var categorySchema = new Schema({
  name: String,
  parent: mongoose.Schema.Types.ObjectId,
  children: [mongoose.Schema.Types.ObjectId],
  programs: [mongoose.Schema.Types.ObjectId]
});

var departmentSchema = new Schema({
  name: String,
  parent: mongoose.Schema.Types.ObjectId,
  budget: mongoose.Schema.Types.ObjectId
});

var programSchema = new Schema({
  name: String,
  budget: mongoose.Schema.Types.ObjectId,
  category: mongoose.Schema.Types.ObjectId,
  department: mongoose.Schema.Types.ObjectId,
  value: Number
});

var Region = mongoose.model('Region', regionSchema);
var Budget = mongoose.model('Budget', budgetSchema);
var Category = mongoose.model('Category', categorySchema);
var Department = mongoose.model('Department', departmentSchema);
var Program = mongoose.model('Program', programSchema);

module.exports = {
  Region: Region,
  Budget: Budget,
  Category: Category,
  Department: Department,
  Program: Program
}
