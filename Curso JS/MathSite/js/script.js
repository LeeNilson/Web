function Point(x,y){
    this.x = x;
    this.y = y;
}
var p = new Point(1,1);

Point.prototype.r = function(){
    return Math.sqrt (
        this.x * this.x +
        this.y * this.y
    );
};
console.log(p.r());

function factorial2 (n){
    var i, product = 1;
    for (i=2; i<=n; i++)
        product *= i;
    return product;
}
console.log(factorial2(10))