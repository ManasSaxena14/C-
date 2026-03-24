/*
Logical Operators in C++

1. Logical AND (&&)
   👉 True only if both conditions are true.
   Example: (10 > 5 && 10 < 20) → true (1)

2. Logical OR (||)
   👉 True if at least one condition is true.
   Example: (10 > 20 || 10 == 10) → true (1)

3. Logical NOT (!)
   👉 Reverses the condition.
   Example: !(5 > 3) → false (0)
*/

#include <iostream>
using namespace std;

int main() {

    int a = 10;
    int b = 20;

    cout << (a < b && b > 10) << endl;
    cout << (a > b || b > 10) << endl;
    cout << !(a > b) << endl;

    return 0;
}

/*
OUTPUT:
1
1
1
*/
