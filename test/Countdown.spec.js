import {mount} from '@vue/test-utils';
import Countdown from '../src/components/Countdown.vue';
import expect from 'expect';
import Helpers from './helpers.js';
import moment from 'moment';
import sinon from 'sinon';


describe ('Countdown', () => {

	let wrapper, qa, clock;

	beforeEach(()=> {
		clock = sinon.useFakeTimers();
		wrapper = mount(Countdown, {
			propsData: {
				until: moment().add(10, 'seconds')
			}
		});
		qa = new Helpers(wrapper, expect);
	});

	afterEach(() => clock.restore());

	it ('renders a countdown timer', () =>{
		qa.see('0 Days');
		qa.see('0 Hours');
		qa.see('0 Minutes');
		qa.see('10 Seconds');
	});

	it ('reduces countdown every second', async() =>{

		qa.see('10 Seconds');

		clock.tick(1000);
		await wrapper.vm.$nextTick();
		qa.see('9 Seconds');
		
	});

	it ('shows an expired message when countdown is completed', async() =>{
		wrapper.setProps({
			expiredText: 'Contest is over'
		});

		clock.tick(10000);

		await wrapper.vm.$nextTick();
		qa.see('Contest is over');
	});

	it ('shows a custom expired message when countdown is completed', async() =>{

		clock.tick(10000);

		await wrapper.vm.$nextTick();
		qa.see('Now Expired');
	});

	it ('broadcasts when countdown is finished', async() => {
		
		clock.tick(10000);

		await wrapper.vm.$nextTick();
		qa.expectEvent('finished');
		
	});

	it ('clears the interval once completed', async() => {
		
		clock.tick(10000);
		expect(wrapper.vm.now.getSeconds()).toBe(10);

		clock.tick(5000);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.now.getSeconds()).toBe(10);
	});
});