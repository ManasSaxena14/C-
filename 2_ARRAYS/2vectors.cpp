#include <iostream>
#include <vector>
using namespace std;

/*
=========================================================
 1. BASIC INTUITION (Level 0)
=========================================================
❓ What is a Vector?
A vector is a dynamic array in C++.

👉 Meaning:
- Array = fixed size ❌
- Vector = size can grow/shrink dynamically ✅

🧾 Real-life example:
- Array = fixed-size classroom
- Vector = expandable classroom (can add more benches anytime)
*/

void coreConcepts() {
    cout << "--- 2. CORE CONCEPTS (Level 1) ---" << endl;
    
    // ✅ Syntax
    vector<int> vec1;                // empty vector
    vector<int> vec2 = {1, 2, 3};    // initialize with values
    vector<int> vec3(3, 10);         // size = 3, all values = 10

    // 🔑 Important Operations
    vec2.push_back(10);  // Add element
    vec2.pop_back();     // Remove last element

    // Access elements
    cout << "vec2[0] = " << vec2[0] << endl;        // fast, no check
    cout << "vec2.at(0) = " << vec2.at(0) << endl;  // safe, gives error if out of bound

    // Size
    cout << "Size of vec2 = " << vec2.size() << endl;

    // Loop
    cout << "Vector elements: ";
    for(int i = 0; i < vec2.size(); i++) {
        cout << vec2[i] << " ";
    }
    cout << endl;
}

/*
=========================================================
 3. DEEP UNDERSTANDING (Level 2)
=========================================================
🔥 How Vector Works Internally (VERY IMPORTANT FOR GATE)

Vector uses:
👉 Dynamic array + resizing

Process:
1. Initially small memory allocated
2. When full → new bigger memory allocated (usually doubles)
3. Old elements copied
4. Old memory deleted

💥 Capacity vs Size:
- vec.size();     // number of elements
- vec.capacity(); // total allocated space

⚡ Time Complexity (VERY IMPORTANT):
Operation       Complexity
--------------------------
Access          O(1)
push_back       O(1)* (Amortized)
pop_back        O(1)
insert middle   O(n)
delete middle   O(n)

👉 push_back is amortized O(1) (GATE favorite)

❌ Common Mistakes:
- Using vec[i] out of bounds ❌
- Forgetting #include <vector> ❌
- Thinking push_back is always O(1) ❌
*/

void coreFunctions() {
    cout << "\n--- 4. CORE FUNCTIONS (Level 1 detailed) ---" << endl;
    vector<int> v = {10, 20, 30};

    // 🔹 1. size() (O(1))
    cout << "v.size() = " << v.size() << endl; // 3

    // 🔹 2. push_back() (Amortized O(1))
    v.push_back(40); // {10, 20, 30, 40}
    cout << "After push_back(40), v.back() = " << v.back() << endl;

    // 🔹 3. pop_back() (O(1))
    v.pop_back(); // removes 40
    cout << "After pop_back(), v.back() = " << v.back() << endl;

    // 🔹 4. front() (O(1))
    cout << "v.front() = " << v.front() << endl; // 10

    // 🔹 5. back() (O(1))
    cout << "v.back() = " << v.back() << endl; // 30

    // 🔹 6. at(index) (O(1), safe access)
    cout << "v.at(1) = " << v.at(1) << endl; // 20
}

/*
=========================================================
 5. GATE LEVEL QUESTIONS (Level 3)
=========================================================
*/

void gateQuestions() {
    cout << "\n--- 5. GATE LEVEL QUESTIONS ---" << endl;

    cout << "Q1: If a vector doubles its capacity when full, what is complexity of inserting n elements?" << endl;
    cout << "A1: O(n) (because of amortized O(1) per insertion)" << endl;

    cout << "\nQ2: Which operation is costly?" << endl;
    cout << "A) push_back\tB) pop_back\tC) insert at beginning\tD) access" << endl;
    cout << "A2: ✅ C) insert at beginning (O(n))" << endl;

    cout << "\nQ3: What happens when capacity is exceeded?" << endl;
    cout << "A3: New bigger memory is allocated + elements are copied + old memory deleted." << endl;

    cout << "\nQ4: Which is the safest way to access a vector?" << endl;
    cout << "A) v[i]\tB) v.at(i)" << endl;
    cout << "A4: ✅ B) v.at(i) (includes bounds checking)" << endl;

    cout << "\nQ5: What is the time complexity of push_back?" << endl;
    cout << "A5: ✅ Amortized O(1)" << endl;

    cout << "\nQ6: What happens if you do v.pop_back() on an empty vector?" << endl;
    cout << "A6: ✅ Undefined behavior / runtime error" << endl;

    cout << "\nQ7: Which gives first element?" << endl;
    cout << "A) v[0]\tB) v.front()\tC) Both" << endl;
    cout << "A7: ✅ C)" << endl;
}

void gatePYQs() {
    cout << "\n--- 6. ADDITIONAL GATE PYQs (Previous Year Questions) ---" << endl;

    cout << "Q1. (GATE CSE 2021): Minimum comparisons for min & max in array of n elements?" << endl;
    cout << "A1: ✅ 3n/2 - 2 (Concept: Compare in pairs)" << endl;

    cout << "\nQ2. (GATE CSE 2020): int a[4][5]; printf(\"%d\", *(*(a+**a+2)+3)); if a[0][0]=1?" << endl;
    cout << "A2: ✅ 19 (Concept: a + 1 + 2 = a + 3; row 3, col 3)" << endl;

    cout << "\nQ3. (GATE CSE 2005): DS to store marks (0-100) and print frequency of marks > 50?" << endl;
    cout << "A3: ✅ (a) Array of 50 (to store counts for 51-100)" << endl;

    cout << "\nQ4. (GATE CSE 2000): reverse(s,1,k); reverse(s,k+1,n); reverse(s,1,n); - What does it do?" << endl;
    cout << "A4: ✅ Left rotate by k elements" << endl;

    cout << "\nQ5. (GATE CSE 2011): char c[] = \"GATE2011\"; printf(\"%s\", p + p[3] - p[1]);" << endl;
    cout << "A5: ✅ 2011 (Concept: Pointer arithmetic using ASCII values)" << endl;

    cout << "\nQ6. (GATE CSE 2019): Pointer-based loop over array to compute sum?" << endl;
    cout << "A6: ✅ 10 (Example behavior)" << endl;

    cout << "\nQ7. (GATE CSE 2024): Min replacements to make [2, 5, 3, 1, 4, 2, 6] sorted?" << endl;
    cout << "A7: ✅ 3 (Concept: LIS based Sorting distance)" << endl;

    cout << "\nQ8. (GATE CSE 2004): Two stacks in one array. When is stack FULL?" << endl;
    cout << "A8: ✅ When top1 + 1 == top2" << endl;

    cout << "\nQ9. (GATE CSE 2014): int arr[5]={10,20,30,40,50}; printf(\"%d\", *(p + 3));" << endl;
    cout << "A9: ✅ 40 (4th element)" << endl;

    cout << "\nQ10. (GATE CSE 2016): int a[3][3]; printf(\"%d\", *(*(a+1)+2));" << endl;
    cout << "A10: ✅ 6 (2nd row, 3rd column)" << endl;

    cout << "\nQ11. (GATE CSE 2018): Time complexity to access an element in array?" << endl;
    cout << "A11: ✅ O(1)" << endl;

    cout << "\nQ12. (GATE CSE 2006): Best sorting for nearly sorted array?" << endl;
    cout << "A12: ✅ Insertion Sort" << endl;

    cout << "\nQ13. (GATE CSE 2013): int arr[]={1,2,3,4,5}; printf(\"%d\", *(arr + 2));" << endl;
    cout << "A13: ✅ 3" << endl;

    cout << "\nQ14. (GATE CSE 2017): Address of A[i][j] in row-major order?" << endl;
    cout << "A14: ✅ base + ((i * n) + j) * size (VERY IMPORTANT)" << endl;

    cout << "\nQ15. (GATE CSE 2012): Which DS uses contiguous memory?" << endl;
    cout << "A15: ✅ Array" << endl;

    cout << "\nQ16. (GATE CSE 2019): If array index starts from 1 instead of 0, what changes?" << endl;
    cout << "A16: ✅ Only address calculation formula changes" << endl;

    cout << "\nQ17. (GATE CSE 2008): Best case time complexity of linear search?" << endl;
    cout << "A17: ✅ O(1)" << endl;

    cout << "\nQ18. (GATE CSE 2022): Dynamic array resizing complexity?" << endl;
    cout << "A18: ✅ Amortized Complexity" << endl;
}

int main() {
    coreConcepts();
    coreFunctions();
    gateQuestions();
    gatePYQs();

    return 0;
}
