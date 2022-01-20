<template>
  <b-card class="mx-auto rounded shadow p-3" bg-variant="light">

    <template #header class="justify-content-center">
      <i class="fa fa-archway card-title-icon" /> <span class="card-title"> DATA ENROLLMENT ACTIVITY</span>
    </template>

    <b-card-text>

      <b-form @submit="onSubmit($event)" @reset="onReset($event)">

        <!--    General Data   -->

        <div class="myRow mt-3">
          <i class="fa fa-cogs mr-1"/><span class="card-subtitle">General Data</span>
        </div>

        <div class="mb-3 mt-4">
          <b-row>
            <b-col class="col-4">
              <b-form-group id="domain" label="Domain:" class="form-input-label">
                <b-form-input
                    v-model="form.domain"
                    @blur="$v.form.domain.$touch()"
                    type="text"
                    placeholder="Enter domain"
                />
                <div v-if="this.$v.form.domain.$error">
                  <span class="errorMsg" v-if="!this.$v.form.domain.$error.required">
                    domain is required!
                  </span>
                </div>
              </b-form-group>
            </b-col>
            <b-col class="col-4">
              <b-form-group id="package" label="Package:" class="form-input-label">
                <b-form-input
                    v-model="form.package"
                    @blur="$v.form.package.$touch()"
                    type="text"
                    placeholder="Enter package"
                />
                <div v-if="this.$v.form.package.$error">
                  <span class="errorMsg" v-if="!this.$v.form.package.$error.required">
                    package is required!
                  </span>
                </div>
              </b-form-group>
            </b-col>
            <b-col class="col-4">
              <b-form-group id="className" label="Class Name:" class="form-input-label">
                <b-form-input
                    v-model="form.className"
                    @blur="$v.form.className.$touch()"
                    type="text"
                    placeholder="Enter Class Name"
                />
                <div v-if="this.$v.form.className.$error">
                  <span class="errorMsg" v-if="!this.$v.form.className.$error.required">
                    class name is required!
                  </span>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </div>

        <!--   Data Structure   -->

        <div class="myRow mt-3">
          <i class="fa fa-database mr-1"/><span class="card-subtitle">Data Structure</span>
        </div>

        <div class="mb-5 mt-4 text-center">
          <b-row>
            <b-table striped bordered hover :items="table_items" :fields="table_fields">
              <template #cell(actions)="data">
                <div v-if="row_actions !== null & row_actions.length !== 0">
                  <i v-for="rowAction in row_actions" :key="rowAction.key" :title="rowAction.label" class="table-icons" @click="captureTableEvent(data.item, rowAction.actionEvent)"
                     :class="`${rowAction.class} ${rowAction.icon}`" />
                </div>
              </template>
            </b-table>
          </b-row>
        </div>

        <!--   Form Buttons   -->

        <div class="mt-5">
          <b-button type="submit" variant="info" class="mr-2">Submit</b-button>
          <b-button type="reset" variant="warning">Reset</b-button>
        </div>

      </b-form>

    </b-card-text>
  </b-card>
</template>

<script>
import {required} from 'vuelidate/lib/validators';
import {notyf} from "@/notyf";

export default {
  name: 'Table',
  props: {

  },
  methods: {
    onSubmit (event){
      event.preventDefault();

      this.$v.$touch();
      if (this.$v.$invalid){
        notyf.open({type: "error", message: "Form is Invalid!"});
        return;
      }

      notyf.open({type: "success", message: "Form Has Been Sent!"});
    },
    onReset (event){
      event.preventDefault();
      this.$v.$reset();
      this.form = {};
      notyf.open({type: "warning", message: "Form Has Been Reset!"});
    },
    captureTableEvent(data, event){

      let temp = {...data};

      switch (event){
        case 'duplicateRow' :
          temp.id = this.table_items.length;
          this.table_items.push(temp);
          break;
        case 'removeRow' :
          this.table_items =  this.table_items.filter(function(ele){ return ele.id !== temp.id });
          break;
      }

    }
  },
  data (){
    return {
      table_fields:[
        {
          key: 'id',
          label: 'ID',
          sortable: false
        },
        {
          key: 'first_name',
          label: 'First Name',
          sortable: false
        },
        {
          key: 'last_name',
          label: 'Last Name',
          sortable: false
        },
        {
          key: 'age',
          label: 'Age',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        }
      ],
      table_items:[
        { id: 0, first_name: 'Ali', last_name: 'Boukhta', age: 24 },
        { id: 1, first_name: 'Aymen', last_name: 'Sadak', age: 23 },
        { id: 2, first_name: 'Reda', last_name: 'El ghallouch', age: 25 },
      ],
      row_actions: [
        {
          key: 'duplicate',
          icon: 'fa fa-copy',
          class: 'text-info',
          label: 'Duplicate',
          actionEvent: 'duplicateRow'
        },
        {
          key: 'remove',
          icon: 'fa fa-minus',
          class: 'text-danger',
          label: 'Remove',
          actionEvent: 'removeRow'
        }
      ],
      form: {
        domain: '',
        package: '',
        className: ''
      }
    }
  },
  validations:{
    form: {
      domain: {
        required
      },
      package: {
        required
      },
      className: {
        required
      },
    }
  }
}
</script>

<style scoped>

.card-title {
  font-weight: bold;
  font-size: 22px;
  color: #17a2b8;
}

.card-title-icon {
  margin-right: 3px;
  font-size: 22px;
  color: #17a2b8;
}

.myRow {
  border: 0;
  border-bottom: 2px solid grey;
  color: #6a3d17e6;
}

.card-subtitle {
  font-weight: bold;
  font-size: 16px
}

.form-input-label {
  font-weight: bold;
}

.errorMsg {
  color: #17a2b8;
  font-size: 12px;
}

.table-icons {
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}

</style>
