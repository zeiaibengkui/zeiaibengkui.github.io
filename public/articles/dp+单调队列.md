# 单调队列

cato:learn

labels

- programming
- algo
- oi

## 基本单调队列

用途：求a[]中每个区间长度为k中的极值  
时间复杂度：O(1)

```cpp
// e.g. get max of a[]
vector<int> a;
deque<int> q;// stores index of a
for(int i=0;i<a.size();i++){
    while(!q.empty() and a[q.back()]<a[i]) q.pop_back();
    q.push_back(i);
    while(!q.empty() and q.front()<=i-k) q.pop_front();
    if(i+1>=k) cout << q.front();
}
```

## 单调队列 优化 DP

1. 将 DP 转移方程写成形如 $dp[i] = max/min( dp[j] + w(j) ) + const(i)$，其中 j 的取值范围随 i 滑动。

2. 把只依赖 j 的部分（如 $dp[j] + w(j)$）看作“值”，用单调队列维护该值的极值，同时保证下标 j 在合法窗口内。

这样可将转移从 O(n²) 优化到 O(n)。

### Example

[CF372C](https://www.luogu.com.cn/problem/CF372C)  
[题解](https://www.luogu.com.cn/article/r656etrq)

time:2026-04-12
