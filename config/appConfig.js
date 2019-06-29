let appConfig = {};

appConfig.port = 3002;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
  uri: "mongodb://127.0.0.1:27017/TodoListDb1"
};
appConfig.apiVersion = "/api/v1";

module.exports = {
  port: appConfig.port,
  allowedCorsOrigin: appConfig.allowedCorsOrigin,
  environment: appConfig.env,
  db: appConfig.db,
  apiVersion: appConfig.apiVersion
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkhGSTdkTGQ4SyIsImlhdCI6MTU1OTYxMzE2NzA4NSwiZXhwIjoxNTU5Njk5NTY3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJUb0RvTGlzdCIsImRhdGEiOnsidXNlcklkIjoiRWZubkN0UUM1IiwiZmlyc3ROYW1lIjoiQU1SSU4iLCJsYXN0TmFtZSI6Ik1VTEFOSSIsImZ1bGxOYW1lIjoiQU1SSU4gTVVMQU5JIiwiZW1haWwiOiJtdWxhbmkuYW1yaW4wOUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjk5NzA3MDk2MjksImNvdW50cnkiOiJJTiIsImNvdW50cnlDb2RlIjoiOTEifX0.E1nye_cKuroVxphB4I0CHPyicrwtViW6lIAT2NSr7mU",  EfnnCtQC5
