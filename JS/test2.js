
console.log('1');

function InOrderPrint(callback){
    setTimeout(function(){
        console.log('2');
        callback();
    },1000);
}

InOrderPrint(function(){
    console.log('3');
})