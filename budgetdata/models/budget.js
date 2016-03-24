var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramSchema = new Schema();
ProgramSchema.add({
  name: String,
  value: Number
});

var CategorySchema = new Schema();
CategorySchema.add({
  name: String,
  children: [CategorySchema],
  programs: [ProgramSchema]
});

var BudgetSchema = new Schema({
  year: Number,
  currency: String,
  categories: [CategorySchema]
});

var RegionSchema = new Schema({
  name_kr: String,
  name_en: String,
  budgets: [BudgetSchema]
});

var Program = mongoose.model('program', ProgramSchema);
var Category = mongoose.model('category', CategorySchema);
var Budget = mongoose.model('budget', BudgetSchema);
var Region = mongoose.model('region', RegionSchema);

module.exports = {
  Program: Program,
  Category: Category,
  Region: Region,
  Budget: Budget
}
