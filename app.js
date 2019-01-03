'use strict';

const assert = require('assert');
const { GRPCHelper } = require('grpc-helper');

module.exports = app => {
  // 第一个参数 grpcClient 指定了挂载到 app 上的字段，我们可以通过 `app.grpcClient` 访问到 grpcClient singleton 实例
  // 第二个参数 createMysql 接受两个参数(config, app)，并返回一个 Grpc Client 的实例
  app.addSingleton('grpcClient', createGrpcClient);
};

/**
 * @param  {Object} config   框架处理之后的配置项，如果应用配置了多个 MySQL 实例，会将每一个配置项分别传入并调用多次 createGrpcClient
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 Grpc Client 实例
 */
async function createGrpcClient(config, app) {
  assert(config.packageName && config.serviceName && config.protoPath && config.sdUri);
  // 创建实例
  const client = new GRPCHelper(config);
  await client.waitForReady();
  app.coreLogger.info('[egg-grpc-client] init instance success');
  return client;
}
