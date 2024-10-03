import React from 'react';

const Intro = () => {

    // Data Structure  =>  It is a way to store data efficiently inside of a computer component called Random Access Memory, means it is the mathematical or logical model of organization of data.

    // Types of DS => 
    // Arrays: An array is a collection of elements of the same type placed in contiguous memory locations.
    // Linked Lists: It is a linear data structure, in which the elements are not stored at contiguous memory locations and the elements are linked with each other.
    // Stacks: Follow LIFO (Last In First Out) principle. In this, the last element in the stack will be removed first.
    // Queues: It follows the FIFO principle (First In First Out), in this, the first element stored is removed first.
    // Hash Tables: This is a type of data structure that stores values which have keys related to each of them.
    // Trees: It is a data structure in which data is organized hierarchically and linked together. Some Examples are the Binary Search tree, Binary tree, Splay tree, AVL Tree, etc.
    // Heaps: It is a specialized tree-based data structure, also called binary heap in which the tree is a complete binary tree and the data is stored.
    // Graphs: It consists of a set of nodes and edges connecting each other.

    // Asymptotic Notation => To compare efficiencies of algorithms, we use asymptotic notation, a mathematical tool that estimates time based on input size without running the code.
    // It focuses on the number of basic operations in the program.
    // a. Big-O (Ο)	Describes the worst-case scenario, providing an upper time bound of algorithm.
    // b. Omega (Ω)	Describes the best-case scenario, offering a lower time bound of algorithm.
    // c. Theta (θ)	Represents the average complexity of an algorithm of algorithm.



    /////////// Understanding Big O Notation ////////////////
    /////////// Time Complexity ////////////////
    // Instead of measuring actual time required in executing each statement in the code, Time Complexity considers how many times each statement executes. 

    const bla = [2, 8, 4, 1, 8, 6, 3, 5];

    const bigo = (array) => {   // 4 operations
        for (let i = 0; i < array.length; i++) {
            if (i === 3) {
                return array[i];
            }
        }
    };
    const bigo2 = (array) => {   // 1 operation
        return array[3];
    }
    // console.time();
    // console.log(`Result: ${bigo(bla)}`); 
    // console.log(`Result: ${bigo2(bla)}`);
    // console.timeEnd();

    //Another example => input does not affect the number of operations => O(1) Constant Time Complexity
    const someOperation = (n) => {  // 3 operations (GOOD)
        return (n * (n + 5)) / 2;
    }
    // console.log(someOperation(3));

    //Another example => input will affect the number of operations => O(n) Linear Time Complexity
    const someOperation2 = (n) => {   // n + 1 operations (FAIR)
        for (let i = 0; i < n; i++) {
            console.log(i);
        }
        return "Done";
    }
    // console.log(someOperation2(6));

    //Another example => O(n^2) Quadratic Time Complexity 
    const printBoth = (n) => {  // n^2 + 1 operations (HORRIBLE)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                console.log(i, j);
            }
        }
        return 'done';
    };
    // console.log(printBoth(4));


    /////////// Space Complexity ////////////////
    // Space complexity measures the amount of memory an algorithm needs to complete as 
    // a function of the input size.

    //Example => input does not affect the output size => O(1) Constant
    const sumArray = (array) => {  // O(n) TC and O(1) Space Complexity
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }
    // console.log(sumArray(bla));

    //Another example => input will affect the output size => O(n) Linear
    const pushArray = (n) => {  // O(n) TC and O(n) Space Complexity
        const nums = [];  //the reference to the array is not changing, the array itself (the variable nums) remains the same in memory.
        for (let i = 0; i < n; i++) {
            nums.push(i * 50);
        }
        return nums;
    }
    // console.log(pushArray(5));

    //Another example => O(n^2) Quadratic Space Complexity 
    const printArray = (n) => { // O(n^2) TC and O(n^2) SC
        const matrix = [];
        for (let i = 0; i < n; i++) {
            matrix[i] = [];
            for (let j = 0; j < n; j++) {
                matrix[i][j] = i + j;
            }
        }
        return matrix;
    }
    // console.log(printArray(4));

    //Another problem => O(1) SC and O(n log n) TC
    // let i = 0, j = 0, k = 0;
    // let n = 6;
    // for (i = Math.floor(n / 2); i <= n; i++) {
    //     for (j = 2; j <= n; j = j * 2) {
    //         k = k + Math.floor(n / 2);
    //     }
    // }
    // console.log(k);



    /////////// Types of Arrays ////////////////
    // 1. Fixed Size Array
    // 2. Dynamic Sized Array
    // 3. 1-Dimensional Array
    // 4. Multi-Dimensional Array

    /////////// Questions on Arrays ////////////////
    //Q. Why array is a data structure?
    // Arrays store elements of the same type, they are classified as homogeneous data structures. 
    // They can store numbers, strings, characters, boolean values (true and false), objects, and so on.

    // Q. What data structure is an array?
    // An array is a linear data structure that stores similar elements in contiguous memory locations.

    // Q. How is data stored in an array?
    // An array is a collection of items of the same data type stored at contiguous memory locations or says
    //  the elements are stored one after another in memory. An array uses an index system starting at 0 and
    //   going to (n-1), where n is its size.

    // Q. Difference between array and structure?
    // The structure can contain variables of different types but an array only contains variables of the same type.

    // Q. What are the limitations of an array?
    // An array is a collection of items of the same data type.
    // That means, in an integer array only integer values can be stored,
    // while in a float array only floating values and character array can
    // have only characters. Thus, no array can have values of two data types.

    // Q. What are the advantages of an array?
    // Arrays allow random access to elements. This makes accessing elements by position faster.
    // Arrays store multiple data of similar types with the same name.
    // Array data structures are used to implement the other data structures like linked lists, stacks, queues, trees, graphs, etc.

    // Q. What is the purpose of using arrays?
    // An array is used when several variables of the same type need to be used, 
    // and it can be defined as a sequence of objects of the same type.  

    // Q. What is a multidimensional array?
    // A multi-dimensional array can be termed as an array of arrays that stores homogeneous data in tabular form.
    //  Data in Multidimensional Arrays are stored in row-major order. 










    /////////// Problems ////////////////
    //Problem 1 
    // Given an 0-indexed array of integers arr[] of size n, find its peak element and return it's 
    // index. An element is considered to be peak if it's value is greater than or equal to the values of its adjacent elements (if they exist).
    //Solution 1
    const findPeakElement = (arr, n) => {
        if (n === 1) return 0;
        if (arr[0] >= arr[1]) return arr[0];
        if (arr[n - 1] >= arr[n - 2]) return arr[n - 1];

        for (let i = 1; i < n - 1; i++) {
            if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) {
                return i;
            }
        }
        return -1;
    };
    // const num = 7;
    // const array = [1, 1, 1, 2, 111, 1, 1];
    // console.log('peak',  peakElement(array, num));
    // console.log('bla', findPeakElement(array, num));

    //Problem 2
    // Given an array arr. Your task is to find the minimum and maximum elements in the array.
    // Note: Return an array that contains two elements the first one will be a minimum element and the second will be a maximum of an array.
    //Solution 2
    const findMaxAndMinOp = (arr) => {
        let maxElement = arr[0];
        let minElement = arr[0];
        if (arr.length === 0) {
            return [undefined, undefined];
        }
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > maxElement) {
                maxElement = arr[i];
            }
            if (arr[i] < minElement) {
                minElement = arr[i];
            }
        }
        return [minElement, maxElement];
    };
    // let nums = [3,9,2,7,56,43,34,23];
    // console.log(findMaxAndMinOp(nums));

    const revString = (string) => {
        let reverse = '';
        for (let i = string.length - 1; i >= 0; i--) {
            reverse += string[i];
        }
        return reverse;
    }
    // let apple = 'apple';
    // console.log(`rev : ${revString(apple)}`);

    const customSortMethod = (arr) => {
        if (arr.length < 1) {
            return `Array is empty!`;
        } else if (arr.length === 1) {
            return arr;
        }
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    // const nums = [8,4,6,9,2];
    // console.log(customSortMethod(nums));

    function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        // Split the array into two halves
        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));

        // Merge the sorted halves
        return merge(left, right);
    }
    function merge(left, right) {
        let sortedArray = [];
        let i = 0;
        let j = 0;

        // Merge the two arrays while comparing their elements
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                sortedArray.push(left[i]);
                i++;
            } else {
                sortedArray.push(right[j]);
                j++;
            }
        }

        // If there are leftover elements in either left or right array
        return sortedArray.concat(left.slice(i)).concat(right.slice(j));
    }
    // const array = [38, 27, 43, 3, 9, 82, 10];
    // console.log(mergeSort(array));

    //Problem 3
    // Given an Array Arr of N positive integers and an integer X. Return the frequency of X in the array.
    const frequency = (N, Arr, X) => {
        let newArray = [];
        for (let i = 0; i < N; i++) {
            if (Arr[i] === X) {
                newArray.push(Arr[i]);
            }
        }
        return newArray.length;
    }
    // let arrLength = 7;
    // const nums = [8, 8, 2, 9, 4, 8, 8];
    // let num = 8;
    // console.log(frequency(arrLength, nums, num));

    //Search in Array
    const searchArray = (arr, n) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === n) {
                return `Number found at position: ${i + 1}!`;
            }
        }
    }
    // const nums = [4, 8, 2, 9, 4, 8, 6];
    // const number = 6;
    // console.log(searchArray(nums, number));

    //Insert an element in an array
    const insertAtTheEnd = (arr, n) => {
        arr[arr.length] = n;
        return arr;
    }
    // const nums = [4, 8, 2, 9, 4, 8];
    // const number = 6;
    // console.log(insertAtTheEnd(nums, number));

    const insertAtAny = (arr, n, pos) => {
        if (pos < 0 || pos > arr.length) {
            return `Invalid position`;
        }
        for (let i = arr.length; i > pos; i--) {
            arr[i] = arr[i - 1];
        }
        arr[pos] = n;
        return arr;
    }
    // const nums = [4, 8, 2, 9, 4, 8];
    // const number = 6;
    // const position = 3;
    // console.log(insertAtAny(nums, number, position));

    const deleteAtAny = (arr, pos) => {
        if (pos < 0 || pos > arr.length) {
            return `Invalid position`;
        }
        for (let i = pos; i < arr.length; i++) {
            arr[i] = arr[i + 1];
        }
        arr.length = arr.length - 1;
        return arr;
    }
    const nums = [4, 8, 2, 9, 4, 8];
    const position = 1;
    console.log(deleteAtAny(nums, position));

    //Problem 4
    const thirdLargest = (arr) => {
        let max = 0;
        let secondmax = 0;
        let thirdmax = 0;
        if (arr.length < 3) return -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                thirdmax = secondmax;
                secondmax = max;
                max = arr[i];
            } else if (arr[i] > secondmax) {
                thirdmax = secondmax;
                secondmax = arr[i];
            } else if (arr[i] > thirdmax) {
                thirdmax = arr[i];
            }
        }
        return thirdmax;
    }
    // const array = [2, 6, 8];
    // console.log(thirdLargest(array));
    // first iteration  max = 2; smax = 0; tmax = 0;
    // second iteration max = 6; smax = 2; tmax = 0;
    // third iteration max = 8; smax = 6; tmax = 2;

    //Problem 5 
    const secondSmallest = (arr) => {

        if (arr.length < 2) return -1;

        let small = 100001;
        let ssmall = 100001;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < small) {
                ssmall = small;
                small = arr[i];
            } else if (arr[i] < ssmall && arr[i] > small) {
                ssmall = arr[i];
            }
        }
        if (ssmall != 100001 || ssmall != small) {
            return -1;
        } else {
            return [small, ssmall];
        }
    }
    // const array = [2, 2, 2];
    // console.log(secondSmallest(array));

    //Problem 6
    const reversingArray = (arr, k) => {

        if (arr.length < 1) return -1;
        if (arr.length === 1) return arr;

        let left = 0;
        let right = k - 1;
        let lefttwo = k;
        let righttwo = arr.length - 1;

        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
        while (lefttwo < righttwo) {
            [arr[lefttwo], arr[righttwo]] = [arr[righttwo], arr[lefttwo]];
            lefttwo++;
            righttwo--;
        }

        return arr;
    }
    // const nums = [4, 8, 2, 9, 4, 8];
    // const k = 3;
    // console.log(reversingArray(nums, k));

    //Problem 7 
    // const rotate = (arr) => {

    //     if (arr.length <= 1) return arr;

    //     let firstElement = arr[0];
    //     for (let i = 0; i < arr.length - 1; i++){
    //         arr[i] = arr[i + 1];
    //     }
    //     arr[arr.length - 1] = firstElement;
    //     return arr; //output : 2,3,4,5,1
    // }
    const rotateTwo = (arr) => {
        if (arr.length <= 1) return arr;
        let lastElement = arr[arr.length - 1];

        for (let i = arr.length - 1; i >= 0; i--) {
            arr[i] = arr[i - 1];
        }
        arr[0] = lastElement;
        return arr;  //output : 5,1,2,3,4
    }
    // const nums = [1, 2, 3, 4, 5]; 
    // console.log(nums);
    // console.log(rotate(nums));  
    // console.log(rotateTwo(nums));  


    //Problem 8 
    // const alternate = (arr) => {
    //     if (arr.length <= 1) return arr;
    //     const result = [];
    //     let index = 1;
    //     result[0] = arr[0];
    //     for (let i = 1; i < arr.length; i++) {
    //         if (i % 2 === 0) {
    //             result[index] = arr[i];
    //             index++;
    //         }
    //     }
    //     return result; //output 1, 3, 5
    // }
    // const numss = [1, 2, 3, 4, 5];
    // console.log(alternate(numss));

    //Problem 9 
    const PalinArray = (arr) => {

        if (arr.length <= 1) return true;
        let string = '';
        let reverse = '';

        for (let i = 0; i < arr.length; i++) {
            string = String(arr[i]);
            for (let j = string.length - 1; j >= 0; j--) {
                reverse += string[j];
            }
            if (string !== reverse) {
                return false;
            }
            string = '';
            reverse = '';
        }
        return true;
    }
    // const palin = [111, 2798, 333, 444, 555];
    // console.log(PalinArray(palin));


    //Problem 9
    // Given an array height representing the heights of buildings. You have to count the buildings that will see the sunrise (Assume the sun rises on the side of the array starting point).

    const countBuildings = (height) => {

        if (height.length <= 1) return 1;
        const seeSun = [];
        let index = 1;
        seeSun[0] = height[0];

        for (let i = height.length - 1; i > 0; i--) {
            if (height[i] > height[i - 1]) {
                seeSun[index] = height[i];
                index++;
            }
        }
        return seeSun;  // output :  [7, 9, empty, 8]
    }
    // const height = [7, 4, 8, 2, 9];
    // console.log(countBuildings(height));



    const countOddEven = (arr) => {
        const odd = [];
        const even = [];
        let oddindex = 0;
        let evenindex = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 === 0 || arr[i] === 0) {
                even[evenindex] = arr[i];
                evenindex++;
            } else if (arr[i] % 2 !== 0 || arr[i] === 1) {
                odd[oddindex] = arr[i];
                oddindex++;
            }
        }
        return [odd.length, even.length];
    }
    const sdgg = [7, 4, 8, 9, 0, 1, 2];
    console.log(countOddEven(sdgg));




























    return (<div className='page flexcol center vh'></div>);
};
export default Intro;