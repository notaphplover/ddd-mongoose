import 'reflect-metadata';
import { DotEnvLoader } from '../../../infrastructure/DotEnvLoader';
import { Index } from '../../../../../layer-modules/env/domain';
import dotenv from 'dotenv';
import { expect } from 'chai';
import sinon from 'sinon';

interface MockType {
  foo: string;
}

const indexFixture: Index<MockType> = { foo: 'bar' };

class DotEnvLoaderMock extends DotEnvLoader<MockType> {
  protected parseIndex(): Index<MockType> {
    return indexFixture;
  }
}

describe(DotEnvLoader.name, () => {
  let dotenvConfigFakeSpy: sinon.SinonSpy;

  let fixturePath: string;

  before(() => {
    dotenvConfigFakeSpy = sinon.fake();

    sinon.replace(dotenv, 'config', dotenvConfigFakeSpy);

    fixturePath = 'bar';
  });

  after(function () {
    sinon.restore();
  });

  describe('.index', () => {
    after(() => {
      dotenvConfigFakeSpy.resetHistory();
    });

    describe('when called', () => {
      let dotEnvLoader: DotEnvLoader<MockType>;
      let result: unknown;

      before(() => {
        dotEnvLoader = new DotEnvLoaderMock(fixturePath);
        result = dotEnvLoader.index;
      });

      it('must return its innerIndex', () => {
        expect(result).to.deep.equal(indexFixture);
      });
    });

    describe('when called, and innerIndex is not defined', () => {
      let dotEnvLoader: DotEnvLoader<MockType>;
      let dotEnvLoaderLoadSpy: sinon.SinonSpy;

      before(() => {
        dotEnvLoader = new DotEnvLoaderMock(fixturePath);
        dotEnvLoaderLoadSpy = sinon.spy(dotEnvLoader, 'load');

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        dotEnvLoader.index;
      });

      it('must call this.load', () => {
        expect(dotEnvLoaderLoadSpy.calledOnce).to.be.eq(true);
      });
    });
  });

  describe('.load()', () => {
    let dotEnvLoader: DotEnvLoader<MockType>;

    before(() => {
      dotEnvLoader = new DotEnvLoaderMock(fixturePath);
    });

    after(() => {
      dotenvConfigFakeSpy.resetHistory();
    });

    describe('when called', () => {
      before(() => {
        dotEnvLoader.load();
      });

      it('must call dontenv.config', () => {
        expect(dotenvConfigFakeSpy.calledOnce).to.be.eq(true);
      });
    });
  });
});
