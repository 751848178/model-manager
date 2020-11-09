import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { TabBar } from "antd-mobile";
import createSagaMiddleware from "redux-saga";
import Index from "./pages/Index";
import { sagaFactory } from "./utils/model/SagaFactory";
// import "@module/index";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(sagaFactory.getReducers(), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagaFactory.getEffects());

const App: React.FC = () => {
	const [tabbarShow, setTabbarShow] = useState(true);
	return (
		<div>
			<Provider store={store}>
				<Index />
				{/* <TabBar
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
					hidden={state.hidden}
				>
					<TabBar.Item
						title="Life"
						key="Life"
						icon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
							}}/>
						}
						selectedIcon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
							}} />
						}
						selected={state.selectedTab === 'blueTab'}
						badge={1}
						onPress={() => {
							setState({
								selectedTab: 'blueTab',
							});
						}}
						data-seed="logId"
					>
						{renderContent('Life')}
					</TabBar.Item>
					<TabBar.Item
						icon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
							}}
							/>
						}
						selectedIcon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
							}}
							/>
						}
						title="Koubei"
						key="Koubei"
						badge={'new'}
						selected={state.selectedTab === 'redTab'}
						onPress={() => {
							setState({
								selectedTab: 'redTab',
							});
						}}
						data-seed="logId1"
					>
						{renderContent('Koubei')}
					</TabBar.Item>
					<TabBar.Item
						icon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
							}}
							/>
						}
						selectedIcon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
							}}
							/>
						}
						title="Friend"
						key="Friend"
						dot
						selected={state.selectedTab === 'greenTab'}
						onPress={() => {
							setState({
								selectedTab: 'greenTab',
							});
						}}
					>
						{renderContent('Friend')}
					</TabBar.Item>
					<TabBar.Item
						icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
						selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
						title="My"
						key="my"
						selected={state.selectedTab === 'yellowTab'}
						onPress={() => {
							setState({
								selectedTab: 'yellowTab',
							});
						}}
					>
						{renderContent('My')}
					</TabBar.Item>
				</TabBar>
			 */}</Provider>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
