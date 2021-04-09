function returnName(callback) {
  callback("jason");
  console.log("만나서 반갑습니다");
}

function sayHello(name){
  console.log("안녕하세요 "+name+"씨");
}

returnName(sayHello)