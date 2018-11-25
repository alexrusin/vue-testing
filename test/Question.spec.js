import {mount} from '@vue/test-utils';
import Question from '../src/components/Question.vue';
import expect from 'expect';
import moxios from 'moxios';
import Helpers from './helpers.js';


describe ('Question', () => {

	let wrapper;
	let helpers;

	beforeEach(()=> {
		moxios.install();

		wrapper = mount(Question, {
			propsData: {
				dataQuestion: {
					title: 'The title',
					body: 'The body'
				}
			}
		});

		helpers = new Helpers(wrapper, expect);
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it ('presents the title and the body', () => {
		helpers.see('The title');
		helpers.see('The body');
	});

	it ('can be edited', () => {

		helpers.assertElementAbsent('input[name=title]');
		
		helpers.click('#edit');

		helpers.assertElementValue(
			'input[name=title]',
			'The title'
			);
		helpers.assertElementValue(
			'textarea[name=body]',
			'The body'
			);
	});

	it ('hides edit button during edit mode', () => {
		helpers.click('#edit');
		expect(wrapper.contains('#edit')).toBe(false);
	});

	it ('updates the question after editing', (done) => {
		helpers.click('#edit');

		helpers.type('input[name=title]', 'Changed title');
		helpers.type('textarea[name=body]', 'Changed body');

		moxios.stubRequest(/questions\/.+/, {
			status: 200,
			response: {
				title: 'Changed title',
				body: 'Changed body'
			}
		});

		helpers.click('#update');

		helpers.see('Changed title');
		helpers.see('Changed body');
		moxios.wait(() => {
			helpers.see('Your question has been updated');

			done();
		});
		
	});

	it ('can cancel out of edit mode', () => {
		helpers.click('#edit');

		helpers.type('input[name=title]', 'Changed title');

		helpers.click('#cancel');

		helpers.see('The title');

	});
});