<template>
  <i :class="name"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>
