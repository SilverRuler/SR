function add(x, callback) {
    let sum = x + x;
    console.log(sum);
    callback(sum);
}


    add(2, function (result) {
        console.log('finish!!');
    })
