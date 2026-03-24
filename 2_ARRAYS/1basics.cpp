#include <iostream>
using namespace std;

/*
=========================================================
 1. What is an Array? (CORE IDEA)
=========================================================
👉 An array is a collection of elements of the same data type, stored in contiguous memory locations.

Example:
int arr[5] = {1, 2, 3, 4, 5};

📌 Key Properties:
- Fixed size
- Same data type
- Index starts from 0
- Stored in continuous memory
*/

/*
=========================================================
🔹 2. Declaration & Initialization
=========================================================
✅ (A) Declaration
int arr[5];   // array of size 5

✅ (B) Initialization
Method 1:
int arr[5] = {1, 2, 3, 4, 5};

Method 2 (size auto-detected):
int arr[] = {10, 20, 30};

Method 3 (partial initialization):
int arr[5] = {1, 2};  
// rest elements → 0
*/

void accessingElements() {
    cout << "\n--- 3. Accessing Elements ---" << endl;
    /*
    👉 Syntax:
    arr[index]
    */
    int arr[5] = {10, 20, 30, 40, 50};

    cout << "arr[0] = " << arr[0] << endl;  // 10
    cout << "arr[2] = " << arr[2] << endl;  // 30

    /*
    📌 GATE NOTE:
    Access time = O(1) (constant time)
    */
}

void updatingElements() {
    cout << "\n--- 4. Updating / Changing Value at Index ---" << endl;
    /*
    arr[2] = 100;   // change value at index 2
    */
    int arr[3] = {1, 2, 3};

    arr[1] = 50;   // array becomes {1, 50, 3}
    cout << "arr[1] after update = " << arr[1] << " (Array becomes: {1, 50, 3})" << endl;
}

void inputOutput() {
    cout << "\n--- 5. Input & Output in Arrays (Skipped input for hardcoded example) ---" << endl;
    int arr[5] = {10, 20, 30, 40, 50}; // Hardcoded for demo instead of cin

    /*
    ✅ Taking Input
    int arr[5];
    for(int i = 0; i < 5; i++) {
        cin >> arr[i];
    }
    */
    
    // ✅ Printing Output
    cout << "Array elements: ";
    for(int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

void traversingArray() {
    cout << "\n--- 6. Traversing an Array ---" << endl;
    int arr[4] = {5, 10, 15, 20};
    int n = 4;
    
    /*
    👉 Traversing = visiting each element
    */
    cout << "Traversing: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    /*
    📌 Complexity:
    Time = O(n)
    Space = O(1)
    */
}

void basicOperations() {
    cout << "\n--- 7. Important Basic Operations (VERY GATE RELEVANT) ---" << endl;
    int arr[] = {10, 45, 2, 88, 30};
    int n = 5;

    // ✅ (1) Find Sum of Array
    int sum = 0;
    for(int i = 0; i < n; i++) {
        sum += arr[i];
    }
    cout << "Sum = " << sum << endl;
    // ⏱ Time: O(n)

    // ✅ (2) Find Maximum Element
    int maxVal = arr[0];
    for(int i = 1; i < n; i++) {
        if(arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    cout << "Maximum Element = " << maxVal << endl;
    // ⏱ Time: O(n)

    // ✅ (3) Find Minimum Element
    int minVal = arr[0];
    for(int i = 1; i < n; i++) {
        if(arr[i] < minVal) {
            minVal = arr[i];
        }
    }
    cout << "Minimum Element = " << minVal << endl;

    // ✅ (4) Linear Search (VERY IMPORTANT)
    int key = 30;
    bool found = false;
    for(int i = 0; i < n; i++) {
        if(arr[i] == key) {
            found = true;
            break;
        }
    }
    cout << "Linear Search for " << key << ": " << (found ? "Found" : "Not Found") << endl;
    /*
    📌 Complexity:
    Best: O(1)
    Worst: O(n)
    */
}

/*
=========================================================
🔹 8. Memory Layout (SUPER IMPORTANT FOR GATE)
=========================================================
👉 Arrays are stored contiguously

If:
int arr[3] = {10, 20, 30};

Memory:
arr[0] → address x
arr[1] → x + 4
arr[2] → x + 8

📌 Formula:
Address of arr[i] = base_address + (i × size_of_element)
*/

void arraysAndPointers() {
    cout << "\n--- 9. Arrays & Pointers (VERY IMPORTANT BASICS) ---" << endl;
    /*
    👉 Array name = pointer to first element
    */
    int arr[3] = {10, 20, 30};

    cout << "arr = " << arr << "\t// address of arr[0]" << endl;      
    cout << "&arr[0] = " << &arr[0] << "\t// same" << endl;  

    /*
    👉 Access using pointer:
    */
    cout << "*(arr + 1) = " << *(arr + 1) << "\t// 20" << endl;  

    /*
    📌 Important:
    arr[i] == *(arr + i)
    */
}

/*
=========================================================
🔹 10. Pass Array to Function
=========================================================
❌ Pass by Value (actually decays to pointer)
void print(int arr[], int n)
*/

// Example:
void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

void passToFunction() {
    cout << "\n--- 10. Pass Array to Function ---" << endl;
    int arr[3] = {1, 2, 3};
    cout << "Passing array: ";
    printArray(arr, 3);
    /*
    📌 NOTE:
    Array is passed as pointer
    Changes inside function affect original array
    */
}

/*
=========================================================
🔹 11. Common Mistakes (VERY IMPORTANT)
=========================================================
🚫 Out of bounds:
arr[5]   // invalid if size = 5

🚫 Uninitialized array:
int arr[5];  // contains garbage

🚫 Forgetting size:
for(int i = 0; i <= n; i++) // WRONG
*/

/*
=========================================================
🔹 12. Quick Summary (Revise Fast)
=========================================================
Operation      Time Complexity
Access         O(1)
Update         O(1)
Traversal      O(n)
Linear Search  O(n)
*/


/* 
=========================================================
QUESTIONS 
=========================================================
*/

void question1() {
    cout << "\n--- QUESTION 1 ---" << endl;
    int marks[5] = {99, 100, 54, 36, 88};
    int size = 5;

    cout << sizeof(marks) / sizeof(int) << endl;

    /*
    ✅ Output
    5
    💡 Why Output is 5?
    sizeof(marks) = total bytes of array = 5 × 4 = 20 bytes
    sizeof(int) = 4 bytes
    */
}

void changeArr(int arr[], int size) {
    cout << "in function\n";
    for(int i = 0; i < size; i++) {
        arr[i] = 2 * arr[i];
    }
}

void question2() {
    cout << "\n--- QUESTION 2 ---" << endl;
    int arr[] = {1, 2, 3};

    changeArr(arr, 3);

    cout << "in main\n";
    for(int i = 0; i < 3; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    /*
    ✅ Output
    in function
    in main
    2 4 6
    
    ✅ 3-Line Explanation:
    Array is passed as a pointer, so changes inside the function affect the original array.
    Each element is multiplied by 2 inside changeArr().
    Updated array {2, 4, 6} is printed in main().
    */
}

int linearSearch(int arr[], int size, int target) {
    for(int i = 0; i < size; i++) {
        if(arr[i] == target) {
            return i;   // return index if found
        }
    }
    return -1;  // not found
}

void question3() {
    cout << "\n--- QUESTION 3 (Linear Search) ---" << endl;
    int arr[] = {4, 2, 7, 8, 1, 2, 5};
    int sz = 7;
    int target = 50;

    cout << linearSearch(arr, sz, target) << endl;

    /*
    ✅ Output
    -1
    
    ✅ 3-Line Explanation:
    Linear search checks each element one by one.
    Since 50 is not present in the array, loop completes fully.
    Function returns -1, meaning element not found.
    */
}

int main() {
    accessingElements();
    updatingElements();
    inputOutput();
    traversingArray();
    basicOperations();
    arraysAndPointers();
    passToFunction();
    
    question1();
    question2();
    question3();

    return 0;
}
