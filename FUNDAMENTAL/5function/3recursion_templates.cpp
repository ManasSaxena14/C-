/*
🔹 3. Recursion + Templates
🧠 Concept
🔸 Recursion

Function calling itself → must have base case

🔸 Function Templates

Generic functions (type-independent)
*/

#include <iostream>
using namespace std;

// Recursion
int fact(int n) {
    if (n == 0) return 1;
    return n * fact(n - 1);
}

// Template
template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    cout << "Factorial of 5: " << fact(5) << endl;
    cout << "Template Add int: " << add(5, 10) << endl;
    cout << "Template Add double: " << add(5.5, 2.2) << endl;
    return 0;
}

/*
❓ Questions
What happens if recursion has no base case?
Difference: recursion vs iteration
Template instantiation time?
*/
