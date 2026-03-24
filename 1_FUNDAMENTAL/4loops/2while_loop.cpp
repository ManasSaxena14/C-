#include <iostream>
using namespace std;

void basicExample() {
    cout << "--- 1. Basic While Loop ---" << endl;
    int i = 1;

    while(i <= 5)
    {
        cout << i << endl;
        i++;
    }
}

void commonMistake() {
    cout << "\n--- 2. Common Mistake (VERY IMPORTANT) ---" << endl;
    cout << "Missing increment -> Infinite loop" << endl;
    /*
    int i = 1;
    while(i <= 5)
    {
        cout << i;
    }
    // Infinite loop
    */
}

void gateQuestions() {
    cout << "\n--- 3. GATE Level Questions ---" << endl;
    
    cout << "Question 1:" << endl;
    int i1 = 0;
    while(i1 < 3)
    {
        cout << i1;
        i1++;
    }
    cout << endl << "Output: 012\n" << endl;

    cout << "Question 2:" << endl;
    int i2 = 5;
    while(i2 > 0)
    {
        cout << i2;
        i2--;
    }
    cout << endl << "Output: 54321\n" << endl;

    cout << "Question 3 (IMPORTANT):" << endl;
    int i3 = 1;
    while(i3 <= 5)
    {
        cout << i3;
        i3 = i3 + 2;
    }
    cout << endl << "Output: 135\n" << endl;

    cout << "Question 4 (Tricky):" << endl;
    int i4 = 0;
    while(i4++)
    {
        cout << i4;
    }
    // 0 is false, so it doesn't enter the loop, but i becomes 1 after check
    cout << "(No output)" << endl;
    cout << "-> Because i++ returns 0 first -> false -> loop not executed\n" << endl;

    cout << "Question 5 (VERY IMPORTANT):" << endl;
    int i5 = 0;
    while(++i5 < 3)
    {
        cout << i5;
    }
    cout << endl << "Output: 12" << endl;
    cout << "-> Pre-increment used" << endl;
}

void gateConceptTruthValues() {
    cout << "\n--- 4. GATE Concept: Truth Values ---" << endl;
    cout << "0 -> false" << endl;
    cout << "non-zero -> true" << endl;
    cout << "Example: while(5) -> Infinite loop" << endl;
}

void combinedExample() {
    cout << "\n--- 5. Combined Example ---" << endl;
    int i = 1;
    int sum = 0;

    while(i <= 5)
    {
        sum = sum + i;
        i++;
    }

    cout << "Sum = " << sum << endl;
}

int main()
{
    basicExample();
    commonMistake();
    gateQuestions();
    gateConceptTruthValues();
    combinedExample();

    return 0;
}
