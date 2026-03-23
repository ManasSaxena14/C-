/*
🔹 6. Common Pitfalls
⚠️ Mistakes

❌ Returning reference to local variable

int& fun() {
    int x = 10;
    return x; // WRONG
}

❌ Infinite recursion
❌ Function overloading ambiguity

❓ Questions
Why is returning local reference dangerous?
What causes ambiguity in overloading?
*/

#include <iostream>
using namespace std;

int main() {
    cout << "Review the common pitfalls in the comments above." << endl;
    return 0;
}
