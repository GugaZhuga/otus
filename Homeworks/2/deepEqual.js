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
    function _deepEqual(actual, expected, message, path) {
        function getResult(r, m, p = "") {
            return { result: r, path: path + p, message: message + m };
        }
        // Быстрое сравнение по ссылке или значению
        let result = actual === expected;
        if (result)
            return getResult(true, "Значения/ссылки равны");
        let actualTypeName = typeof (actual);
        let expectedTypeName = typeof (expected);
        // Быстрое сравнение по типу
        if (actualTypeName != expectedTypeName)
            return getResult(false, "Типы объектов не равны");
        switch (actualTypeName) {
            case "boolean":
            case "number":
            case "bigint":
            case "string":
                return getResult(result, "Значения не равны");
            case "null":
            case "undefined":
                return getResult(result, "Одно из значений не определено");
            case "function":
                result = actual.toString() == expected.toString();
                return getResult(result, result ? "Функции равны" : "Функции не равны");
            case "object":
                if (Array.isArray(actual) && Array.isArray(expected)) {
                    if (actual.length != expected.length)
                        return getResult(false, "Длины массивов не равны");
                    for (let i = 0; i < actual.length; i++) {
                        let deResult = _deepEqual(actual[i], expected[i], message, path);
                        if (!deResult.result)
                            return getResult(false, deResult.message, deResult.path + `[${i}]`);
                    }
                    return getResult(true, "Массивы равны");
                }
                else {
                    let actualPropertyNames = Object.keys(actual);
                    let expectedPropertyNames = Object.keys(actual);
                    if (actualPropertyNames.length != expectedPropertyNames.length)
                        return getResult(false, "Количество свойств не совпадает");
                    for (let propertyName of expectedPropertyNames) {
                        let deResult = _deepEqual(actual[propertyName], expected[propertyName], message, path);
                        if (!deResult.result)
                            return getResult(false, deResult.message, deResult.path + `.${propertyName}`);
                    }
                    return getResult(true, "Объекты равны");
                }
            default:
                throw new Error(`Тип \"${actualTypeName}\" не поддерживается для сравнения`);
        }
    }
    return _deepEqual(actual, expected, "", "");
}
console.log(deepEqual(obj1, obj1));
console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, obj3));