<template>
  <b-card class="mx-auto rounded shadow p-3 justify-content-center" bg-variant="light">

    <template #header>
      <i class="fa fa-archway card-title-icon" /> <span class="card-title"> DATA ENROLLMENT ACTIVITY </span>
    </template>

    <b-card-text>

      <form-wizard title="" subtitle="" next-button-text="Next" color="#17a2b8" shape="tab">

        <tab-content title="General Settings" icon="fa fa-cogs">

          <b-row>
            <b-col class="col-6">
              <b-form-group label="Project Name:" class="form-input-label">
                <b-form-input
                    v-model="dataModel.projectName"
                    @blur="$v.dataModel.projectName.$touch()"
                    type="text"
                    placeholder="Enter Project Name"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="col-3">
              <b-form-group label="Artifact ID:" class="form-input-label">
                <b-form-input
                    v-model="dataModel.artifactId"
                    @blur="$v.dataModel.artifactId.$touch()"
                    type="text"
                    placeholder="Enter Artifact ID"
                />
              </b-form-group>
            </b-col>
            <b-col class="col-3">
              <b-form-group label="Group ID:" class="form-input-label">
                <b-form-input
                    v-model="dataModel.groupId"
                    @blur="$v.dataModel.groupId.$touch()"
                    type="text"
                    placeholder="Enter Group ID"
                />
              </b-form-group>
            </b-col>
            <b-col class="col-3">
              <b-form-group label="Base Package:" class="form-input-label">
                <b-form-input
                    v-model="dataModel.package"
                    @blur="$v.dataModel.package.$touch()"
                    type="text"
                    placeholder="Enter Base Package"
                />
              </b-form-group>
            </b-col>
            <b-col class="col-3">
              <b-form-group label="Project Version:" class="form-input-label">
                <b-form-input
                    v-model="dataModel.projectVersion"
                    @blur="$v.dataModel.projectVersion.$touch()"
                    type="text"
                    placeholder="Enter Project Version"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="col-3">
              <label class="form-input-label">Select Technology:</label>
              <multiselect
                  :options="technologiesDropdownsList"
                  track-by="value"
                  label="label"
                  placeholder="Select Technology"
                  :searchable="true"
                  :allow-empty="false"
                  :close-on-select="true"
                  :multiple="false"
                  v-model="dataModel.technology"
                  @input="updateTechnologyVersionDropdown($event)"
                  @blur="$v.dataModel.technology.$touch()"
              />
            </b-col>
            <b-col class="col-3" v-if="dataModel.technology">
              <label class="form-input-label">Select Version:</label>
              <multiselect
                  :options="technologiesVersionDropdownsList"
                  placeholder="Select Version"
                  :searchable="true"
                  :allow-empty="false"
                  :close-on-select="true"
                  :multiple="false"
                  v-model="dataModel.technologyVersion"
                  @blur="$v.dataModel.technologyVersion.$touch()"
              />
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col class="col-6">
              <label class="form-input-label">Enter Readme Description:</label>
              <b-form-textarea
                  v-model="dataModel.readme"
                  placeholder="Enter Readme Description"
                  max-rows="5000"
                  rows="4"
              ></b-form-textarea>
            </b-col>
          </b-row>

        </tab-content>

        <tab-content title="Entities List" icon="fa fa-database">
          My second tab content
        </tab-content>

        <!--     Footer Slot    -->

        <template slot="footer" slot-scope="props">
          <div class="wizard-footer-left">
            <wizard-button  v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
            <wizard-button class="main-wizard-buttons-margin" :style="props.fillButtonStyle" v-if="!props.isLastStep" @click.native="props.nextTab()" > Next </wizard-button>
          </div>
          <div class="wizard-footer-right">
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #dc3545; color: white"> Cancel </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #ffc107; color: white"> Reset </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #28a745; color: white" v-if="props.isLastStep" @click.native="props.nextTab()"> Preview </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #28a745; color: white" v-if="props.isLastStep" @click.native="props.nextTab()" > Download </wizard-button>
          </div>
        </template>

      </form-wizard>

    </b-card-text>
  </b-card>
</template>

<script>
import {required} from 'vuelidate/lib/validators';

export default {
  name: "Form",
  props: {

  },
  methods: {
    onSubmit() {
    },
    onReset() {
    },
    updateTechnologyVersionDropdown(event){

      this.dataModel.technologyVersion = '';

      switch (event.value){
        case 'SPRING_BOOT':
          this.technologiesVersionDropdownsList = this.javaTechnologiesVersionDropdownsList;
          return;
        default :
          this.technologiesVersionDropdownsList = [];
      }

    }
  },
  data () {
    return {
      dataModel: {
        projectName: '',
        artifactId: '',
        groupId: '',
        package: '',
        projectVersion: '',
        technology: '',
        technologyVersion: '',
        readme: ''
      },
      technologiesDropdownsList : [
        {
          label: 'Spring Boot',
          value: 'SPRING_BOOT'
        },
        {
          label: 'Python',
          value: 'PYTHON'
        }
      ],
      technologiesVersionDropdownsList: [

      ],
      javaTechnologiesVersionDropdownsList:[
          '1.8'
      ]
    }
  },
  validations: {

    dataModel: {
      projectName: {
        required
      },
      artifactId: {
        required
      },
      groupId: {
        required
      },
      package: {
        required
      },
      projectVersion: {
        required
      },
      technology: {
        required
      },
      technologyVersion: {
        required
      },
      readme:{
        required
      }
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

.form-input-label {
  font-weight: bold;
}

.errorMsg {
  color: #17a2b8;
  font-size: 12px;
}

.main-wizard-buttons-margin {
  margin-right: 5px;
  margin-left: 5px;
}

li.active:before, li.active:after {
  background: skyblue
}

</style>