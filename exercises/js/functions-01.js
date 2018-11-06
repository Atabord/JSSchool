myArray = [1, 7, 0, 34, 23, 5, 2, 102, 101, 150, 1200, 130];
function reverseArray(array) {
    let lastItem;
    for (let i = 0; i < (array.length/2); i++) {
        lastItem = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = lastItem;
    }
    return array;
}
console.log(reverseArray(myArray));