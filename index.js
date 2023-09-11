// 1. Напишите функцию deepEqual для проверки двух обьектов на идентичность.

function deepEqual(obj1, obj2) {
  // перевірка ідентичність об'єктів по посиланню
  if (obj1 === obj2) {
    return true;
  }
  // перевірка  об'єктів по типу (об'єкт)
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  // перевірка зачень ключів об'єктів

  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  if (keysObj1.length !== keysObj2.length) {
    return false;
  }
  for (const key of keysObj1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

console.log(
  "Результат функції 1 завдання:",
  deepEqual(
    { name: "test", age: 10, stat: 12 },
    { name: "test", age: 10, stat: 11 }
  )
);
// ----------------------------------------------------------------------------------------------------------

// 2.Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

function chunkArray(array, size) {
  let index = 0;
  return {
    next: function () {
      if (index >= array.length) {
        return { value: undefined, done: true };
      }
      //   створюємо новий масив, за допомогою мотода .slice(5) - вказуючи скільки елементів має бути в новому мачиві
      const newArrayChunk = array.slice(index, index + size);
      index += size;
      return { value: newArrayChunk, done: false };
    },
  };
}

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20], 5);
console.log(
  "Результат функції 2 завдання:",
  iterator.next(),
  iterator.next(),
  iterator.next(),
  iterator.next()
);

// ----------------------------------------------------------------------------------------------------------

// 3.Напишите функцию обертку, которая на вход принимает массив функций и их параметров,
// а возвращает массив результатов их выполнения.Количество аргументов исполняемой функции ** не ограничено ** !

async function bulkRun(functions) {
  // створюється новий масив, де будуть зберігатися результат виконання функції
  const newArray = [];
  // запускається цикл "for...of" який проходить по всім аргументам "functions"
  // розпаковується пара "[funct, argument]", де "funct" - функції, "argument" - аргументи цих ф-цій
  // Виконується ф-ція "funct", з аргументами, які знаходяться в масиві "argument". результат виконання функції за домопогою "await",
  // щоб зачекати завершення асинхроного виконання ф-ції записуються в змінну "result" і додаються методом ".push" в масив "newArray"
  for (const [funct, argument] of functions) {
    const result = await funct(...argument);
    newArray.push(result);
  }
  return newArray;
}

const f1 = () => {
  return new Promise((resolve) => {
    resolve(1);
  });
};

const f2 = (a) => {
  return new Promise((resolve) => {
    resolve(a);
  });
};

const f3 = (a, b) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([a, b]), 1000);
  });
};
const f4 = () => {
  return new Promise((resolve) => {
    resolve(4);
  });
};

console.log(
  "Результат функції 3 завдання:",
  bulkRun([
    [f1, [1]],
    [f2, [2]],
    [f3, [3, 4]],
    [f4, [4]],
  ]).then(console.log)
);
// Output: [1, 2, [3, 4], 4]

// ----------------------------------------------------------------------------------------------------------

// 4. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию).

function arrayToObject(array) {
  const newObj = {};

  for (let index = 0; index < array.length; index++) {
    const key = array[index][0];
    const value = array[index][1];

    if (Array.isArray(value)) {
      // проводиться рекурсія
      newObj[key] = arrayToObject(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

var arr = [
  ["name", "developer!"],
  ["age", 25],
  [
    "skills",
    [
      ["html", 4],
      ["css", 5],
      ["red", 4],
      ["vue", 3],
    ],
  ],
];

arrayToObject(arr);

console.log("Результат функції 4 завдання:", arrayToObject(arr));

// --------------------------------------------------------------------------------------------------------------

//  5. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив.

function objectToArray(object) {
  const newArray = [];

  for (const key in object) {
    if (typeof object[key] === "object") {
      // проводиться рекурсія
      newArray.push([key, objectToArray(object[key])]);
    } else {
      newArray.push([key, object[key]]);
    }
  }
  return newArray;
}

const object = {
  name: "developer!",
  age: 25,
  location: "Kyiv",
  skills: { css: 5, html: 4, red: 4, vue: 3 },
};

console.log("Результат функції 5 завдання:", objectToArray(object));

// ---------------------------------------------------------------------------------------------------------------------

//  6. Есть функция `primitiveMultiply`, которая умножает числа, но случайным образом может выбрасывать исключения типа:
// `NotificationException`, `ErrorException`.
// Задача написать функцию обертку которая будет повторять вычисление при исключении`NotificationException`,
// но прекращать работу при исключениях`ErrorException`

function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a, b) {
  const rand = Math.random();
  if (rand < 0.5) {
    return a * b;
  } else if (rand > 0.85) {
    throw new ErrorException();
  } else {
    throw new NotificationException();
  }
}

function reliableMultiply(a, b) {
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      //оператор instanceof перевіряє чи належить об'єкт до належного класу
      if (error instanceof NotificationException) {
        console.log("Продовжуємо далі виконувати обчислення");
      } else if (error instanceof ErrorException) {
        console.error("отримана помилка, завершуємо обчислення:", error);
        throw error;
      }
    }
  }
}

console.log("Результат функції 6 завдання:", reliableMultiply(10, 8));

// ---------------------------------------------------------------------------------------------------------------------
// 7. Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту
// с разными уровнями, разделенными косой чертой(`'/'`).

function mapObject(object, prefix = "") {
  // отримуємо всі ключі об'єкта  "object", метод ".reduce" застосовується для ітерації всіх ключів  "object".
  // Під час ітерації функції створюється новий об'єкт "acc", який буде відображати значення.
  return Object.keys(object).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}/${key}` : key;
    //   Відбувається перевіркад для: кожного ключа, функція перевіряє, чи є значення об'єкта під цим ключем самим об'єктом ("object") та
    //  чи не є значення, збережене властивістю "key" об'єкта "object", масивом
    if (typeof object[key] === "object" && !Array.isArray(object[key])) {
      Object.assign(acc, mapObject(object[key], newKey));
    } else {
      acc[newKey] = object[key];
    }
    return acc;
  }, {});
}

const obj = {
  a: {
    b: {
      c: 12,
      d: "Hello World",
    },
    e: [1, 2, 3],
  },
};

// mapObject(obj);
// Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

console.log("Результат функції 7 завдання:", mapObject(obj));

// ---------------------------------------------------------------------------------------------------------------------

// 8. Напишите функцию `combos`, которая принимает положительное целое число `num` и возвращает массив массивов положительных целых чисел,
// где сумма каждого массива равна`num`. Массивы не должны повторяться.

function combos(num) {
  let newArray = [];

  // створюємо ф-цію яка приймає аргументами початковий масив; сума, яку ми намагаємося досягнути; та початкове число, починається генерація
  function generateCombosArray(currentCombo, remainingSum, numStart) {
    if (remainingSum === 0) {
      // перевірка на те щоб початкове число не дорівнювалося 0, тоді ми знайшли комбінацію чисел,
      //   сума яких = num і ми додаємо цю комбінацію в масив newArray(масив де зберігаються всі знайдені комбінації)

      newArray.push(currentCombo.slice());
      return;
    }
    //   ф-ція виконує цикл від  numStart до remainingSum.
    for (let i = numStart; i <= remainingSum; i++) {
      currentCombo.push(i);
      generateCombosArray(currentCombo, remainingSum - i, i);
      currentCombo.pop();
    }
  }
  //  рекурсія ф-ції generateCombosArray поки не буде знайдено всі можливі комбінації чисел, які дорівнюють "num".
  generateCombosArray([], num, 1);

  return newArray;
}

console.log("Результат функції 8 завдання:", combos(8));

// ---------------------------------------------------------------------------------------------------------------------

// 9. Напишите функцию `add`, которая бы работала следующим образом `add(1)(2)(7)...(n)`. Количество последовательных визовов неограничено.

function add(number) {
  // створюєтся ф-ція addSum для прийняття чисел і додавання їх до  числа number. Ф-ція addSum викликає сама себе, тим самим створюється
  // ланцюжок необмежених викликів.
  function addSum(x) {
    number += x;
    return addSum;
  }
  // Ф-ція addSum має властивість "valueOf", яка повертає поточне значення "number".
  // Ця ф-ція використовується коли ми намагаємось привести об'єкт до числа.
  addSum.valueOf = function () {
    return number;
  };
  return addSum;
}

console.log(
  "Результат функції 9 завдання:",
  Number(add(5)(2)(3)(10)(20)(10)(3)(100)(2))
);

// ---------------------------------------------------------------------------------------------------------------------
