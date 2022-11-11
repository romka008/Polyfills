const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 100);
});

Promise.any([p1, p2, p3])
    .then(res => console.log(res)) //  3
    .catch(err => console.error(err));

promiseMyAny([p1, p2, p3])
    .then(res => console.log(res))  //   3
    .catch(err => console.error(err));

function promiseMyAny(promises) {
    return new Promise((res, rej) => {
        let count = 0;
        const errors = [];
        for (let i = 0; i < promises.length; i++) {
            const el = promises[i];
            Promise.resolve(el)
                .then(data => {
                    res(data);
                })
                .catch(err => {
                    count++;
                    errors[i] = err
                    if (count === promises.length) {
                        rej(new AggregateError(errors, "All promises were rejected"));
                    }
                });
        }
    });
}

const p4 = Promise.reject(3);
const p5 = Promise.reject(1337);
const p6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("foo");
    }, 100);
});
promiseMyAny([p4, p5, p6])
    .then(res => console.log(res))
    .catch(err => console.error(err));  //   All promises were rejected
