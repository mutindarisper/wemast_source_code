<template>
  <div class="q-pa-none">
    <div class="row">
      <div class="col">
        <div class="text-bold">Prefire start</div>
        <input
          type="date"
          id="birthday"
          name="birthday"
          v-model="date"
          style="width:138px;border-radius: 7px;"
        />
      </div>
      <div class="col">
        <div class="text-bold">Prefire end</div>
        <input type="date" id="birthday" name="birthday" style="width:138px;border-radius: 7px;" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-bold">Postfire start</div>
      </div>
      <div class="col">
        <div class="text-bold">Postfire end</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: ""
    };
  }
};
</script>

<style></style>
