/*
🔹 2. Function Overloading, Inline, constexpr
🧠 Concept
🔸 Function Overloading

Same function name, different parameters.

🔸 Inline Function
Suggests compiler to replace function call with code
Reduces overhead (not guaranteed)
🔸 constexpr
Evaluated at compile time
Must return constant expression
*/

#include <iostream>

// Overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Inline
inline int square(int x) {
    return x * x;
}

// constexpr
constexpr int cube(int x) {
    return x * x * x;
}

int main() {
    std::cout << "Overload int: " << add(2, 3) << std::endl;
    std::cout << "Overload double: " << add(2.5, 3.5) << std::endl;
    std::cout << "Inline square: " << square(5) << std::endl;
    std::cout << "Constexpr cube: " << cube(3) << std::endl;
    return 0;
}

/*
❓ Questions
Can functions be overloaded by return type only? ❌
Difference: inline vs macro?
When is constexpr evaluated?
*/
