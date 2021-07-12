import { SystemOrQueuing, TypeCalculate } from '../Constants';
import { Division, Factorial, Power } from './../../../utils/MathUtils';

export class MMKMMModel {
  // basic values
  readonly lambda: number;
  readonly miu: number;
  readonly m: number;
  readonly k: number;
  readonly n: number;
  // results
  p0: number = 0;
  pe: number = 0;
  pne: number = 0;

  pn: number = 0;
  lq: number = 0;
  l: number = 0;
  wq: number = 0;
  w: number = 0;
  wn: number = 0;
  ln: number = 0;

  constructor(
    lambda: number,
    miu: number,
    k: number,
    m: number,
    n: number = 0,
  ) {
    this.lambda = lambda;
    this.miu = miu;
    this.k = k;
    this.m = m;
    this.n = n;
  }

  isMultichannel(): boolean {
    return this.k > 1;
  }

  async calculateAll(
    system: SystemOrQueuing = SystemOrQueuing.System,
    typeCalculate: TypeCalculate = TypeCalculate.Fixed,
  ): Promise<void> {
    this.p0 = this.getP0();
    this.pn = this.getPn(system, typeCalculate);
    this.pe = this.getPe();
    this.pne = 1 - this.pe;
    this.l = this.getL();
    this.lq = this.getLq();
    this.ln = this.getLn();
    this.wq = this.getWq();

    this.w = this.getW();
    this.wn = this.getWn();
  }

  // The probability P0 of finding the empty or idle system
  private getP0(): number {
    // summation
    let summation1 = this.summation1ForP0();
    let summation2 = this.summation2ForP0();

    return Division(1, summation1 + summation2);
  }

  private summation1ForP0(): number {
    let value = 0;
    for (let n = 0; n <= parseInt(this.k.toString()) - 1; n++) {
      // M!
      let fact = Factorial(this.m);
      // (M - n)!
      let subItem1 = Factorial(this.m - n);
      // n!
      let subItem2 = Factorial(n);
      // (M - n)!n!
      let denominator = subItem1 * subItem2;
      // M! / (M - n)!n!
      let item1 = Division(fact, denominator);

      // (lambda/miu)^n
      let div = Division(this.lambda, this.miu);
      let item2 = Power(div, n);

      let operation = item1 * item2;
      value += operation;
    }
    return value;
  }

  private summation2ForP0(): number {
    let value = 0;
    for (let n = this.k; n <= this.m; n++) {
      // M!
      let fact = Factorial(this.m);
      // (M - n)!
      let subItem1 = Factorial(this.m - n);
      // k!
      let subItem2 = Factorial(this.k);
      // k^n-k
      let subItem3 = Power(this.k, n - this.k);
      // (M - n)!k!k^n-k
      let denominator = subItem1 * subItem2 * subItem3;
      // M! / (M - n)!k!k^n-k
      let item1 = Division(fact, denominator);

      // (lambda/miu)^n
      let div = Division(this.lambda, this.miu);
      let item2 = Power(div, n);

      let operation = item1 * item2;
      value += operation;
    }
    return value;
  }

  // The probability Pn of finding exactly n customers in the system
  private getPn(system: SystemOrQueuing, typeCalculate: TypeCalculate): number {
    // Calculate Pn to finding client on System
    if (system === SystemOrQueuing.System) {
      // fixed SYSTEM
      if (typeCalculate === TypeCalculate.Fixed) {
        return this.basicPn(this.n);
      }

      // max SYSTEM
      if (typeCalculate === TypeCalculate.Max) {
        let value = 0;
        for (let i = 0; i <= this.n; i++) {
          value += this.basicPn(i);
          // console.log('MAX SYSTEM', value, i);
        }
        return value;
      }

      // at least SYSTEM
      if (typeCalculate === TypeCalculate.AtLeast) {
        let value = 0;
        for (let i = 0; i < this.n; i++) {
          value += this.basicPn(i);
        }
        return 1 - value;
      }
    }
    // Calculate Pn to finding client on Queuing
    if (system === SystemOrQueuing.Queuing) {
      // fixed Queuing
      if (typeCalculate === TypeCalculate.Fixed) {
        return this.basicPn(this.n + this.k);
      }

      // max Queuing
      if (typeCalculate === TypeCalculate.Max) {
        let value = 0;
        let end = this.n + this.k;
        for (let i = 0; i <= end; i++) {
          value += this.basicPn(i);
        }
        return value;
      }

      // at least Queuing
      if (typeCalculate === TypeCalculate.AtLeast) {
        let value = 0;
        for (let i = 0; i <= this.n; i++) {
          value += this.basicPn(i);
        }
        return 1 - value;
      }
    }

    return 0;
  }

  private basicPn(n: number): number {
    if (0 <= n && n < this.k) {
      return this.calculatePnWhenNLessK(n);
    } else {
      return this.calculatePnWhenNHigherK(n);
    }
  }

  private calculatePnWhenNLessK(n: number): number {
    // M!
    let fact = Factorial(this.m);
    // (M - n)!
    let subItem1 = Factorial(this.m - n);
    // n!
    let subItem2 = Factorial(n);
    // (M - n)!n!
    let denominator = subItem1 * subItem2;
    // M! / (M - n)!n!
    let item1 = Division(fact, denominator);

    // (lambda/miu)^n
    let div = Division(this.lambda, this.miu);
    let item2 = Power(div, n);

    return this.p0 * item1 * item2;
  }

  private calculatePnWhenNHigherK(n: number): number {
    // M!
    let fact = Factorial(this.m);
    // (M - n)!
    let subItem1 = Factorial(this.m - n);
    // k!
    let subItem2 = Factorial(this.k);
    // k^n-k
    let subItem3 = Power(this.k, n - this.k);
    // (M - n)!k!k^n-k
    let denominator = subItem1 * subItem2 * subItem3;
    // M! / (M - n)!k!k^n-k
    let item1 = Division(fact, denominator);

    // (lambda/miu)^n
    let div = Division(this.lambda, this.miu);
    let item2 = Power(div, n);

    return this.p0 * item1 * item2;
  }

  // The probability Pe of finding the system busy
  private getPe(): number {
    let value = 0;
    for (let n = this.k; n <= this.m; n++) {
      value += this.basicPn(n);
    }
    return value;
  }

  // The expected number L of clients in the system
  private getL(): number {
    let sum1 = this.summation1ForL();
    let sum2 = this.summation2ForL();
    let sum3 = this.summation3ForL();
    return sum1 + sum2 + sum3;
  }

  summation1ForL(): number {
    let value = 0;
    let end = this.k - 1;
    for (let n = 0; n <= end; n++) {
      // n*Pn
      let operation = n * this.basicPn(n);
      value += operation;
    }
    return value;
  }

  summation2ForL(): number {
    let value = 0;
    for (let n = this.k; n <= this.m; n++) {
      // n - k
      let item1 = n - this.k;
      // Pn
      let item2 = this.basicPn(n);
      // (n - k) *Pn
      let operation = item1 * item2;
      value += operation;
    }
    return value;
  }

  summation3ForL(): number {
    let value = 0;
    let end = this.k - 1;
    for (let n = 0; n <= end; n++) {
      value += this.basicPn(n);
    }
    // 1 - sum(Pn)
    let item1 = 1 - value;
    // k * (1 - sum(Pn))
    return this.k * item1;
  }

  // The expected number Lq of clients in the queue
  private getLq(): number {
    let value = 0;
    for (let n = this.k; n <= this.m; n++) {
      // n - k
      let item1 = n - this.k;
      // Pn
      let item2 = this.basicPn(n);
      // (n - k) * Pn
      let operation = item1 * item2;
      value += operation;
    }
    return value;
  }

  // The expected number Ln of clients in the non-empty queue
  private getLn(): number {
    return Division(this.lq, this.pe);
  }

  // The expected time Wq in the queue by the clients
  private getWq(): number {
    // (M - L) * lambda
    let denominator = (this.m - this.l) * this.lambda;
    return Division(this.lq, denominator);
  }

  // The expected average time W in the system by the clients
  private getW(): number {
    // 1 / miu
    let item2 = Division(1, this.miu);
    // Wq + (1 / miu)
    return this.wq + item2;
  }

  // The expected time Wn in the queue for queues not empty by clients
  private getWn(): number {
    return Division(this.wq, this.pe);
  }
}
