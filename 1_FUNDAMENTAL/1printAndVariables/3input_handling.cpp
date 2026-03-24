#include <iostream>
using namespace std;

int main() {

    int rollNumber;
    char section;
    float marks;
    bool placementReady;
    double cgpa;

    cout << "Enter Roll Number : ";
    cin >> rollNumber;

    cout << "Enter Section : ";
    cin >> section;

    cout << "Enter Marks : ";
    cin >> marks;

    cout << "Placement Ready (1 for Yes / 0 for No) : ";
    cin >> placementReady;

    cout << "Enter CGPA : ";
    cin >> cgpa;

    cout << endl;

    cout << "You entered Roll Number = " << rollNumber << endl;
    cout << "You entered Section = " << section << endl;
    cout << "You entered Marks = " << marks << endl;
    cout << "Placement Ready = " << placementReady << endl;
    cout << "You entered CGPA = " << cgpa << endl;

    return 0;
}

/*
OUTPUT
Enter Roll Number : 101
Enter Section : B
Enter Marks : 89.5
Placement Ready (1 for Yes / 0 for No) : 1
Enter CGPA : 9.23

You entered Roll Number = 101
You entered Section = B
You entered Marks = 89.5
Placement Ready = 1
You entered CGPA = 9.23
*/
