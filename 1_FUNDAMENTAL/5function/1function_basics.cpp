/*
1. Function Basics
🧠 Concept (Short & Clear)
A function is a reusable block of code.
It has:
Return type
Name
Parameters
Body

👉 C++ supports pass by value and pass by reference
*/

#include <iostream>
using namespace std;

// function declaration
int add(int a, int b);

/*
// This was given in the first example
int main() {
    cout << add(2, 3);
}

// function definition
int add(int a, int b) {
    return a + b;
}
*/

/*
🎯 Key Variations
// Pass by value
void fun(int x) { x = 10; }

// Pass by reference
void fun(int &x) { x = 10; }

❓ GATE/Interview Questions
Difference between call by value vs reference?
What happens if return type mismatches?
Can main() call a function defined later? (→ YES, via declaration)
--> ANSWER ALL THE QUESTIONS 

Correct Code (Fixed + Complete)
*/

// function definition
int printHello() {
    cout << "hello\n";
    return 3;
}

int main() {
    // function call
    cout << printHello() << endl;

    return 0;
}

/*
🧠 What Happens Internally

👉 When printHello() is called:

It prints:

hello
Then returns value 3
That returned value is printed by cout
📌 Final Output
hello
3
⚡ Important Concept (VERY IMPORTANT FOR GATE)

👉 This line:

cout << printHello() << endl;

Means:

First → function executes → prints "hello"
Then → returns 3
Then → cout prints 3
*/
