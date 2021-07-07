import { TypeCalculate, SystemOrQueuing } from '../Constants';
import { Division } from '../../../utils/MathUtils';

export interface MM1Type {
  lambda: number;
  miu: number;
  n: number;
  // results
  ro: number;
  p0: number;
  pn: number;
  lq: number;
  l: number;
  wq: number;
  w: number;
  wn: number;
  ln: number;
}

export class MM1Model {
  // basic values
  readonly lambda: number;
  readonly miu: number;
  readonly n: number;
  // results
  ro: number = 0;
  p0: number = 0;
  pn: number = 0;
  lq: number = 0;
  l: number = 0;
  wq: number = 0;
  w: number = 0;
  wn: number = 0;
  ln: number = 0;

  // constructor() {}

  constructor(lambda: number, miu: number, n: number = 0) {
    this.lambda = lambda;
    this.miu = miu;
    this.n = n;
  }

  isStatable(): boolean {
    return Division(this.lambda, this.miu) < 1;
  }

  async calculateAll(
    system: SystemOrQueuing = SystemOrQueuing.System,
    typeCalculate: TypeCalculate = TypeCalculate.Fixed,
  ): Promise<void> {
    // The probability of finding the busy system or system utilization (ρ)
    this.ro = Division(this.lambda, this.miu);
    this.p0 = this.getP0();
    this.pn = this.getPn(system, typeCalculate);
    this.lq = this.getLq();
    this.l = this.getL();
    this.w = this.getW();
    this.wq = this.getWq();
    this.wn = this.getWn();
    this.ln = this.getLn();
  }

  // The probability P0 of finding the empty or idle system
  private getP0(): number {
    // return parseFloat((1 - this.ro).toPrecision(PRECISION));
    return 1 - this.ro;
  }

  // The probability Pn of finding exactly n customers in the system
  private getPn(system: SystemOrQueuing, typeCalculate: TypeCalculate): number {
    // fixed
    if (typeCalculate === TypeCalculate.Fixed) {
      return this.basicPn(this.n);
    }
    // max
    if (typeCalculate === TypeCalculate.Max) {
      let value = 0;
      if (system === SystemOrQueuing.System) {
        for (let i = 0; i <= this.n; i++) {
          value += this.basicPn(i);
          // console.log('MAX SYSTEM', value, i);
        }
      } else {
        let end = this.n;
        end++;
        for (let i = 0; i <= end; i++) {
          value += this.basicPn(i);
          // console.log('MAX QUEUING', value, i);
        }
      }
      return value;
    }
    // at least with system or queuing
    if (system === SystemOrQueuing.System) {
      let value = 0;
      for (let i = 0; i < this.n; i++) {
        value += this.basicPn(i);
      }
      return 1 - value;
    } else {
      let value = 0;
      for (let i = 0; i <= this.n; i++) {
        value += this.basicPn(i);
      }
      return 1 - value;
    }
  }

  private basicPn(elevate: number): number {
    let div = Math.pow(this.ro, elevate);
    return this.p0 * div;
  }

  // The expected number Lq of clients in the queue
  private getLq(): number {
    let numerator = Math.pow(this.lambda, 2);
    let denominator = this.miu * (this.miu - this.lambda);
    return Division(numerator, denominator);
  }

  // The expected number L of clients in the system
  private getL(): number {
    let denominator = this.miu - this.lambda;
    return Division(this.lambda, denominator);
  }

  // The expected time Wq in the queue by the clients
  private getWq(): number {
    let denominator = this.miu * (this.miu - this.lambda);
    return Division(this.lambda, denominator);
  }

  // The expected average time W in the system by the clients
  private getW(): number {
    let denominator = this.miu - this.lambda;
    return Division(1, denominator);
  }

  // The expected number Ln of clients in the non-empty queue
  private getLn(): number {
    let denominator = this.miu - this.lambda;
    return Division(this.lambda, denominator);
  }

  // The expected time Wn in the queue for queues not empty by clients
  private getWn(): number {
    let denominator = this.miu - this.lambda;
    return Division(1, denominator);
  }
}
