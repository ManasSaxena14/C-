/* 
Implicit Typecasting (Automatic) 
👉 Done automatically by the compiler when converting smaller data type → larger data type.
*/

#include <iostream>
using namespace std;

int main()
{
    int a = 10;
    float b;

    b = a;   // implicit typecasting (int → float)

    cout << "Value of a: " << a << endl;
    cout << "Value of b: " << b << endl;

    return 0;
}
/* 
Output:
Value of a: 10
Value of b: 10
*/
