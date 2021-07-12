import { SystemOrQueuing, TypeCalculate } from '../Constants';
import { Division, Factorial, Power } from './../../../utils/MathUtils';

export class MM1MMModel {
  // basic values
  readonly lambda: number;
  readonly miu: number;
  readonly m: number;
  readonly n: number;
  // results
  p0: number = 0;
  pe: number = 0;

  pn: number = 0;
  lq: number = 0;
  l: number = 0;
  wq: number = 0;
  w: number = 0;
  wn: number = 0;
  ln: number = 0;

  constructor(lambda: number, miu: number, m: number, n: number = 0) {
    this.lambda = lambda;
    this.miu = miu;
    this.m = m;
    this.n = n;
  }

  async calculateAll(
    system: SystemOrQueuing = SystemOrQueuing.System,
    typeCalculate: TypeCalculate = TypeCalculate.Fixed,
  ): Promise<void> {
    this.p0 = this.getP0();
    this.pe = 1 - this.p0;
    this.pn = this.getPn(system, typeCalculate);
    this.l = this.getL();
    this.lq = this.getLq();
    this.ln = this.getLn();

    this.wq = this.getWq();
    this.w = this.getW();
    this.wn = this.getWn();
  }

  // The probability P0 of finding the empty or idle system
  private getP0(): number {
    let sum = this.summationForP0();
    return Division(1, sum);
  }

  private summationForP0(): number {
    let value = 0;
    for (let n = 0; n <= this.m; n++) {
      // M!
      let mFact = Factorial(this.m);
      // (M - n)!
      let susFact = Factorial(this.m - n);
      // M!/(M - n)!
      let item1 = Division(mFact, susFact);

      // (lambda/miu)^n
      let item2 = Power(Division(this.lambda, this.miu), n);
      let val = item1 * item2;
      value += val;
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
        return this.basicPn(this.n + 1);
      }

      // max Queuing
      if (typeCalculate === TypeCalculate.Max) {
        let value = 0;
        let end = this.n + 1;
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
    // M!
    let mFact = Factorial(this.m);
    // (M - n)!
    let susFact = Factorial(this.m - n);
    // M!/(M - n)!
    let item1 = Division(mFact, susFact);

    // (lambda/miu)^n
    let item2 = Power(Division(this.lambda, this.miu), n);
    return item1 * item2;
  }

  // The expected number L of clients in the system
  private getL(): number {
    // miu/lambda
    let div = Division(this.miu, this.lambda);
    // 1 - P0
    let sus = 1 - this.p0;
    // (miu/lambda)*(1 - P0)
    let item2 = div * sus;
    // M - (miu/lambda)*(1 - P0)
    return this.m - item2;
  }

  // The expected number Lq of clients in the queue
  private getLq(): number {
    // (lambda + miu)/lambda
    let div = Division(this.lambda + this.miu, this.lambda);
    // 1 - P0
    let sus = 1 - this.p0;
    // (miu/lambda)*(1 - P0)
    let item2 = div * sus;
    // M - (miu/lambda)*(1 - P0)
    return this.m - item2;
  }

  // The expected number Ln of clients in the non-empty queue
  private getLn(): number {
    // Lq/Pe
    return Division(this.lq, this.pe);
  }

  // The expected time Wq in the queue by the clients
  private getWq(): number {
    // (M - L)lambda
    let denominator = (this.m - this.l) * this.lambda;
    // Lq / (M - L)lambda
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
