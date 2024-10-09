Array.prototype.myMap = function (callback, thisArgs) {
    if (this == null || this === window) throw new Error("Array.prototype.myMap called on null or undefined");

    if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);
    const mappedArray = [];
    for (let i = 0; i < this.length; i++) {
        let mappedValue = callback.call(thisArgs, this[i], i, this);
        mappedArray[i] = mappedValue;
    }
    return mappedArray;
};

let arr = [1, 2, 15];
let newArray = arr.map(el => el * 2);
console.log(newArray);

let newArr = arr.myMap(el => el * 2);
console.log(newArr);
