let array = [1, 2, 3, 4, 8, 7, 9, 31, -1, 5, -10];

console.log(array.filter(el => el > 3)); // [4, 8, 7, 9, 31, 5]

Array.prototype.filter2 = function (callback, thisArgs) {
    if (this == null || this === window) throw TypeError("Array.prototype.filter2 called on null or undefined");

    if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);

    let context = this;
    let obj = Object(this);

    let result = [];

    for (let i = 0; i < obj.length; i++) {
        if (i in obj) {
            if (callback.call(context, this[i], i, obj)) {
                result.push(this[i]);
            }
        }
    }
    return result;
};

console.log(array.filter2(el => el > 3)); // [4, 8, 7, 9, 31, 5]
