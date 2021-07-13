import { MMKModel } from './../formulas/MMK.model';
import { Division } from './../../../utils/MathUtils';

export class CostMMK {
  readonly mmk: MMKModel;
  readonly time: number;

  ctte: number = 0;
  ctts: number = 0;
  cttse: number = 0;
  cts: number = 0;
  ct: number = 0;
  //
  ctExercise: number = 0;

  constructor(mmk: MMKModel, time: number) {
    this.mmk = mmk;
    this.time = time;
  }

  calculateExercise(cs: number, cts: number) {
    this.ctExercise = this.mmk.lambda * this.time * cts + this.mmk.k * cs;
  }

  calculateAll(cte: number, cts: number, ctse: number, cs: number) {
    this.ctte = this.calculateCTTE(cte);
    this.ctts = this.calculateCTTS(cts);
    this.cttse = this.calculateCTTSE(ctse);
    this.cts = this.calculateCTS(cs);
    this.ct = this.calculateCT();
  }

  calculateCTTE(cte: number) {
    return this.mmk.lambda * this.time * this.mmk.wq * cte;
  }

  calculateCTTS(cts: number) {
    return this.mmk.lambda * this.time * this.mmk.w * cts;
  }

  calculateCTTSE(ctse: number) {
    return this.mmk.lambda * this.time * Division(1, this.mmk.miu) * ctse;
  }

  calculateCTS(cs: number) {
    return this.mmk.n * cs;
  }

  calculateCT() {
    return this.ctte + this.ctts + this.cttse + this.cts;
  }
}
