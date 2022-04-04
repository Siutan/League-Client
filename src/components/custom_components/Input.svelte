<script>
  export let label;
  // need to include name,
  // this will be the key in your json
  export let name;
  export let type;
  export let placeholder;
</script>

<label class="hidden" for={name}>{label}</label>
<input
  class="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
  {placeholder}
  id={name}
  {name}
  {type}
/>
