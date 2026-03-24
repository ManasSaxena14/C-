#include <iostream>
using namespace std;

int main() {

    int a = 10;
    int b = 5;

    cout << "Arithmetic: " << a + b << endl;

    cout << "Relational: " << (a > b) << endl;

    cout << "Logical: " << (a > 2 && b < 10) << endl;

    return 0;
}

/*
--- GATE PREPARATION ---

👉 GATE Trick to Remember:
- Arithmetic → Basic Math (+, -, *, /, %)
- Relational → Comparison (>, <, >=, <=, ==, !=)
- Logical → Combine conditions (&&, ||, !)

👉 Typical GATE Question:
int a = 5, b = 10;
cout << (a < b && b < 20);

Answer: 1
Reason: Both (5 < 10) and (10 < 20) are true. (true && true) = true (1).
*/

/*
OUTPUT:
Arithmetic: 15
Relational: 1
Logical: 1
*/
