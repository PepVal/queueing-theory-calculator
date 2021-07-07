import { SystemOrQueuing, TypeCalculate } from '../Constants';
import { Division, Factorial, Power } from './../../../utils/MathUtils';

export class MMKModel {
  // basic values
  readonly lambda: number;
  readonly miu: number;
  readonly k: number;
  readonly m: number;
  readonly n: number;
  // results
  p0: number = 0;
  pk: number = 0;
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

  isStatable(): boolean {
    let denominator = this.k * this.miu;
    let condition = Division(this.lambda, denominator);
    return condition < 1;
  }

  async calculateAll(
    system: SystemOrQueuing = SystemOrQueuing.System,
    typeCalculate: TypeCalculate = TypeCalculate.Fixed,
  ): Promise<void> {
    this.p0 = this.getP0(); //
    this.pk = this.getPk(); //
    this.pne = 1 - this.pk; //
    this.pn = this.getPn(system, typeCalculate);
    this.l = this.getL();
    this.lq = this.getLq();
    this.ln = this.getLn();
    this.w = this.getW();
    this.wq = this.getWq();
    this.wn = this.getWn();
  }

  // The probability P0 of finding the empty or idle system
  private getP0(): number {
    // summation
    let summation = this.summationForP0();

    // (1/k!)
    let fact = Factorial(this.k);

    let subItem1 = Division(1, fact);

    // (lambda/miu)^k
    let div = Division(this.lambda, this.miu);
    let subItem2 = Power(div, this.k);

    // ((k*miu)/(k*miu-lambda))
    let numerator = this.k * this.miu;
    let denominator = this.k * this.miu - this.lambda;
    let subItem3 = Division(numerator, denominator);

    let item2 = subItem1 * subItem2 * subItem3;

    return Division(1, summation + item2);
  }

  private summationForP0(): number {
    let value = 0;
    for (let i = 0; i <= parseInt(this.k.toString()) - 1; i++) {
      // (1/n!)
      let fact = Factorial(i);
      let item1 = Division(1, fact);

      // (lambda/miu)^n
      let div = Division(this.lambda, this.miu);
      let poten = Power(div, i);

      let operation = item1 * poten;
      value += operation;
    }
    return value;
  }

  // The probability Pk that an arriving unit will have to wait
  private getPk(): number {
    // (1/k!)
    let item1 = Division(1, Factorial(this.k));

    // (lambda/miu)^k
    let item2 = Power(Division(this.lambda, this.miu), this.k);

    // ((k*miu)/(k*miu-lambda))
    let numerator = this.k * this.miu;
    let denominator = this.k * this.miu - this.lambda;
    let item3 = Division(numerator, denominator);

    // item1*item2*item3*P0
    return item1 * item2 * item3 * this.p0;
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
    if (n < this.k) {
      return this.calculatePnWhenNLessK(n);
    } else {
      return this.calculatePnWhenNHigherK(n);
    }
  }

  private calculatePnWhenNLessK(n: number): number {
    // (P0/n!)
    let item1 = Division(this.p0, Factorial(n));

    // (lambda/miu)^n
    let item2 = Power(Division(this.lambda, this.miu), n);

    // item1 * item2
    return item1 * item2;
  }

  private calculatePnWhenNHigherK(n: number): number {
    // (1/(k!(k)^n-k))
    let fact = Factorial(this.k);
    let pow = Power(this.k, n - this.k);
    let item1 = Division(1, fact * pow);

    // (lambda/miu)^n
    let item2 = Power(Division(this.lambda, this.miu), n);

    // item1*item2*P0
    return item1 * item2 * this.p0;
  }

  // The expected number L of clients in the system
  private getL(): number {
    // (lambda/miu)
    let lambdaDivMiu = Division(this.lambda, this.miu);

    // lambda*miu*((lambda/miu)^k)
    let pow = Power(lambdaDivMiu, this.k);
    let numerator = this.lambda * this.miu * pow;
    // (k-1)!(k*miu-lambda)^2
    let fact = Factorial(this.k - 1);
    let prod = this.k * this.miu - this.lambda;
    let square = Power(prod, 2);
    let denominator = fact * square;
    // numerator/denominator
    let subItem1 = Division(numerator, denominator);

    // subItem1*P0
    let item1 = subItem1 * this.p0;

    // item1+(lambda/miu)
    return item1 + lambdaDivMiu;
  }

  // The expected number Lq of clients in the queue
  private getLq(): number {
    // lambda*miu*((lambda/miu)^k)*P0
    let pow = Power(Division(this.lambda, this.miu), this.k);
    let numerator = this.lambda * this.miu * pow * this.p0;
    // (k-1)!(k*miu-lambda)^2
    let fact = Factorial(this.k - 1);
    let prod = this.k * this.miu - this.lambda;
    let square = Power(prod, 2);
    let denominator = fact * square;
    // numerator/denominator
    return Division(numerator, denominator);
  }

  // The expected number Ln of clients in the non-empty queue
  private getLn(): number {
    return Division(this.lq, this.pk);
  }

  // The expected average time W in the system by the clients
  private getW(): number {
    // miu*((lambda/miu)^k)*P0
    let pow = Power(Division(this.lambda, this.miu), this.k);
    let numerator = this.miu * pow * this.p0;
    // (k-1)!(k*miu-lambda)^2
    let fact = Factorial(this.k - 1);
    let prod = this.k * this.miu - this.lambda;
    let square = Power(prod, 2);
    let denominator = fact * square;
    // numerator/denominator
    let item1 = Division(numerator, denominator);

    // (1/miu)
    let item2 = Division(1, this.miu);

    // item1+item2
    return item1 + item2;
  }

  // The expected time Wq in the queue by the clients
  private getWq(): number {
    // miu*((lambda/miu)^k)*P0
    let pow = Power(Division(this.lambda, this.miu), this.k);
    let numerator = this.miu * pow * this.p0;
    // (k-1)!(k*miu-lambda)^2
    let fact = Factorial(this.k - 1);
    let prod = this.k * this.miu - this.lambda;
    let square = Power(prod, 2);
    let denominator = fact * square;
    // numerator/denominator
    return Division(numerator, denominator);
  }

  // The expected time Wn in the queue for queues not empty by clients
  private getWn(): number {
    return Division(this.wq, this.pk);
  }
}
