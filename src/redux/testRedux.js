import store from "./store";
import { increment, decrement, reset } from "./actions/counter";

console.log(store.getState());

// 更新ｓｔａｔｅ，打印日志
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// 测试action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听
unsubscribe();