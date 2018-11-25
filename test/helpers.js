export default class Helpers {
	constructor (wrapper, expect) {
		this.expect = expect;
		this.wrapper = wrapper;
	}

	see(text, selector) {
		let wrap = selector ? this.wrapper.find(selector) : this.wrapper;
		this.expect(wrap.html()).toContain(text);
	}

	type(selector, text) {
		let node = this.wrapper.find(selector);
		node.element.value = text;
		node.trigger('input');
	}

	click(selector) {
		this.wrapper.find(selector).trigger('click');
	}

	assertElementValue(el, val) {
		this.expect(this.wrapper.find(el).element.value).toBe(val);
	}

	assertElementPresent(element) {
		this.expect(this.wrapper.contains(element)).toBe(true);
	}

	assertElementAbsent(element) {
		this.expect(this.wrapper.contains(element)).toBe(false);
	}

	expectEvent(event) {
		this.expect(this.wrapper.emitted()[event]).toBeTruthy();
	}

	assertOnNextTick(callback, done) {
		this.wrapper.vm.$nextTick(() => {
			try {
				callback();
				done();
			} catch (e) {
				done(e);
			}
			
		});
	}
}