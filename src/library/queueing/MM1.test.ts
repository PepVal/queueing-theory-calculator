import { MM1Model } from './MM1.model';

describe('Test model M/M/1', () => {
  let lambda = 1;
  let miu = 3;
  let n = 5;
  const FIXED = 2;
  // result values
  let ro = 0.3333333333333333;
  let P0 = 0.6666666666666667;
  let Pn = 0.666667;
  let Lq = 0.666667;
  let L = 0.666667;
  let Wq = 0.666667;
  let W = 0.666667;
  let Wn = 0.666667;
  let Ln = 0.666667;

  const model = new MM1Model(lambda, miu, n);

  test('Object create WITHOUT N', () => {
    const model = new MM1Model(lambda, miu);
    expect(model.lambda).toEqual(lambda);
    expect(model.miu).toEqual(miu);
  });

  test('Object create with n', () => {
    const model = new MM1Model(lambda, miu, n);
    expect(model.lambda).toEqual(lambda);
    expect(model.miu).toEqual(miu);
    expect(model.n).toEqual(n);
  });

  describe('Calculate all values', () => {
    beforeAll(async () => {
      await model.calculateAll();
    });

    if (ro !== 0) {
      test(`ro (ρ) equals to ${ro.toFixed(FIXED)}`, () => {
        let received = model.ro.toFixed(FIXED);
        let expectValue = ro.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (P0 !== 0) {
      test(`P0 equals to ${P0.toFixed(FIXED)}`, () => {
        let received = model.p0.toFixed(FIXED);
        let expectValue = P0.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (Pn !== 0) {
      test(`Pn n=${n} equals to ${Pn}`, () => {
        let received = model.pn.toFixed(FIXED);
        let expectValue = Pn.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (Lq !== 0) {
      test(`Lq equals to ${Lq.toFixed(FIXED)}`, () => {
        let received = model.lq.toFixed(FIXED);
        let expectValue = Lq.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (L !== 0) {
      test(`L equals to ${L.toFixed(FIXED)}`, () => {
        let received = model.l.toFixed(FIXED);
        let expectValue = L.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (Wq !== 0) {
      test(`Wq equals to ${Wq.toFixed(FIXED)}`, () => {
        let received = model.wn.toFixed(FIXED);
        let expectValue = Wn.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (W !== 0) {
      test(`W equals to ${W.toFixed(FIXED)}`, () => {
        let received = model.w.toFixed(FIXED);
        let expectValue = W.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (Wn !== 0) {
      test(`Wn equals to ${Wn.toFixed(FIXED)}`, () => {
        let received = model.wn.toFixed(FIXED);
        let expectValue = Wn.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }

    if (Ln !== 0) {
      test(`Ln equals to ${Ln.toFixed(FIXED)}`, () => {
        let received = model.ln.toFixed(FIXED);
        let expectValue = Ln.toFixed(FIXED);
        expect(expectValue).toEqual(received);
      });
    }
  });
});
