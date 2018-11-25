import {mount} from '@vue/test-utils';
import Reminders from '../src/components/Reminders.vue';
import expect from 'expect';

describe ('Reminder', ()=> {

	let wrapper;

	beforeEach(() => {
		wrapper = mount(Reminders);
	});

	it ('hides the reminders list if there are none', () =>{

		expect(wrapper.contains('ul')).toBe(false);

	});

	it ('can add reminders', () => {
		
		addReminder('Go to the store');
		expect(wrapper.find('ul').text()).toContain('Go to the store');
	});

	it ('can remove any reminder', () => {
		addReminder('Go to the store');
		addReminder('Finish screen cast');

		let deleteButton = wrapper.find('ul > li:first-child .remove');
		deleteButton.trigger('click');

		expect(wrapper.find('ul').text()).not.toContain('Go to the store');

	});

	function addReminder(body) {
		let newRemider = wrapper.find('.new-reminder');

		newRemider.element.value = body;
		newRemider.trigger('input');

		wrapper.find('button').trigger('click');
	}

});