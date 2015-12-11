var myObject = {value: 100};

myObject.getValue = function() {
    var foo = function() {
        console.log(this.value);
        console.log(this);
    };

    foo();
    return this.value;
};

console.log(myObject.getValue());
