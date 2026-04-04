# Intergrade

cato:learn
labels:
- math
- Intergrade

## Derivative
导数的定义是函数在某一点处的瞬时变化率，数学表达式为 f'(x) = lim(h→0) [f(x+h) - f(x)] / h。

## 微积分第三换元公式
∫f(x)dx = ∫f(φ(t))φ'(t)dt'

## 分部积分法


e.g.
The integral of $\ln x$ with respect to $x$ is found using integration by parts.

**Step 1:** Recall the integration by parts formula:  
$$
\int u \, dv = uv - \int v \, du
$$

**Step 2:** Choose $u$ and $dv$:  
Let $u = \ln x$ and $dv = dx$.

**Step 3:** Compute $du$ and $v$:  
$du = \frac{1}{x} \, dx$  
$v = x$

**Step 4:** Apply the formula:  
$$
\int \ln x \, dx = x \ln x - \int x \cdot \frac{1}{x} \, dx
$$

**Step 5:** Simplify the remaining integral:  
$$
\int x \cdot \frac{1}{x} \, dx = \int 1 \, dx = x
$$

**Step 6:** Combine results:  
$$
\int \ln x \, dx = x \ln x - x + C
$$

where $C$ is the constant of integration.

$$
\boxed{x\ln x - x + C}
$$


