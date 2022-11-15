// forEach полифил
["Bilbo", "Gandalf", "Nazgul"].forEach(console.log);

// простой вариант полифила
Array.prototype.myForEach = function (callback, thisArgs) {
    if (this == null || this === window) {
        throw TypeError("Array.prototype.myForEach called on null or undefined");
    }

    if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);
    for (let i = 0; i < this.length; i++) {
        callback.call(thisArgs, this[i], i, this);
    }
};

// поинтересней (правильно обрабатывает пустые элементы массива)
Array.prototype.myForEach = function (callback, thisArgs) {
    if (this == null || this === window) throw TypeError("Array.prototype.myForEach called on null or undefined");

    if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);

    let context = this;
    let obj = Object(this);

    if (arguments.length > 1) context = thisArgs;

    let i = 0;

    while (i < obj.length) {
        if (i in obj) callback.call(context, this[i], i, obj);
        i++;
    }
};

["Bilbo", , "Nazgul"].myForEach(e => console.log(e));
["Bilbo", , "Nazgul"].forEach(e => console.log(e));
