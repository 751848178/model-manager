import React, { useEffect, useState } from "react";
import { accountModel } from "@model/index";
import useEffectAction from "@/hooks/useEffectAction";
import { useSelector } from "react-redux";


const Index: React.FC = () => {
	const userInfo = useSelector(accountModel.select.userInfo);
	const [fetchLogin] = useEffectAction(accountModel.action.fetchLogin);
	const [fetchLogout] = useEffectAction(accountModel.action.fetchLogout);

	const [refresh, setRefresh] = useState(false);
	
	useEffect(() => {
		fetchLogin({
			username: "234",
			password: "234",
			nickname: "xingbo",
		});
		setTimeout(() => {
			fetchLogin({
				username: "xingbo",
				password: 123456,
				nickname: "xingbo",
			});
			setRefresh(!refresh);
			fetchLogout();
		}, 5000);
	}, []);
	return (
		<div className="page page-index">
			123
			{JSON.stringify(userInfo)}
		</div>
	);
}

export default Index;