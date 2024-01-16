const check = () => {
    console.log('check!')
}

var count = 0;
const cD = document.getElementById("count")
const p1 = () => {
    console.log(count + "plus2: ");
    count = count + 1
    console.log(count);
    cD.innerHTML = count
}
const h2 = () => {
    console.log(count + "hoch2: ");
    count = count * count
    console.log(count);
    cD.innerHTML = count
}
const m2 = () => {
    console.log(count + "hoch2: ");
    count = count * 2
    console.log(count);
    cD.innerHTML = count
}