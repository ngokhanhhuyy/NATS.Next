import { useEffect } from "react";

function BootstrapClient() {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap.bundle.js");
	}, []);
	useEffect(() => {
		import("bootstrap");
	}, []);

	return null;
}

export default BootstrapClient;