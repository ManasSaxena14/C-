#include <iostream>
using namespace std;

void basicExample() {
    cout << "--- 1. Basic For Loop ---" << endl;
    for(int i = 1; i <= 5; i++)
    {
        cout << i << endl;
    }
}

void variations() {
    cout << "\n--- 2. Variations (GATE IMPORTANT) ---" << endl;
    cout << "[Infinite loop]" << endl;
    cout << "for(;;) {\n    cout << \"Hello\";\n}" << endl;
    
    cout << "\n[Multiple variables]" << endl;
    for(int i=0, j=5; i<j; i++, j--)
    {
        cout << i << " " << j << endl;
    }

    cout << "\n[Missing parts]" << endl;
    int i = 0;
    for(; i < 3; )
    {
        cout << i;
        i++;
    }
    cout << endl;
}

void gateQuestions() {
    cout << "\n--- 3. GATE Level Questions ---" << endl;
    
    cout << "Q1 (Classic GATE):" << endl;
    int i1;
    for(i1 = 0; i1 < 5; i1++);
    {
        cout << i1;
    }
    cout << endl << "Answer: 5" << endl;
    cout << "-> ; after loop -> loop runs empty" << endl;
    cout << "-> next block runs once\n" << endl;

    cout << "Q2 (Tricky Increment):" << endl;
    int i2 = 0;
    for(; i2 < 3; )
    {
        cout << i2;
        i2++;
    }
    cout << endl << "Answer: 012\n" << endl;

    cout << "Q3 (Pre vs Post Increment):" << endl;
    // int i3;
    // for(i3 = 0; i3 < 3; i3++) { cout << i3++; }
    int i3;
    for(i3 = 0; i3 < 3; i3++)
    {
        cout << i3++;
    }
    cout << endl << "Dry Run:" << endl;
    cout << "i=0 -> print 0 -> i becomes 1 -> loop increment -> i=2" << endl;
    cout << "i=2 -> print 2 -> i becomes 3 -> loop increment -> i=4 -> stop" << endl;
    cout << "Answer: 02\n" << endl;

    cout << "Q4 (Multiple Updates):" << endl;
    int i4, j4;
    for(i4 = 0, j4 = 5; i4 < j4; i4++, j4--)
    {
        cout << i4 << j4;
    }
    cout << endl << "Dry Run:" << endl;
    cout << "i=0 j=5 -> print 05" << endl;
    cout << "i=1 j=4 -> print 14" << endl;
    cout << "i=2 j=3 -> print 23" << endl;
    cout << "stop" << endl;
    cout << "Answer: 051423\n" << endl;

    cout << "Q5 (PYQ Style - Logic):" << endl;
    int i5, sum = 0;
    for(i5 = 1; i5 <= 5; i5++)
    {
        if(i5 % 2 == 0)
            continue;
        sum += i5;
    }
    cout << sum << endl;
    cout << "Dry Run:" << endl;
    cout << "i=1 -> sum=1\ni=2 -> skip\ni=3 -> sum=4\ni=4 -> skip\ni=5 -> sum=9" << endl;
    cout << "Answer: 9\n" << endl;
}

void gateConcepts() {
    cout << "--- 4. VERY IMPORTANT GATE CONCEPTS ---" << endl;
    cout << "1. Semicolon after for:\n   for(i=0;i<5;i++);\n   -> loop does nothing\n   -> next block runs once\n" << endl;
    cout << "2. Loop runs even if body empty:\n   for(i=0;i<5;i++);\n" << endl;
    cout << "3. Multiple expressions allowed:\n   for(i=0,j=5; i<j; i++, j--)\n" << endl;
    cout << "4. continue skips iteration\n" << endl;
    cout << "5. break stops loop\n" << endl;
}

int main()
{
    basicExample();
    variations();
    gateQuestions();
    gateConcepts();

    return 0;
}
