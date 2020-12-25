import 'reflect-metadata';
import { DbDotEnvVariables } from '../../../../../layer-modules/db/infrastructure/env/DbDotEnvVariables';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongooseConnector } from '../../../infrastructure/MongooseConnector';
import { dbDotEnvVariablesFixtureFactory } from '../../../../../layer-modules/db/test/fixtures/infrastructure/env/fixtures';
import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';

describe(MongooseConnector.name, () => {
  let mongooseConnectSpy: sinon.SinonSpy;

  let mongooseConnector: MongooseConnector;

  before(() => {
    mongooseConnectSpy = sinon.fake();

    sinon.replace(mongoose, 'connect', mongooseConnectSpy);

    const commonEnvLoader: EnvLoader<DbDotEnvVariables> = {
      index: dbDotEnvVariablesFixtureFactory.get(),
      load: sinon.fake(),
    };

    mongooseConnector = new MongooseConnector(commonEnvLoader);
  });

  after(() => {
    sinon.restore();
  });

  describe('.connect()', () => {
    describe('when called', () => {
      before(async () => {
        await mongooseConnector.connect();
      });

      it('must call mongoose.connect()', () => {
        expect(mongooseConnectSpy.calledOnce).to.be.eq(true);
      });
    });
  });
});
