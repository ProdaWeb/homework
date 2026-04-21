// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

const person = {
    firstName: "Вася",
    lastName: "Пупкин",
    age: 25,
    profession: "Электрик" 
}

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

const emptyObject = {};

function isEmpty(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

console.log(isEmpty(person));
console.log(isEmpty(emptyObject));

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

const task = {
    title: "имя",
    description: "Описание",
    isCompleted: true
}

function cloneAndModify(object, modifications) {
    object  = { ...modifications };
    for (let key in object) {
        console.log(`${key}: ${object[key]}`);
    }
}
const newObject = {};
cloneAndModify(newObject, task);

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

function callAllMethods(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key) && typeof object[key] === 'function') {
            console.log(`Вызов метода ${key}: `);
            object[key].call(object);
        }
    }
}



// Пример использования:
const myObject = {
    method1() {
        console.log('Метод 1 вызван');
    },
    method2() {
        console.log('Метод 2 вызван');
    },
    property: 'Это не метод'
};
callAllMethods(myObject);
