const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 100);
});

Promise.all([p1, p2, p3]).then(values => {
    console.log(values); // [3, 1337, "foo"]
});

myPromiseAll([p1, p2, p3]).then(values => {
    console.log(values); // [3, 1337, "foo"]
});

function promiseAll(promises) {
    let result = [];
    let count = 0;

    return new Promise((res, rej) => {
        for (let i = 0; i < promises.length; i++) {
            const el = promises[i];
            Promise.resolve(promises[i])
                .then(res => {
                    count++;
                    result[i] = res;
                    if (count === promises.length) res(result);
                })
                .catch(err => rej(err));
        }
    });
}

// ниже вссё тоже самое, только с forEach
function myPromiseAll(taskList) {
    //to store results
    const results = [];

    //to track how many promises have completed
    let promisesCompleted = 0;

    // return new promise
    return new Promise((resolve, reject) => {
        taskList.forEach((promise, index) => {
            //if promise passes
            Promise.resolve(promise)
                .then(val => {
                    //store its outcome and increment the count
                    results[index] = val;
                    promisesCompleted += 1;

                    //if all the promises are completed,
                    //resolve and return the result
                    if (promisesCompleted === taskList.length) {
                        resolve(results);
                    }
                })
                //если какой-либо промис не выполняется, ошибка.
                .catch(error => {
                    reject(error);
                });
        });
    });
}
