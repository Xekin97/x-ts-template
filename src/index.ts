import { useCallback, useState } from "react";

export function useUpdate() {
	const [_, setState] = useState(Object.create(null));
	return useCallback(() => {
		setState(Object.create(null));
	}, []);
}
