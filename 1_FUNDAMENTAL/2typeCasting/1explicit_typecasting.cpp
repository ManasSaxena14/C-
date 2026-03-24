/*
Explicit Typecasting (Manual)
👉 Done manually by the programmer using type conversion syntax.
*/

#include <iostream>
using namespace std;

int main()
{
    float x = 9.8f;
    int y;

    y = (int)x;   // explicit typecasting (float → int)

    cout << "Value of x: " << x << endl;
    cout << "Value of y: " << y << endl;

    return 0;
}

/*
Output:
Value of x: 9.8
Value of y: 9
*/
