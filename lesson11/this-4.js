var myObject = {value: 100};

var foo = function() {
    console.log(this);
};

foo();
foo.apply(myObject);
foo.call(myObject);

//var newFoo = foo.bind(myObject);
//newFoo();

foo.bind(myObject)();
