function add(x, callback) {
    let sum = x + x;
    console.log(sum);
    callback(sum);
}

add(2, function (result) {

    add(result, function (re1) {
        console.log('finish!!');
    })

})