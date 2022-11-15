Promise.race([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000))
])
    .then(data => console.log(data)) // 1
    .catch(e => console.error(e));

function promiseRace(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            // Promise.resolve(el)
            //     .then(data => resolve(data))
            //     .catch(e => reject(e));
            Promise.resolve( // в методе race используется синтаксис, который ниже, так как он работает быстрее
                el.then(
                    data => resolve(data),
                    e => reject(e)
                )
            );
        }
    });
}

promiseRace([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка1!")), 1000))
]).then(
    data => console.log(data),
    e => console.error(e)
);
// ]).then(console.log, console.error);
