<template>
<div
  v-if="showing"
  class="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
>
  <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
    <slot />
  </div>
</div>
</template>

<script>
export default {
    props: {
        showing: {
            required: true,
            type: Boolean
        }
    }
}
</script>

