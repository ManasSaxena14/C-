/*
🔹 1. Direct (Sequential) Access

👉 Elements are accessed one by one in order (0 → 1 → 2 → ...)
*/

#include <iostream>
using namespace std;

void directAccessExample() {
    int arr[5] = {10, 20, 30, 40, 50};

    for(int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

/*
✅ Output
10 20 30 40 50

⏱️ Complexity
Time: O(n) (need to traverse elements)
Space: O(1)
---------------------------------------------------------
🔹 2. Random Access

👉 You can access any element directly using index (no need to go in order)
*/

void randomAccessExample() {
    int arr[5] = {10, 20, 30, 40, 50};

    cout << arr[3] << endl;  // Direct access
}

/*
✅ Output
40

⏱️ Complexity
Time: O(1) (constant time access)
Space: O(1)
---------------------------------------------------------

📌 Generalized Formula (Array Addressing)
Given array: A[lb … ub]
Lower bound = lb
Upper bound = ub
Base address = BA
Size of each element = S

🧠 Formula
👉 Address of A[i] = BA + (i − lb) × S {FOR PYTHON}

For C Language (0-based Indexing)
In C, arrays start from index 0
So, lower bound (lb) = 0

🧠 Formula (C Language)
👉 Address of A[i] = BA + (i × S)

---------------------------------------------------------
Consider an array A[1…100].

Base address = 1000
Each element size = 2 bytes

👉 Find the address of A[78]

🧠 Concept (GATE Formula)
👉 Address of A[i] = Base + (i - 1) × size

⚡ Calculation
A[78] → (78 - 1) = 77 elements before it
Address = 1000 + (77 × 2)
Address = 1000 + 154 = 1154

⏱️ Complexity
Time Complexity: O(1)
Space Complexity: O(1)

🎯 GATE Trick
👉 If array starts from A[1] → use (i - 1)
👉 If array starts from A[0] → use (i)

=========================================================
2-D ARRAY
 
📌 Row Major Order in 2D Array (GATE Important)

🧠 Concept (Simple)
👉 In row-major order, elements are stored row by row
➡️ First complete Row 0, then Row 1, then Row 2 …

📌 General Formula
Given:
Array: A[lb1…ub1][lb2…ub2]
Base Address = BA
Size of each element = S
Number of columns = N = (ub2 − lb2 + 1)

🧠 Formula
👉 Address of A[i][j] = BA + [(i − lb1) × N + (j − lb2)] × S

📌 Special Case (C/C++)
👉 In C:
Lower bound = 0
So formula becomes:
👉 Address = BA + (i × N + j) × S

⚡ GATE Tricks (VERY IMPORTANT)
👉 Row major → Row first → multiply by columns
👉 Column major → Column first → multiply by rows
👉 Always remember:
Row Major → i × columns + j
Column Major → j × rows + i

🎯 One-Line Memory Trick
👉 Row Major = "Row × Columns + Column"

---------------------------------------------------------
Consider array A[1…100][1…100]

Base address = 1000
Element size = 2 bytes

👉 Find address of A[50][49] in row-major order

✅ Answer
👉 Formula:
Address = BA + [(i − 1) × N + (j − 1)] × S

N = 100
i = 50, j = 49

👉 Address = 1000 + [(49 × 100) + 48] × 2
👉 Address = 1000 + (4900 + 48) × 2
👉 Address = 1000 + 4948 × 2
👉 Address = 1000 + 9896
👉 Final Answer = 10896

---------------------------------------------------------
Question

Consider array A[-4…100][3…100]

Base address = 1000
Element size = 2 bytes

👉 Find address of A[50][48] in:
Row Major Order
Column Major Order

✅ Answer (Brief Calculation)

🔸 Row Major
Rows before = 50 − (−4) = 54
Columns before = 48 − 3 = 45
Elements before = (54 × 98) + 45 = 5337

👉 Address = 1000 + (5337 × 2)
👉 = 11674

🔸 Column Major
Columns before = 48 − 3 = 45
Rows before = 50 − (−4) = 54
Elements before = (45 × 105) + 54 = 4779

👉 Address = 1000 + (4779 × 2)
👉 = 10558

---------------------------------------------------------
Generalized Formulas (Short & Clean)

🔹 Notations
A[lb₁…ub₁][lb₂…ub₂] → 2D array
BA → Base Address
S → Size of each element
i, j → Row & Column index
Rows (M) = (ub₁ − lb₁ + 1)
Columns (N) = (ub₂ − lb₂ + 1)

🔸 1D Array
👉 Address of A[i] = BA + (i − lb) × S

🔸 2D Array (Row Major Order)
👉 Address of A[i][j] = BA + [(i − lb₁) × N + (j − lb₂)] × S

🔸 2D Array (Column Major Order)
👉 Address of A[i][j] = BA + [(j − lb₂) × M + (i − lb₁)] × S

⚡ Quick Memory Tricks
Row Major → Row first → multiply by Columns (N)
Column Major → Column first → multiply by Rows (M)

⏱️ Complexity
Time: O(1)
Space: O(1)

---------------------------------------------------------
Question

An array A[-2…2][3…7]

Element size = 2
Base address = 1000

👉 Address of A[0][5]:
Row Major = X
Column Major = Y

Find X + Y

✅ Answer (Very Brief)

🔹 Values
lb₁ = -2, lb₂ = 3
Rows (M) = 2 − (−2) + 1 = 5
Columns (N) = 7 − 3 + 1 = 5

🔸 Row Major (X)
X = 1000 + [(0 − (−2)) × 5 + (5 − 3)] × 2
X = 1000 + [(2×5 + 2)] × 2
X = 1000 + (12 × 2) = 1024

🔸 Column Major (Y)
Y = 1000 + [(5 − 3) × 5 + (0 − (−2))] × 2
Y = 1000 + [(2×5 + 2)] × 2
Y = 1000 + (12 × 2) = 1024

🎯 Final Answer
👉 X + Y = 1024 + 1024 = 2048

---------------------------------------------------------
📌 Question

Array A[5…20][4…10]

Base address = 1000
Element size = 4 bytes

👉 Find general address of A[i][j] in row-major order

✅ Answer (Brief)

🔹 Values
lb₁ = 5, lb₂ = 4
Columns (N) = 10 − 4 + 1 = 7

🔸 Formula
👉 Address = BA + [(i − lb₁) × N + (j − lb₂)] × S

🔸 Calculation
= BA + [(i − 5) × 7 + (j − 4)] × 4
= BA + [7i − 35 + j − 4] × 4
= BA + [7i + j − 39] × 4
= BA + 28i + 4j − 156

🎯 Final Answer
👉 BA + [28i − 156 + 4j] ✅ (Option C)

---------------------------------------------------------
Question

Array A[-23…93][-7…31]

Base address = 1000
Element size = 2 bytes

👉 Which of the following is TRUE?

✅ Answer: (B)

🧠 Brief Explanation
🔹 Dimensions
Rows = 93 − (−23) + 1 = 117
Columns = 31 − (−7) + 1 = 39
Total elements = 117 × 39

🔸 Check Options
(A) ❌
117 = number of rows, not elements in a row

(B) ✅
B[0…116] → 117 rows
B[2…40] → 39 columns
👉 Same size = 117 × 39 ✔️

(C) ❌
Row-major address of A[0][5]:
= 1000 + [(0+23)×39 + (5+7)]×2
= 1000 + (23×39 + 12)×2
= 1000 + (897 + 12)×2
= 1000 + 909×2 = 2818 ≠ 3538

(D) ❌
A[0][0]:
= 1000 + [(23×39 + 7)]×2
= 1000 + (897 + 7)×2
= 1000 + 904×2 = 2808 ≠ 3538

🎯 Final Answer
👉 Option (B)

⏱️ Complexity
Time: O(1)
Space: O(1)
*/

int main() {
    // Calling the examples so they run properly
    directAccessExample();
    randomAccessExample();

    return 0;
}
