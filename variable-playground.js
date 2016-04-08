// var person = {
//   name: 'andrew',
//   age: 21
// };
//
// function updatePerson(obj){
//   obj = {
//     name: 'andrew',
//     age: 24
//   }
// }
//
// function updatePersonDestructive(obj){
//     obj.age= 24
// }
//
// console.log(person);
// updatePerson(person);
// console.log(person);
// updatePersonDestructive(person);
// console.log(person);
// =================================================
// ARRAY
var grades = [1,2,3,4]
// add grade destructive
var addGrade = function (arr) {
  arr = [1,2,3,5];
}
// add grade
var addGradeDestructive = function (arr){
  arr.push(55);
}
//

addGrade(grades);
console.log(grades);
addGradeDestructive(grades);
console.log("destructive: " + grades);
