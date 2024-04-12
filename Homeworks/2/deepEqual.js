const obj1 = {
    a: {
        b: 1,
    },
};
const obj2 = {
    a: {
        b: 2,
    },
};
const obj3 = {
    a: {
        b: 1,
    },
};
function deepEqual(actual, expected) {
    function getResult(r, m, p = "") {
        return { result: r, path: p, message: m };
    }
    if (actual === expected)
        return getResult(true, "Значения/ссылки равны");
    if (typeof (expected) == "object") {
        if (Array.isArray(actual) && Array.isArray(expected)) {
            if (actual.length != expected.length) {
                return getResult(false, "Длины массивов не равны");
            }
            for (let i = 0; i < expected.length; i++) {
                let deResult = deepEqual(actual[i], expected[i]);
                if (!deResult.result) {
                    return getResult(false, deResult.message, `[${i}]` + deResult.path);
                }
            }
            return getResult(true, "Массивы равны");
        }
        else {
            let propertyNames = Object.keys(expected);
            for (let propertyName of propertyNames) {
                if (actual.hasOwnProperty(propertyName)) {
                    let deResult = deepEqual(actual[propertyName], expected[propertyName]);
                    if (!deResult.result) {
                        return getResult(false, deResult.message, `.${propertyName}` + deResult.path);
                    }
                }
                else {
                    return getResult(false, "Нет свойства", `.${propertyName}`);
                }
            }
            return getResult(true, "Объекты равны");
        }
    }
    else {
        return getResult(false, "Значения/ссылки не равны");
    }
}
console.log(deepEqual(obj1, obj1));
console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, obj3));