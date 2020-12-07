# model-manager

## 前端数据模块化封装，基于redux的model数据层封装

> 技术栈：react + redux + typescript

### 源起（痛点）

随着项目越来越大，项目中store中数据越来越多，redux(action、reduce)的越来越多，数据组织越来越乱，数据、视图、业务、模块间的耦合越来越严重，团队成员代码风格的不统一，使得项目的可读性、简洁度、维护性越来越差，团队协作成本越来越大，接触的思想和技术栈的越来越多，萌生了对数据、视图、业务的分离与封装，后接触经启发与引导，尝试封装该工具

### 封装思想

1. 把项目的不同页面（功能）看做是一个模块
2. 把模块的数据与视图分离，用 Model 组织同一模块下的数据，并统一管理
3. Model基于redux、redux-saga，封装了action与initialState的定义、reducer与effect的注册
4. Model中定义的数据字段会生成对应的select，select返回每个字段对应的selector函数（Reselect库的selector），用来搭配redux中间件reselect或useSelector钩子做数据读取优化和衍生数据的高效计算

至此、我们把action、initialState的定义和reducer、effect的注册都组织到 Model 中，与视图分离；既能隔离action、reducer、effect，省去了烦乱的定义，又能很好的看出各部分之间的联系

### 开始使用

#### 1. 定义Model

```typescript
const accountModule = new Model({
	namespace: "account", // 定义命名空间，每个model唯一
	// 定义初始化数据、Model会根据initialState字段自动生成对应的select
	initialState: {
		userInfo: {
			username: "",
			password: "",
			nickname: "xingbo",
		},
		setting: "setting"
	},
	// 定义action
	actions: (actionCreator) => {
		return {
			fetchLogin: actionCreator("login"),
			fetchLogout: actionCreator("logout"),
		};
	}
}).registerReducer((modelAction, factory) => {
	// 注册reducer
	factory.register(modelAction.fetchLogin, (state, { payload }) => {
		return {
			...state,
			userInfo: payload
		};
	});
}).registerEffect((modelAction, factory) => {
	// 注册effect
	factory.register(modelAction.fetchLogout, function* (payload, { put }) {
		yield new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 3000);
		});
		
		yield put({
			userInfo: {
				username: "",
				password: "",
				nickname: "",
			}
		});
	});
});
```

#### 2. 在react中使用model

```react
// index.tsx
const Account: React.FC = () => {
	// 获取字段值
	const userInfo = useSelector(accountModel.select.userInfo);
	// 触发action
	const dispatch = useDispatch();
	dispatch(accountModel.action.fetchLogin({
		username: "234",
		password: "234",
		nickname: "xingbo"
	}));
	// 也可以使用封装好的 useEffectAction，作用同上dispatch方式
	const [fetchLogin] = useEffectAction(accountModel.action.fetchLogin);
	fetchLogin({
		username: "234",
		password: "234",
		nickname: "xingbo",
	});
}
```

### 最后

> 这个工具的封装刚开始，不够成熟，只是基于曾经开发中对于项目的思考和启发开发，在写这个文档时也发现一些不足和需要思考的地方，日后想要需要去深入思考和开发，并且融入更多自己的想法和对于项目的思考在里面，慢慢完善这个工具
