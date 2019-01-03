'use strict';

const mock = require('egg-mock');

describe('test/grpc-client.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/grpc-client-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, grpcClient')
      .expect(200);
  });
});
