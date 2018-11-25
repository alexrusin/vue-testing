<template>
	<div>
		<input class="new-reminder" v-model="newReminder">
		<button @click="add">Add Reminder</button>

		<ul v-if="reminders.length">
			<li v-for="(reminder, index) in reminders" :key="index">
				{{reminder}}
				<button class="remove" @click="remove(index)">Remove</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				reminders: [],
				newReminder: ''

			};
		},

		methods: {
			add() {
				this.reminders.push(this.newReminder);
				this.newReminder = '';
			},

			remove(index) {
				this.reminders.splice(index, 1);
			}
		}
	}
</script>