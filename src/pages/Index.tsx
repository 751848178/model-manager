import React, { useEffect, useState } from "react";
import { AccountModule } from "@module/index";
import useSelector from "@/hooks/useSelector";
import useEffectAction from "@/hooks/useEffectAction";


const Index: React.FC = () => {
	const userInfo = useSelector(AccountModule.select.userInfo);
	const [fetchLogin] = useEffectAction(AccountModule.actions.fetchLogin);
	const [fetchLogout] = useEffectAction(AccountModule.actions.fetchLogout);

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