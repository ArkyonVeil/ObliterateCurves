(() => {
	const desc = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, 'adoptedStyleSheets');
	if (!desc) return;
	const { get, set } = desc;
	const nativeAttachShadow = Element.prototype.attachShadow;

	let sheet;
	const getSheet = () => {
		if (!sheet) {
			sheet = new CSSStyleSheet();
			sheet.replaceSync('@layer obliterate-curves { :host, *, ::before, ::after { border-radius: 0 !important; } }');
		}
		return sheet;
	};

	function adopt(root, value) {
		let sheets;
		try {
			sheets = Array.from(value);
		} catch {
			return set.call(root, value);
		}
		if (!sheets.includes(getSheet())) {
			try {
				return set.call(root, [...sheets, sheet]);
			} catch {
			}
		}
		return set.call(root, sheets);
	}

	Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
		...desc,
		set(value) {
			adopt(this, value);
		},
	});

	Element.prototype.attachShadow = function attachShadow(init) {
		const root = nativeAttachShadow.call(this, init);
		try {
			adopt(root, get.call(root));
		} catch {}
		return root;
	};
})();
