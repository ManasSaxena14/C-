#include <iostream>
using namespace std;

/**
 * CONDITIONAL STATEMENTS IN C++
 * Used for decision making based on conditions.
 */

void gradeCalculation() {
    cout << "--- 1. Conditional Statement (Grade Calculation) ---" << endl;
    int marks = 85;

    if(marks >= 90)
        cout << "Grade A";
    else if(marks >= 75)
        cout << "Grade B";
    else if(marks >= 50)
        cout << "Grade C";
    else
        cout << "Fail";
    
    cout << endl;
    /*
    OUTPUT:
    Grade B
    */
}

void nestedIfElse() {
    cout << "\n--- 2. Nested If-Else (Age Verification) ---" << endl;
    int age = 20;

    if(age >= 18)
    {
        if(age >= 21)
            cout << "Eligible for driving + drinking";
        else
            cout << "Only driving allowed";
    }
    
    cout << endl;
    /*
    OUTPUT:
    Only driving allowed
    */
}

void ternaryOperator() {
    cout << "\n--- 3. Ternary Operator (GATE Important) ---" << endl;
    cout << "Short form of if-else" << endl;
    cout << "Syntax: (condition) ? value1 : value2;" << endl;

    int a = 10, b = 20;
    int max = (a > b) ? a : b;

    cout << "Max = " << max << endl;
    /*
    OUTPUT:
    Max = 20
    */
}

void gateConcepts() {
    cout << "\n--- 4. GATE Important Concepts ---" << endl;
    
    cout << "Zero = False" << endl;
    if(0) {
        // Never runs
    } else {
        cout << "if(0) never runs" << endl;
    }

    cout << "Non-zero = True" << endl;
    if(5) {
        cout << "if(5) always runs" << endl;
    }
}

void combinedExample() {
    cout << "\n--- 5. Combined Example (GATE Level Thinking) ---" << endl;
    int a = 0, b = 5;

    if(a && b/a > 1)
        cout << "Yes";
    else
        cout << "No";
    
    cout << endl;
    /*
    OUTPUT:
    No
    Reason: Because a = 0 -> condition false -> second part (b/a) skipped due to short-circuiting.
    No division by zero error occurs!
    */
}

int main() {
    gradeCalculation();
    nestedIfElse();
    ternaryOperator();
    gateConcepts();
    combinedExample();

    return 0;
}
