var myObject = {value: 100};

myObject.getValue = function() {
    console.log(this.value);
    console.log(this);
    return this.value;
};

console.log(myObject.value);
console.log(myObject.getValue());
