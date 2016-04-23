var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Simple Schemas:
 *  - Simple Region
 *  - Simple Budget
 *  - Simple Category
 *  - Simple Department
 *  - Simple Program
 *
 * Lightweight duplicate items of Actual Schemas.
 * Contains only the 'essential' data.
 * May not always guarantee consistence, 
 * thus to be used as immediate referential purposes only.
 * Must have a direct ObjectId reference ('ref' fields)
 * that points to an Actual Schema item.
 */
var SimpleRegionSchema = new Schema();
SimpleRegionSchema.add({
  name_kr: String,
  name_en: String,
  ref: Schema.Types.ObjectId
});

var SimpleBudgetSchema = new Schema();
SimpleBudgetSchema.add({
  year: Number,
  ref: Schema.Types.ObjectId
});

var SimpleCategorySchema = new Schema();
SimpleCategorySchema.add({
  name: String,
  value: Number,
  ref: Schema.Types.ObjectId
});

var SimpleDepartmentSchema = new Schema();
SimpleDepartmentSchema.add({
  name: String,
  value: Number,
  ref: Schema.Types.ObjectId
});

var SimpleProgramSchema = new Schema();
SimpleProgramSchema.add({
  name: String,
  value: Number,
  ref: Schema.Types.ObjectId
});


/* Complete Schemas:
 *  - Region
 *  - Budget
 *  - Category
 *  - Department
 *  - Program
 *
 *  Formal dataset that holds a complete version of information.
 */
var RegionSchema = new Schema();
RegionSchema.add({
  name_kr: String,
  name_en: String,
  currency: String,
  budgets: [SimpleBudgetSchema]
});

var BudgetSchema = new Schema();
BudgetSchema.add({
  year: Number,
  value: Number,
  region: SimpleRegionSchema,
  categories: [SimpleCategorySchema],
  departments: [SimpleDepartmentSchema]
});

var CategorySchema = new Schema();
CategorySchema.add({
  name: String,
  value: Number,
  region: SimpleRegionSchema,
  superiors: [SimpleCategorySchema],
  subordiantes: [SimpleCategorySchema],
  programs: [SimpleProgramSchema]
});

var DepartmentSchema = new Schema();
DepartmentSchema.add({
  name: String,
  value: Number,
  region: SimpleRegionSchema, 
  superiors: [SimpleDepartmentSchema],
  subordiantes: [SimpleDepartmentSchema],
  programs: [SimpleProgramSchema]
});

var ProgramSchema = new Schema();
ProgramSchema.add({
  name: String,
  value: Number,
  region: SimpleRegionSchema,
  budget: SimpleBudgetSchema,
  categories: [SimpleCategorySchema],
  departments: [SimpleDepartmentSchema]
});

/* Mongoose schema registration */
var Region = mongoose.model('region', RegionSchema);
var Budget = mongoose.model('budget', BudgetSchema);
var Category = mongoose.model('category', CategorySchema);
var Department = mongoose.model('department', DepartmentSchema);
var Program = mongoose.model('program', ProgramSchema);

module.exports = {
  Program: Program,
  Category: Category,
  Region: Region,
  Budget: Budget
}
