<template>
  <div class="filter-wrapper">
    <input v-model="inputValue" class="filter-input" type="text" placeholder="Search" />
    <button class="c-button filter-action" @click="onClear">Clear</button>
  </div>
</template>

<script>
export default {
  name: "PerformanceFilterComponent",
  props: ["queryStringValue", "employeesList"],
  data() {
    return {
      inputValue: null,
      employeesClone: null,
    };
  },
  watch: {
    employeesList(employees) {
      if (!this.employeesClone) {
        this.employeesClone = JSON.parse(JSON.stringify(employees));
        if (!this.inputValue) {
          this.inputValue = this.queryStringValue;
        }
      }
    },
    inputValue(value) {
      this.onFilter(value);
    },
  },
  methods: {
    onHighlightElement(element,term){
       return element.replace(
          new RegExp(term, "gi"),
          (match) => `<mark>${match}</mark>`
        );
    },
    onFilter(term) {
      const employees = JSON.parse(JSON.stringify(this.employeesClone));
      const convertedList = employees.map((employee) => {
        employee.profile.address = this.onHighlightElement(employee.profile.address,term);
        employee.profile.name = this.onHighlightElement(employee.profile.name,term);
        employee.profile.about = this.onHighlightElement(employee.profile.about,term);
        return employee;
      });
      this.$emit("filter", convertedList, term);
    },
    onClear() {
      this.inputValue = null;
    },
  },
};
</script>
