#include <iostream>
using namespace std;

int main()
{
    int a = 5;
    float b = 2.5f;
    double result;

    result = a + b;   // implicit typecasting (int → float)

    cout << "Result: " << result << endl;

    int c = (int)b;   // explicit typecasting

    cout << "Converted value: " << c << endl;

    return 0;
}

/*
Output:
Result: 7.5
Converted value: 2
*/
