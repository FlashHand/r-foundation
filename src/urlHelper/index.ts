const replaceQuery = (search:any) =>{
	const parser = new URLSearchParams();
	for (let k in search) {
		parser.append(k, search[k]);
	}
	const query = parser.toString();
	const { pathname, hash } = window.location;
	window.history.replaceState(null, '', `${pathname}?${query}${hash}`);
}
const hashArgs = {
	search: {} as any,
	replaceQuery,
	getAll() {
		updateArgs();
		return hashArgs.search;
	},
	remove(key:string) {
		updateArgs();
		delete hashArgs.search[key];
		replaceQuery(hashArgs.search);
	}
};

const updateArgs = () => {
	const { hash, pathname, search } = window.location;
	Object.assign(hashArgs, { hash, pathname });

	if (search) {
		const sp = new URLSearchParams(search.replace('?', ''));
		const so = {} as any;
		for (const [key, value] of sp) {
			so[key] = value;
		}
		hashArgs.search = so;
	}else{
		hashArgs.search={};
	}
};
export const createAccessForHash = (key:string) => {

		let get = () => {
			updateArgs();
			return hashArgs.search[key];
		};
		let set = (value:string) => {
			updateArgs();
			hashArgs.search[key] = value;
			hashArgs.replaceQuery(hashArgs.search);
		};
		let remove = () => {
			hashArgs.remove(key);
		};
		return { set, get, remove };

}
