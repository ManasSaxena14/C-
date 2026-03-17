#include <iostream>
using namespace std;

void basicExample() {
    cout << "--- 1. Basic Do-While Example ---" << endl;
    int i = 1;

    do
    {
        cout << i << endl;
        i++;
    }
    while(i <= 5);
}

void gateTrickyConcepts() {
    cout << "\n--- 2. GATE Tricky Concepts ---" << endl;
    
    cout << "1. Runs at least once" << endl;
    int i1 = 0;
    do
    {
        cout << i1;
    }
    while(i1 > 0);
    cout << endl << "Output: 0\n" << endl;

    cout << "2. Semicolon Mistake (VERY IMPORTANT)" << endl;
    cout << "Correct: do { ... } while(0);" << endl;
    cout << "ERROR: do { ... } while(0) (missing ;)" << endl;

    cout << "\n3. Infinite Loop" << endl;
    cout << "do { cout << \"Hi\"; } while(1);" << endl;
    cout << "-> Infinite loop" << endl;
}

void gateLevelQuestions() {
    cout << "\n--- 3. GATE LEVEL QUESTIONS ---" << endl;
    
    cout << "Q1:" << endl;
    int i1 = 0;
    do
    {
        cout << i1;
        i1++;
    }
    while(i1 < 3);
    cout << endl << "Answer: 012\n" << endl;

    cout << "Q2:" << endl;
    int i2 = 5;
    do
    {
        cout << i2;
        i2--;
    }
    while(i2 > 5);
    cout << endl << "Answer: 5\n-> runs once only\n" << endl;

    cout << "Q3 (Tricky):" << endl;
    int i3 = 0;
    do
    {
        cout << i3;
    }
    while(i3++);
    cout << endl << "Dry Run:" << endl;
    cout << "i=0 -> print 0\ncondition: i++ -> returns 0 -> false -> stop" << endl;
    cout << "Answer: 0\n" << endl;

    cout << "Q4 (Very Important):" << endl;
    int i4 = 1;
    do
    {
        cout << i4;
        i4 = i4 + 2;
    }
    while(i4 < 5);
    cout << endl << "Answer: 13\n" << endl;

    cout << "Q5 (GATE Logic):" << endl;
    int i5 = 0;
    do
    {
        if(i5 == 2)
            break;

        cout << i5;
        i5++;
    }
    while(i5 < 5);
    cout << endl << "Answer: 01\n" << endl;
}

int main()
{
    basicExample();
    gateTrickyConcepts();
    gateLevelQuestions();

    return 0;
}
