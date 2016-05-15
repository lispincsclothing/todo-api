==== JS stack trace =========================================

Security context: 0x3f37467c9fa9 <JS Object>#0#
    3: tryModuleLoad(aka tryModuleLoad) [module.js:415] [pc=0x3f4412738c7d] (this=0x3f3746704189 <undefined>,module=0x24d8a16981d1 <a Module with map 0x34567fd18421>#2# 1: v8::Template::Set(v8::Local<v8::Name>, v8::Local<v8::Data>, v8::PropertyAttribute)
 2: node_sqlite3::Statement::Init(v8::Local<v8::Object>)
 3: (anonymous namespace)::RegisterModule(v8::Local<v8::Object>)
 4: node::DLOpen(v8::FunctionCallbackInfo<v8::Value> const&)
 5: v8::internal::FunctionCallbackArguments::Call(void (*)(v8::FunctionCallbackInfo<v8::Value> const&))
 6: v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<false>(v8::internal::Isolate*, v8::internal::(anonymous namespace)::BuiltinArguments<(v8::internal::BuiltinExtraArguments)1>)
 7: v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*)
 8: 0x3f441260961b
Express listening on port 3000
