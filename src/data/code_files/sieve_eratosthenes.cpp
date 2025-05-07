// Basic Sieve of Eratosthenes to find all primes up to n
// Assumes 'vector' is available.
vector<bool> sieveEratosthenes(int n) {
    vector<bool> is_prime(n + 1, true);
    if (n >= 0) is_prime[0] = false;
    if (n >= 1) is_prime[1] = false;

    for (int p = 2; p * p <= n; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= n; i += p)
                is_prime[i] = false;
        }
    }
    return is_prime;
}

// -----------------------------

// Simple Example: Count primes up to n
int countPrimesUpToN(int n) {
    if (n < 2) return 0;
    vector<bool> primes_bool = sieveEratosthenes(n);
    int count = 0;
    for (int p = 2; p <= n; p++) {
        if (primes_bool[p]) {
            count++;
        }
    }
    return count;
}
/*
Example Usage for countPrimesUpToN:
int limit = 30;
int num_primes = countPrimesUpToN(limit); // num_primes will be 10 (2,3,5,7,11,13,17,19,23,29)
*/

// -----------------------------

// "Complicated" Example: Sieve for prime factorization precomputation (Smallest Prime Factor - SPF)
// Stores the smallest prime factor for each number up to n.
// This can then be used to quickly find prime factors of any number up to n.
vector<int> sieveSmallestPrimeFactor(int n) {
    vector<int> spf(n + 1);
    for (int i = 0; i <= n; i++) {
        spf[i] = i; // Initialize spf[i] = i
    }

    for (int p = 2; p * p <= n; p++) {
        if (spf[p] == p) { // p is prime
            for (int i = p * p; i <= n; i += p) {
                if (spf[i] == i) { // Only update if not already updated by a smaller prime
                    spf[i] = p;
                }
            }
        }
    }
    return spf;
}

// Function to get prime factorization of a number x using precomputed SPF
vector<int> getPrimeFactorizationUsingSPF(int x, const vector<int>& spf) {
    vector<int> factors;
    if (x <= 1 || x >= spf.size()) return factors; // Basic check

    while (x != 1 && x < spf.size() && spf[x] > 1) {
        factors.push_back(spf[x]);
        x /= spf[x];
    }
    if (x > 1 && x < spf.size() && spf[x] == x) { // If x is prime itself and was not covered by loop if x > sqrt(n)
        factors.push_back(x);
    } else if (x > 1 && x >= spf.size()){ // If x is a large prime not covered by spf table
         // This case means x is a prime larger than sqrt(original n of sieve)
         // or x is too large for the precomputed spf table.
         // For this example, we'll assume x is within spf bounds or is handled if it's prime.
         // A more robust solution for any x would require trial division for remaining x.
         // However, for typical use of SPF, x is expected to be within the sieve range.
         // If the remaining x is prime and > 1, it's a factor.
         // This check is simplified; a full factorization might need more.
         if (x > 1) factors.push_back(x); // Assuming remaining x is prime if > 1
    }
    return factors;
}
/*
Example Usage for sieveSmallestPrimeFactor and getPrimeFactorizationUsingSPF:
int limit_spf = 100;
vector<int> spf_array = sieveSmallestPrimeFactor(limit_spf);

vector<int> factors_of_12 = getPrimeFactorizationUsingSPF(12, spf_array); // {2, 2, 3}
vector<int> factors_of_30 = getPrimeFactorizationUsingSPF(30, spf_array); // {2, 3, 5}
vector<int> factors_of_97 = getPrimeFactorizationUsingSPF(97, spf_array); // {97} (prime)
*/