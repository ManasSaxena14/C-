/*
Unary Operators in C++
A Unary Operator works on only one operand (one variable).
Unary → "Uni" means one

Example:
++a
--a
Only one variable is used.

Types of Unary Operators:
Operator    Meaning
+           Unary plus
-           Unary minus
++          Increment
--          Decrement
!           Logical NOT
*/

#include <iostream>
using namespace std;

int main() {

    int a = 10;

    cout << "--- 1. Increment Operator (++) ---" << endl;
    // It increases value by 1.
    int b = 5;
    ++b;
    cout << "Value of b after ++b: " << b << endl; // Output: 6

    cout << "\n--- 2. Decrement Operator (--) ---" << endl;
    // It decreases value by 1.
    int c = 5;
    --c;
    cout << "Value of c after --c: " << c << endl; // Output: 4

    cout << "\n--- 3. Pre-Increment vs Post-Increment (VERY IMPORTANT) ---" << endl;
    // Pre-Increment (++a): First increase, then use value.
    int d = 5;
    cout << "Pre Increment (++d): " << ++d << endl; // Output: 6

    // Post-Increment (a++): First use value, then increase.
    int e = 5;
    cout << "Post Increment (e++): " << e++ << endl; // Output: 5
    cout << "Value of e after post-increment: " << e << endl; // Value becomes 6

    cout << "\n--- 4. Pre-Decrement vs Post-Decrement ---" << endl;
    // Pre-Decrement (--a): Decrease first.
    int f = 5;
    cout << "Pre Decrement (--f): " << --f << endl; // Output: 4

    // Post-Decrement (a--): Use value first.
    int g = 5;
    cout << "Post Decrement (g--): " << g-- << endl; // Output: 5

    cout << "\n--- 5. Unary Logical NOT (!) ---" << endl;
    cout << "!(5 > 3): " << !(5 > 3) << " (false/0)" << endl;

    cout << "\n--- 6. Complete Example Summary ---" << endl;
    int h = 10;
    cout << "Original: " << h << endl;
    cout << "Pre Increment: " << ++h << endl;
    cout << "Post Increment: " << h++ << endl;
    cout << "After Post Increment: " << h << endl;
    cout << "Pre Decrement: " << --h << endl;
    cout << "Post Decrement: " << h-- << endl;
    cout << "Final Value: " << h << endl;

    return 0;
}

/*
--- GATE TRICK ---
++a → Increment first, then use.
a++ → Use first, then increment later.

Example MCQ:
int a = 5;
cout << a++ + ++a;

Steps:
1. a++ returns 5, then a becomes 6.
2. ++a increments a to 7, then returns 7.
Total: 5 + 7 = 12.
*/

/*
TOTAL OUTPUT OF ABOVE PROGRAM:
--- 1. Increment Operator (++) ---
Value of b after ++b: 6

--- 2. Decrement Operator (--) ---
Value of c after --c: 4

--- 3. Pre-Increment vs Post-Increment (VERY IMPORTANT) ---
Pre Increment (++d): 6
Post Increment (e++): 5
Value of e after post-increment: 6

--- 4. Pre-Decrement vs Post-Decrement ---
Pre Decrement (--f): 4
Post Decrement (g--): 5

--- 5. Unary Logical NOT (!) ---
!(5 > 3): 0 (false/0)

--- 6. Complete Example Summary ---
Original: 10
Pre Increment: 11
Post Increment: 11
After Post Increment: 12
Pre Decrement: 11
Post Decrement: 11
Final Value: 10
*/
