var $q = require('q');

//serie de funciones que multiplica acc por 2 en "serie"
//asume valor como function
function paso1(acc,valor){
    valor(acc);
}

function paso2(acc1,valor){
    valor(acc1*2);
}

function paso3(acc2,valor){
    valor(acc2*2);
}

function paso4(acc3,valor){
    valor(acc3*2);
}

//Anti Patron piramide de la muerte
//definicion del proceso en serie
console.log("Pyramid of Doom");
paso1(2,function (valor1) {
    paso2(valor1, function(valor2) {
        paso3(valor2, function(valor3) {
            paso4(valor3, function(valor4) {
                // Do something with value4
                console.log(valor4); //16
            });
        });
    });
});

function qpaso1(acc){
    var res = $q.defer();
    
    if(typeof acc != "number")
        res.reject("No es un numero");
    
    setTimeout(function(){
        res.resolve(acc);
    },100);
    
    return res.promise;
}

function qpaso2(acc1){
    var res = $q.defer();
    
    setTimeout(function(){
        res.resolve(acc1*2);
    },200);
    
    return res.promise;
}

function qpaso3(acc2){
    var res = $q.defer();
    
    setTimeout(function(){
        res.resolve(acc2*2);
    },300);
    
    return res.promise;
}

function qpaso4(acc3){
    var res = $q.defer();
    
    setTimeout(function(){
        res.resolve(acc3*2);
    },400);
    
    return res.promise;
}

//llamada en serie
//q hace uso del valor resuelto por la promesa para llamar a la proxima funcion
$q.fcall(qpaso1,2)
.then(qpaso2)
.then(qpaso3)
.then(qpaso4)
.then(function (value4) {
    // Do something with value4
    console.log("Serie Q (fcall): "+ value4);
})
.catch(function (error) {
    // Handle any error from all above steps
})
.done();

//Promises have a then method, which you can use to get the eventual
//return value (fulfillment) or thrown exception (rejection).

qpaso1("x")
.then(function (value) {
    console.log("Valor Resuelto para qpaso1: "+value.toString());
}, function (reason) {
    console.log("Error para qpaso1: "+reason)
});

