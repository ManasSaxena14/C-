/*
🔹 7. Performance & Optimization
🧠 Key Ideas
Use inline for small functions
Avoid unnecessary copies → use const &
Prefer iteration over recursion (stack cost)
Use constexpr where possible
*/

#include <iostream>
#include <vector>
using namespace std;

void func(const vector<int>& v) { 
    // efficient pass-by-reference
    cout << "Vector size: " << v.size() << endl;
} 

int main() {
    vector<int> myVec = {1, 2, 3, 4, 5};
    func(myVec);
    return 0;
}

/*
❓ Questions
Why is pass-by-reference faster?
When does inline fail?
Stack overflow cause?
*/
