/*
📘 GATE PREVIOUS-LEVEL QUESTIONS
❓ Q1

What is output?

int x = 5;
void fun(int x) { x = 10; }

int main() {
    fun(x);
    cout << x;
}

👉 Answer: 5
✔ Pass by value

❓ Q2

Function overloading based only on return type?

👉 ❌ Not allowed

❓ Q3

Recursion without base case?

👉 ❌ Infinite recursion → stack overflow

❓ Q4

Inline function advantage?

👉 Reduces function call overhead

❓ Q5

What is output?

int fun(int &x) {
    x = x + 10;
    return x;
}

👉 Modifies original variable (reference)
*/

#include <iostream>
using namespace std;

int main() {
    cout << "See comments for GATE previous-level questions and answers." << endl;
    return 0;
}


/*
❓ Q1: Function + Post/Pre Increment
#include <iostream>
using namespace std;

int fun(int x) {
    return x++ + ++x;
}

int main() {
    int x = 5;
    cout << fun(x);
}

👉 Think deeply before seeing answer

✅ Answer:
12

👉 Explanation:

x = 5
x++ → 5 (then x = 6)
++x → 7
Total = 5 + 7 = 12

❓ Q2: Call by Value vs Reference
#include <iostream>
using namespace std;

void fun(int a, int &b) {
    a = a + 10;
    b = b + 10;
}

int main() {
    int x = 5, y = 5;
    fun(x, y);
    cout << x << " " << y;
}
✅ Answer:
5 15

👉 Only b changes (reference)

❓ Q3: Nested Function Calls
#include <iostream>
using namespace std;

int fun(int x) {
    if (x == 0) return 0;
    return x + fun(x - 1);
}

int main() {
    cout << fun(3);
}
✅ Answer:
6

👉 3 + 2 + 1 + 0

❓ Q4: Static Variable (VERY IMPORTANT)
#include <iostream>
using namespace std;

void fun() {
    static int x = 0;
    x++;
    cout << x << " ";
}

int main() {
    fun();
    fun();
    fun();
}
✅ Answer:
1 2 3

👉 Static variable retains value

❓ Q5: Tricky If-Else + Function
#include <iostream>
using namespace std;

int fun(int x) {
    if (x > 0)
        return fun(x - 1);
    else
        return x;
}

int main() {
    cout << fun(5);
}
✅ Answer:
0

👉 Keeps reducing until x = 0

❓ Q6: Return + Side Effect
#include <iostream>
using namespace std;

int fun(int &x) {
    x = x + 1;
    return x;
}

int main() {
    int x = 5;
    cout << fun(x) + fun(x);
}
✅ Answer:
13

👉 Step:

First call → x = 6 → returns 6
Second call → x = 7 → returns 7
Total = 13

❓ Q7: Infinite Recursion Trap
#include <iostream>
using namespace std;

int fun(int x) {
    if (x == 1) return 1;
    return fun(x / 2);
}

int main() {
    cout << fun(0);
}
✅ Answer:

👉 Infinite recursion → Stack Overflow

❓ Q8: Loop + Function Call
#include <iostream>
using namespace std;

int fun(int x) {
    return x * 2;
}

int main() {
    int x = 1;
    for (int i = 0; i < 3; i++) {
        x = fun(x);
    }
    cout << x;
}
✅ Answer:
8

👉 1 → 2 → 4 → 8

❓ Q9: Order of Evaluation (TRICKY)
#include <iostream>
using namespace std;

int fun(int x, int y) {
    return x + y;
}

int main() {
    int a = 2;
    cout << fun(a++, ++a);
}
✅ Answer:

👉 Undefined Behavior (VERY IMPORTANT)

👉 Because order of evaluation is not guaranteed

❓ Q10: Function Returning Reference (ADVANCED)
#include <iostream>
using namespace std;

int& fun(int &x) {
    x = x + 5;
    return x;
}

int main() {
    int x = 10;
    fun(x) = 20;
    cout << x;
}
✅ Answer:
20
*/

#include <iostream>
using namespace std;

int main() {
    cout << "See comments for practice questions 1 to 10." << endl;
    return 0;
}



/*
🔹 Q1 (GATE Pattern)
int fun(int n) {
    if (n <= 1) return n;
    return fun(n-1) + fun(n-2);
}

Time complexity?

A) O(n)
B) O(log n)
C) O(2^n)
D) O(n²)

👉 Answer: C (O(2^n))

🔹 Q2 (GATE 2004 Style)
int fun(int n) {
    if (n == 0) return 0;
    return fun(n/2) + 1;
}

What does it compute?

A) n
B) log₂(n)
C) n/2
D) √n

👉 Answer: B (log₂ n)

🔹 Q3 (GATE Classic)
void fun(int n) {
    if (n == 0) return;
    cout << n;
    fun(n-1);
}

Output for fun(3)?

👉 Answer: 3 2 1

🔹 Q4 (GATE Output)
int x = 5;

void fun() {
    x = x + 1;
}

int main() {
    fun();
    cout << x;
}

👉 Answer: 6

🔹 Q5 (GATE Static Variable)
void fun() {
    static int x = 0;
    x++;
    cout << x;
}

Called 3 times → output?

👉 Answer: 123

🔹 Q6 (GATE Concept)

Which is TRUE?

A) Recursion always faster
B) Recursion uses stack
C) Recursion cannot be replaced
D) Recursion has no overhead

👉 Answer: B

🔹 Q7 (GATE Output)
int fun(int x) {
    if (x == 0) return 1;
    return x * fun(x - 1);
}

fun(4)?

👉 Answer: 24

🔹 Q8 (GATE 2012 Pattern)
int fun(int n) {
    if (n == 1) return 1;
    return fun(n/2);
}

fun(8)?

👉 Answer: 1

🔹 Q9 (GATE Concept)

Inline function reduces:

A) Memory
B) Execution time (call overhead)
C) Code size
D) Compilation time

👉 Answer: B

🔹 Q10 (GATE Output)
int fun(int x) {
    return x + fun(x - 1);
}

What happens?

👉 Answer: Infinite recursion (no base case)

🔹 Q11 (GATE Reference)
void fun(int &x) {
    x = 10;
}

Effect?

👉 Answer: Original variable modified

🔹 Q12 (GATE Overloading)

Which is valid?

A) Same name, same parameters
B) Same name, different parameters
C) Same name, different return only
D) Different name

👉 Answer: B

🔹 Q13 (GATE Output)
int fun(int x) {
    if (x == 0) return 0;
    return x + fun(x - 2);
}

fun(6)?

👉 Answer: 12 (6+4+2+0)

🔹 Q14 (GATE Stack)

Recursion uses:

A) Heap
B) Stack
C) Queue
D) Array

👉 Answer: B

🔹 Q15 (GATE Concept)

Base case in recursion prevents:

👉 Answer: Infinite recursion

🔹 Q16 (GATE Output)
int fun(int n) {
    if (n <= 0) return 0;
    return fun(n-1) + 1;
}

fun(5)?

👉 Answer: 5

🔹 Q17 (GATE Parameter Passing)

Pass by value means:

👉 Answer: Copy is passed

🔹 Q18 (GATE Output)
int fun(int n) {
    if (n == 0) return 1;
    return fun(n-1);
}

fun(5)?

👉 Answer: 1

🔹 Q19 (GATE Complexity)
fun(n) {
    fun(n-1);
    fun(n-1);
}

Time complexity?

👉 Answer: O(2^n)

🔹 Q20 (GATE Trick)
int fun(int x) {
    static int y = 0;
    y += x;
    return y;
}

fun(2), fun(3), fun(4)?

👉 Answer: 2 5 9
*/

#include <iostream>
using namespace std;

int main() {
    cout << "See comments for GATE pattern questions 1 to 20." << endl;
    return 0;
}

/*
🧠 GATE-LEVEL MCQs (WITH ANSWERS)
🔹 Q1
int fun(int x) {
    if (x == 0) return 0;
    return x + fun(x - 1);
}

Output of fun(4)?

A) 6
B) 10
C) 4
D) 0

👉 Answer: B (10)

🔹 Q2
int fun(int x) {
    static int y = 0;
    y += x;
    return y;
}

Output?

cout << fun(1) << " " << fun(2) << " " << fun(3);

A) 1 2 3
B) 1 3 6
C) 1 1 1
D) 6 6 6

👉 Answer: B (1 3 6)

🔹 Q3
void fun(int a) {
    a = 20;
}

Output?

int x = 10;
fun(x);
cout << x;

A) 10
B) 20
C) Garbage
D) Error

👉 Answer: A (10)

🔹 Q4
void fun(int &a) {
    a = 20;
}

Output?

A) 10
B) 20
C) Error
D) Undefined

👉 Answer: B (20)

🔹 Q5
int fun(int x) {
    if (x <= 1) return 1;
    return fun(x - 1) + fun(x - 2);
}

Output of fun(4)?

A) 3
B) 5
C) 8
D) 2

👉 Answer: B (5)

🔹 Q6
int fun(int x) {
    return x++ + x;
}

Output of fun(5)?

A) 10
B) 11
C) 12
D) Undefined

👉 Answer: D (Undefined Behavior)

🔹 Q7
int fun(int x) {
    if (x == 0) return 1;
    return x * fun(x - 1);
}

Output of fun(3)?

A) 6
B) 3
C) 9
D) 1

👉 Answer: A (6)

🔹 Q8
int fun(int x, int y) {
    return x > y ? x : y;
}

Output of fun(5, 10)?

A) 5
B) 10
C) 15
D) Error

👉 Answer: B (10)

🔹 Q9
int fun(int x) {
    if (x == 1) return 1;
    return fun(x / 2);
}

Output of fun(8)?

A) 8
B) 4
C) 2
D) 1

👉 Answer: D (1)

🔹 Q10
int fun(int &x) {
    x++;
    return x;
}

Output?

int x = 5;
cout << fun(x) << " " << x;

A) 5 5
B) 6 5
C) 6 6
D) 5 6

👉 Answer: C (6 6)

🔹 Q11
int fun(int x) {
    static int y = 1;
    y *= x;
    return y;
}

Output?

cout << fun(2) << " " << fun(3);

A) 2 3
B) 2 6
C) 2 2
D) 6 6

👉 Answer: B (2 6)

🔹 Q12
int fun(int x) {
    if (x == 0) return 0;
    return fun(x - 1);
}

Output of fun(5)?

A) 5
B) 1
C) 0
D) Infinite

👉 Answer: C (0)

🔹 Q13
int fun(int x) {
    if (x == 0) return 0;
    if (x % 2 == 0) return fun(x / 2);
    return fun(x - 1);
}

Output of fun(6)?

A) 6
B) 3
C) 1
D) 0

👉 Answer: D (0)

🔹 Q14
int fun(int x) {
    return x * x;
}

Output?

cout << fun(fun(2));

A) 4
B) 8
C) 16
D) 32

👉 Answer: C (16)

🔹 Q15
int fun(int x) {
    int y = x;
    return y;
}

Output?

cout << fun(5);

A) 5
B) Garbage
C) Error
D) 0

👉 Answer: A (5)

🔹 Q16
int fun(int x) {
    if (x < 0) return -1;
    return 1;
}

Output of fun(-5)?

A) -1
B) 1
C) 0
D) Error

👉 Answer: A (-1)

🔹 Q17
int fun(int x) {
    for (int i = 0; i < x; i++)
        x--;
    return x;
}

Output of fun(5)?

A) 5
B) 0
C) 2
D) Infinite

👉 Answer: C (2)

🔹 Q18
int fun(int x) {
    return x == 0 ? 1 : x * fun(x - 1);
}

Output of fun(4)?

A) 24
B) 12
C) 6
D) 1

👉 Answer: A (24)

🔹 Q19
int fun(int x) {
    if (x == 0) return 0;
    return x + fun(x - 2);
}

Output of fun(5)?

A) 9
B) 6
C) 5
D) 3

👉 Answer: A (9)
👉 5 + 3 + 1

🔹 Q20
int fun(int x) {
    if (x == 0) return 0;
    return fun(x - 1) + 1;
}

Output of fun(5)?

A) 0
B) 1
C) 5
D) Infinite

👉 Answer: C (5)
*/

#include <iostream>
using namespace std;

int main() {
    cout << "See comments for GATE-level MCQs 1 to 20." << endl;
    return 0;
}

