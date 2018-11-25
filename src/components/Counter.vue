<template>
		<div>
			<span class="count" v-text="count"></span>
			<button @click="count++" class="increment">Increment Count</button>
			<button @click="count > 0 && count--" class="decrement" v-show="count > 0">Decrement Count</button>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				count: 0
			};
		}
	}
</script>