<template>
  <b-card class="mx-auto rounded shadow p-3 justify-content-center" bg-variant="light">

    <template #header>
      <i class="fa fa-archway card-title-icon" /> <span class="card-title"> DATA ENROLLMENT ACTIVITY </span>
    </template>

    <b-card-text>

      <form-wizard title="" subtitle="" next-button-text="Next" color="#17a2b8" shape="tab" ref="mainWizard">

        <tab-content v-for="(tab,index) in mainWizardTabs" :key="index" :title="tab.title" :icon="tab.icon" :before-change="tab.beforeChange">

          <!--    General Settings   -->

          <template v-if="tab.name==='generalSettings'">

            <b-row>
              <b-col class="col-6">
                <b-form-group label="Project Name :" class="form-input-label">
                  <b-form-input
                      v-model="dataModel.projectName"
                      @blur="$v.dataModel.projectName.$touch()"
                      type="text"
                      placeholder="demo"
                  />
                  <div v-if="$v.dataModel.projectName.$error">
                    <span class="errorMsg" v-if="!$v.dataModel.projectName.$error.required"> project name is required! </span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col class="col-6">
                <b-form-group label="Project Description :" class="form-input-label">
                  <b-form-input
                      v-model="dataModel.projectDescription"
                      @blur="$v.dataModel.projectDescription.$touch()"
                      type="text"
                      placeholder="Demo project for Spring Boot"
                  />
                  <div v-if="$v.dataModel.projectDescription.$error">
                    <span class="errorMsg" v-if="!$v.dataModel.projectDescription.$error.required"> project description is required! </span>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="col-3">
                <b-form-group label="Artifact ID :" class="form-input-label">
                  <b-form-input
                      v-model="dataModel.artifactId"
                      @blur="$v.dataModel.artifactId.$touch()"
                      type="text"
                      placeholder="demo"
                  />
                  <div v-if="$v.dataModel.artifactId.$error">
                    <span class="errorMsg" v-if="!$v.dataModel.artifactId.$error.required"> artifact ID is required! </span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col class="col-3">
                <b-form-group label="Group ID :" class="form-input-label">
                  <b-form-input
                      v-model="dataModel.groupId"
                      @blur="$v.dataModel.groupId.$touch()"
                      type="text"
                      placeholder="com.example"
                  />
                  <div v-if="$v.dataModel.groupId.$error">
                    <span class="errorMsg" v-if="!$v.dataModel.groupId.$error.required"> group ID is required! </span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col class="col-3">
                <b-form-group label="Base Package :" class="form-input-label">
                  <b-form-input
                      v-model="dataModel.package"
                      @blur="$v.dataModel.package.$touch()"
                      type="text"
                      placeholder="com.example.demo"
                  />
                  <div v-if="$v.dataModel.package.$error">
                    <span class="errorMsg" v-if="!$v.dataModel.package.$error.required"> package is required! </span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col class="col-3">
                <b-form-group label="Project Version :" class="form-input-label">
                  <b-form-input
                      v-model="dataModel.projectVersion"
                      @blur="$v.dataModel.projectVersion.$touch()"
                      type="text"
                      placeholder="1.0.0-SNAPSHOT"
                  />
                  <div v-if="$v.dataModel.projectVersion.$error">
                    <span class="errorMsg" v-if="!$v.dataModel.projectVersion.$error.required"> project version is required! </span>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="col-3">
                <label class="form-input-label">Select Technology :</label>
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
                <div v-if="$v.dataModel.technology.$error">
                  <span class="errorMsg" v-if="!$v.dataModel.technology.$error.required"> technology is required! </span>
                </div>
              </b-col>
              <b-col class="col-3" v-if="dataModel.technology">
                <label class="form-input-label">Select Technology Version :</label>
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
                <div v-if="$v.dataModel.technologyVersion.$error">
                  <span class="errorMsg" v-if="!$v.dataModel.technologyVersion.$error.required"> technology version is required! </span>
                </div>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col class="col-6">
                <label class="form-input-label">Enter Readme Description :</label>
                <b-form-textarea
                    v-model="dataModel.readme"
                    @blur="$v.dataModel.readme.$touch()"
                    placeholder="Enter Readme Description"
                    max-rows="5000"
                    rows="4"
                />
                <div v-if="$v.dataModel.readme.$error">
                  <span class="errorMsg" v-if="!$v.dataModel.readme.$error.required"> readme description is required! </span>
                </div>
              </b-col>
            </b-row>

          </template>

          <!--    Entities List Settings   -->

          <template v-if="tab.name==='entitiesList'">

            <b-row>
              <b-col class="col-4">
                <label class="sub-wizard-title">Entities Resume</label>
              </b-col>
              <b-col class="col-8">
                <label class="sub-wizard-title">Entities Management</label>
              </b-col>
            </b-row>

          </template>

        </tab-content>

        <!--     Footer Slot    -->

        <template slot="footer" slot-scope="props">
          <div class="wizard-footer-left">
            <wizard-button  v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
            <wizard-button class="main-wizard-buttons-margin" :style="props.fillButtonStyle" v-if="!props.isLastStep" @click.native="props.nextTab()" > Next </wizard-button>
          </div>
          <div class="wizard-footer-right">
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #dc3545; color: white"> Cancel </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #ffc107; color: white" @click.native="onReset()"> Reset </wizard-button>
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
import {notyf} from "@/notyf";

export default {
  name: "Form",
  props: {

  },
  methods: {
    onSubmit() {
    },
    onReset() {
      this.$v.$reset();
      this.$refs['mainWizard'].reset();
      this.dataModel = {
        projectName: '',
        projectDescription : '',
        artifactId: '',
        groupId: '',
        package: '',
        projectVersion: '',
        technology: '',
        technologyVersion: '',
        readme: ''
      };
      notyf.open({type: "warning", message: "Form Has Been Reset!"});
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
    },
    isGeneralSettingsValid(){

      //Toggle Error Messages for General Settings Section

      this.$v.dataModel.projectName.$touch();
      this.$v.dataModel.projectDescription.$touch();
      this.$v.dataModel.artifactId.$touch();
      this.$v.dataModel.groupId.$touch();
      this.$v.dataModel.package.$touch();
      this.$v.dataModel.projectVersion.$touch();
      this.$v.dataModel.technology.$touch();
      this.$v.dataModel.technologyVersion.$touch();
      this.$v.dataModel.readme.$touch();

      //If Any Field Contains an Error then Return & Display Notification

      if( this.$v.dataModel.projectName.$error || this.$v.dataModel.projectDescription.$error || this.$v.dataModel.artifactId.$error || this.$v.dataModel.groupId.$error || this.$v.dataModel.package.$error ||
          this.$v.dataModel.projectVersion.$error || this.$v.dataModel.technology.$error || this.$v.dataModel.technologyVersion.$error || this.$v.dataModel.readme.$error ) {

        notyf.open({type: "error", message: "Form is Invalid!"});

        return new Promise((resolve) => {
          resolve(false);
        });

      }

      return new Promise((resolve) => {
        resolve(true);
      });

    },
    isEntitiesListValid(){

    }
  },
  data () {
    return {
      dataModel: {
        projectName: '',
        projectDescription: '',
        artifactId: '',
        groupId: '',
        package: '',
        projectVersion: '',
        technology: '',
        technologyVersion: '',
        readme: ''
      },
      mainWizardTabs: [
        { name: 'generalSettings', title: 'General Settings', icon: 'fa fa-cogs', beforeChange : () => this.isGeneralSettingsValid()},
        { name: 'entitiesList', title: 'Entities List', icon: 'fa fa-database', beforeChange : () => this.isEntitiesListValid()}
      ],
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
      projectDescription: {
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
  font-weight: bold;
}

.main-wizard-buttons-margin {
  margin-right: 5px;
  margin-left: 5px;
}

.sub-wizard-title {
  font-weight: bold;
  font-size: 18px;
  color: saddlebrown;
}

</style>