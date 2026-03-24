/*
🔹 5. Scope, Lifetime, Linkage
🧠 Concept
🔸 Scope

Where variable is accessible

🔸 Lifetime

How long variable exists

🔸 Linkage

Visibility across files

static → internal linkage
extern → external linkage
*/

#include <iostream>
using namespace std;

int global = 10;

void func() {
    static int x = 0; // persists
    x++;
    cout << "Static x: " << x << endl;
}

int main() {
    func();
    func();
    func();
    return 0;
}

/*
❓ Questions
Difference: static local vs global?
What is linkage?
Lifetime of local variable?
*/
