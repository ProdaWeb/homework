// Задание 1.
// Дан массив пользователей:
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
]
// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }

users.push({ name: 'Ann', age: 19, isAdmin: false });
users.push({ name: 'Jack', age: 43, isAdmin: true });

console.log(users);

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

users.length

function getUserAverageAge(users) {
    let sum = 0;
    users.forEach(function (arr) {
        sum += arr.age;
    });
    return sum / users.length;
}

console.log(`Средний возраст пользователей: ${getUserAverageAge(users)} лет.`);

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

function getAllAdmins(users) {
    const adminUsers = [];
    for (let i = 0; i < users.length; i++){
        if (users[i].isAdmin) {
            adminUsers.push(users[i]);
        }
    }
    return adminUsers;
}

console.log(getAllAdmins(users));

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

function first(arr, n) {
    if (n == 0) {
        return [];
    } else if(n == undefined){
        return arr[0];
    } else if (n > arr.length) {
        return console.error(`Массив содержит всего ${arr.length} элементов`);
    } else {
        const firstArr = [n];
        for (let i = 0; i < n; i++){
            firstArr[i] = arr[i];
        }
        return firstArr;
    }
    
}

console.log(first(users, 3));