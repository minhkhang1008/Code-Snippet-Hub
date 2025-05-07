int LIS() {
    int h[n];
    for(int i = 0; i < n; i++) cin >> h[i];
    vector<int>tail;
    for(int x : h) {
        auto it = lower_bound(tail.begin(), tail.end(), x);
        if(it == tail.end()) tail.push_back(x);
        else *it = x;
    }
    return tail.size();
}
