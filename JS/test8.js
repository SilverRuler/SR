function add(x) {
    return new Promise((resolve, reject) => {
        let sum = x + x;
        console.log(sum);
        resolve(sum);
    })
}

add(2).then(result => {
    return add(result);
}).then(result => {
    return add(result);
}).then(result => {
    console.log('finish!!');
})