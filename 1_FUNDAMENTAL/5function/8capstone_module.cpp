/*
🚀 CAPSTONE MODULE (GATE LEVEL)
🧩 Problem: Generic Math Toolkit

Build:

Template function for:
add, multiply
Recursive factorial
Lambda for filtering
Functor for sorting
*/

#include <bits/stdc++.h>
using namespace std;

template <typename T>
T add(T a, T b) { return a + b; }

int fact(int n) {
    if (n == 0) return 1;
    return n * fact(n - 1);
}

int main() {
    vector<int> v = {1,2,3,4};

    // lambda
    auto even = [](int x){ return x % 2 == 0; };

    for(int x : v)
        if(even(x)) cout << x << " ";
        
    return 0;
}
