/*
🔹 4. Lambda, Function Objects, std::function
🧠 Concept
🔸 Lambda Function

Anonymous function

🔸 Function Object (Functor)

Class with operator()

🔸 std::function

Stores any callable
*/

#include <iostream>
#include <functional>
using namespace std;

// Functor
class Add {
public:
    int operator()(int a, int b) {
        return a + b;
    }
};

int main() {
    // Lambda
    auto sum = [](int a, int b) { return a + b; };
    cout << "Lambda Sum: " << sum(2, 3) << endl;

    // Functor instance
    Add addObj;
    cout << "Functor Sum: " << addObj(4, 5) << endl;

    // std::function
    std::function<int(int,int)> f = sum;
    cout << "std::function Sum: " << f(6, 7) << endl;

    return 0;
}

/*
❓ Questions
Capture by value vs reference?
Why use std::function?
Difference: lambda vs normal function?
*/
