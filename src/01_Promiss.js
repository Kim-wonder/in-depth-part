


// 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용.
// 일반적으로 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 API를 사용.


$.get('url 주소/products/1', function(response) {
    // ...
  });

// 위 API가 실행되면 서버에다가 ‘데이터 하나 보내주세요’ 라는 요청을 보냄.
// ⭐️ 그런데 여기서 데이터를 받아오기도 전에 마치 데이터를 다 받아온 것 마냥
// 화면에 데이터를 표시하려고 하면 오류가 발생하거나 빈 화면이 뜹니다.
// 이와 같은 문제점을 해결하기 위한 방법 중 하나가 프로미스입니다.



// Promise 기초코드
function getData(callbackFunc) {
    $.get('url 주소/products/1', function(response) {
      callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
    });
  }
  
  getData(function(tableData) {
    console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
  });
  

  // 위 코드는 제이쿼리의 ajax 통신 API를 이용하여 지정된 url에서 1번 상품 데이터를 받아오는 코드입니다. 
  // 비동기 처리를 위해 프로미스 대신에 콜백 함수를 사용했습니다.

// 위 코드에 프로미스를 적용하면 아래와 같은 코드가 됩니다.

function getData(callback) {
    // new Promise() 추가
    return new Promise(function(resolve, reject) {
      $.get('url 주소/products/1', function(response) {
        // 데이터를 받으면 resolve() 호출
        resolve(response);
      });
    });
  }
  
  // getData()의 실행이 끝나면 호출되는 then()
  getData().then(function(tableData) {
    // resolve()의 결과 값이 여기로 전달됨
    console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
  });

// 콜백 함수로 처리하던 구조에서 
// new Promise(), resolve(), then()와 같은 프로미스 API를 사용한 구조로 바뀌었습니다.




// 여기서 resolve(), then()은 무엇인가?

// 프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)입니다. 
// 여기서 말하는 상태란 프로미스의 처리 과정을 의미합니다. 
//new Promise()로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖습니다.



// Pending(대기)

new Promise(function(resolve, reject) {
    // ...
  });
// new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 
// 콜백 함수의 인자는 resolve, reject입니다.



// Fulfilled(이행)

function getData() {
    return new Promise(function(resolve, reject) {
      var data = 100;
      resolve(data);
    });
  }
  
  // resolve()의 결과 값 data를 resolvedData로 받음
  getData().then(function(resolvedData) {
    console.log(resolvedData); // 100
  });
// 이행 상태가 되면 아래와 같이 then()을 이용하여 처리 결과 값을 받을 수 있습니다.



// Rejected(실패)

function getData() {
    return new Promise(function(resolve, reject) {
      reject(new Error("Request is failed"));
    });
  }
  
  // reject()의 결과 값 Error를 err에 받음
  getData().then().catch(function(err) {
    console.log(err); // Error: Request is failed
  });
// 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 catch()로 받을 수 있습니다.





// Promise 쉬운예제

function getData() {
    return new Promise(function(resolve, reject) {
      $.get('url 주소/products/1', function(response) {
        if (response) {
          resolve(response);
        }
        reject(new Error("Request is failed"));
      });
    });
  }
  
  // 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
  getData().then(function(data) {
    console.log(data); // response 값 출력
  }).catch(function(err) {
    console.error(err); // Error 출력
  });
  
// 서버에서 제대로 응답을 받아오면 resolve() 메서드를 호출하고, 
// 응답이 없으면 reject() 메서드를 호출하는 예제입니다. 
// 호출된 메서드에 따라 then()이나 catch()로 분기하여 응답 결과 또는 오류를 출력합니다.





// 여러 개의 프로미스 연결하기 (Promise Chaining)
function getData() {
    return new Promise({
      // ...
    });
  }
  
  // then() 으로 여러 개의 프로미스를 연결한 형식
  getData()
    .then(function(data) {
      // ...
    })
    .then(function() {
      // ...
    })
    .then(function() {
      // ...
    });
// 앞 예제에서 then() 메서드를 호출하고 나면 새로운 프로미스 객체가 반환됩니다.
// 따라서, 위와 같이 코딩이 가능합니다.




// 비동기 처리 예제에서 가장 흔하게 사용되는 setTimeout() API를 사용한 예제.
new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(1);
    }, 2000);
  })
  .then(function(result) {
    console.log(result); // 1 
    return result + 10; // 1 에 10을 더한 걸 리턴
  })
  .then(function(result) {
    console.log(result); // 11 << 1+10
    return result + 20; // 11 에 20을 더한 걸 리턴
  })
  .then(function(result) {
    console.log(result); // 31 << 11+20
  });

// 위 코드는 프로미스 객체를 하나 생성하고 
// setTimeout()을 이용해 2초 후에 resolve()를 호출하는 예제입니다.

// resolve()가 호출되면 프로미스가 대기 상태에서 이행 상태로 넘어가기 때문에 
// 첫 번째 .then()의 로직으로 넘어갑니다. 
// 첫 번째 .then()에서는 이행된 결과 값 1을 받아서 10을 더한 후 
// 그다음 .then() 으로 넘겨줍니다. 
// 두 번째 .then()에서도 마찬가지로 바로 이전 프로미스의 결과 값 11을 받아서 20을 더하고 
// 다음 .then()으로 넘겨줍니다. 
// 마지막 .then()에서 최종 결과 값 31을 출력합니다.



// 실무에서 프로미스 연결사례

// 실제 웹 서비스에서 있을 법한 사용자 로그인 인증 로직에 프로미스를 여러 개 연결해보겠습니다.
getData(userInfo)
  .then(parseValue)
  .then(auth)
  .then(diaplay);

// 위 코드는 페이지에 입력된 사용자 정보를 받아와 파싱, 인증 등의 작업을 거치는 코드를 나타내었습니다.
// 여기서 userInfo는 사용자 정보가 담긴 객체를 의미하고,
// parseValue, auth, display는 각각 프로미스를 반환해주는 함수라고 가정했습니다.

var userInfo = {
    id: 'test@abc.com',
    pw: '****'
  };
  
  function parseValue() {
    return new Promise({
      // ...
    });
  }
  function auth() {
    return new Promise({
      // ...
    });
  }
  function display() {
    return new Promise({
      // ...
    });
  }
  



// 프로미스의 에러 처리 방법

// 에러 처리 방법에는 다음과 같이 2가지 방법이 있습니다.
// 1.then()의 두 번째 인자로 에러를 처리하는 방법

getData().then(
    handleSuccess,
    handleError
  );
  

// 2.catch()를 이용하는 방법

getData().then().catch();

// 2가지 방법 모두 프로미스의 reject() 메서드가 호출되어 실패 상태가 된 경우에 실행됩니다.
// 간단하게 말해서 프로미스의 로직이 정상적으로 돌아가지 않는 경우 호출되는 거죠. 

function getData() {
    return new Promise(function(resolve, reject) {
      reject('failed');
    });
  }
  
  // 1. then()의 두 번째 인자로 에러를 처리하는 코드
  getData().then(function() {
    // ...
  }, function(err) {
    console.log(err);
  });
  
  // 2. catch()로 에러를 처리하는 코드
  getData().then().catch(function(err) {
    console.log(err);
  });

  

// 에러 처리는 가급적 catch()를 사용

// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
    return new Promise(function(resolve, reject) {
      resolve('hi');
    });
  }
  
  getData().then(function(result) {
    console.log(result);
    throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
  }, function(err) {
    console.log('then error : ', err);
  });
  
// getData() 함수의 프로미스에서 resolve() 메서드를 호출하여 정상적으로 로직을 처리했지만,
// then()의 첫 번째 콜백 함수 내부에서 오류가 나는 경우 오류를 제대로 잡아내지 못합니다. 
// Uncaught (in promise) Error: Error in then()

// 하지만 똑같은 오류를 catch()로 처리하면 다른 결과가 나옵니다.

// catch()로 오류를 감지하는 코드
function getData() {
    return new Promise(function(resolve, reject) {
      resolve('hi');
    });
  }
  
  getData().then(function(result) {
    console.log(result); // hi
    throw new Error("Error in then()");
  }).catch(function(err) {
    console.log('then error : ', err); // then error :  Error: Error in then()
  });
  
// then error :  Error: Error in then()
















