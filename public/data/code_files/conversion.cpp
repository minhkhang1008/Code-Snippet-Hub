string conversion(int n, int b) {
    string s = "";
    while(n > 0) {
        char c;
        int r = n % b;
        if(r < 10) c = '0' + r;
        else c = 'A' + (r-10);
        s += c;
        n /= b;
    }
    reverse(s.begin(), s.end());
    return s;
}