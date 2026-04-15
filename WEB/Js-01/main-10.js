// Задача 1.
// Создайте переменные с корректными именами, чтобы сохранить следующую информацию:
// 1. firstName – имя (строка)
// 2. lastName – фамилия (строка)
// 3. isStudent – является ли учеником курса (булево значение)

let firstName = 'Вася';
let LastName = 'Пупкин';
let isStudent = true;

if (isStudent) {
    isStudent = 'Правда';
} else {
    isStudent = 'Ложь';
}

// Задача 2.
// 1. Объявите переменную age с числовым значением возраста студента.
// 2. Объявите переменную currentYear и присвойте ей значение текущего года (например, 2025).
// 3. Используя age и currentYear вычислите год рождения студента, запишите результат в переменную birthYear.

let age = 25;
let currentYear = 2026;
let birthYear = currentYear - age;

console.log("Год рождения: " + birthYear);

// Задача 3.
// Выведите в консоли сообщение в таком формате:
// Меня зовут [firstName] [lastName], мне [age] лет. Я ученик/ученица курса: [isStudent].

console.log("Меня зовут " + firstName + " " + LastName + ", мне " + age + " лет. Я ученик/ученица курса: " + isStudent)

// Задача 4.
// Какое значение будет у переменной result?
// let a = '123';
// let b = +'456';
// let c = Number('789');
// let d = Boolean(0);
// let e = Boolean(' ');
// let result = a + b + c + d + e;

//123456789falsetrue