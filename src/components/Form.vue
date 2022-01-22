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

              <b-col class="col-4 text-center my-auto">
                <label class="sub-wizard-title">Entities Resume</label>
                <b-table striped bordered hover :items="dataModel.entities" :fields="entities_table_fields">
                  <template #cell(embeddable)="data">
                    <b-badge :variant="getColor(data.value)" class="px-3">
                      {{ data.value }}
                    </b-badge>
                  </template>
                  <template #cell(actions)="data">
                    <div v-if="dataModel.entities !== null & dataModel.entities.length !== 0">
                      <i v-for="rowAction in entities_table_row_actions" :key="rowAction.key" :title="rowAction.label" class="table-icons" @click="captureTableEvents(data.item, rowAction.actionEvent)"
                         :class="`${rowAction.class} ${rowAction.icon}`" />
                    </div>
                  </template>
                </b-table>
              </b-col>

              <b-col class="col-8">
                <p class="sub-wizard-title text-center">Entities Management</p>

                <form-wizard title="" subtitle="" next-button-text="Next" color="#17a2b8" shape="tab" ref="entitiesWizard">
                  <tab-content v-for="(entitiesTab,entitiesIndex) in entitiesWizardTabs" :key="entitiesIndex" :title="entitiesTab.title" :icon="entitiesTab.icon" :before-change="entitiesTab.beforeChange">

                    <template v-if="entitiesTab.name==='generalEntitiesSettings'">
                      <b-row>
                        <b-col>
                          <b-form-group label="Entity Name :" class="form-input-label">
                            <b-form-input
                                v-model="tempEntity.name"
                                @blur="$v.tempEntity.name.$touch()"
                                type="text"
                                placeholder="Enter Entity Name"
                            />
                            <div v-if="$v.tempEntity.name.$error">
                              <span class="errorMsg" v-if="!$v.tempEntity.name.$error.required"> entity name is required! </span>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col>
                          <label class="form-input-label">Is Class Embeddable :</label>
                          <multiselect
                              :options="embeddableOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="tempEntity.embeddable"
                              @blur="$v.tempEntity.embeddable.$touch()"
                          />
                          <div v-if="$v.tempEntity.embeddable.$error">
                            <span class="errorMsg" v-if="!$v.tempEntity.embeddable.$error.required"> embeddable information is required! </span>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <label class="form-input-label">Is Class Serializable :</label>
                          <multiselect
                              :options="serializableOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="tempEntity.serializable"
                              @blur="$v.tempEntity.serializable.$touch()"
                          />
                          <div v-if="$v.tempEntity.serializable.$error">
                            <span class="errorMsg" v-if="!$v.tempEntity.serializable.$error.required"> serializable information is required! </span>
                          </div>
                        </b-col>
                        <b-col>
                          <label class="form-input-label">Implement Equals & Hashcode Methods :</label>
                          <multiselect
                              :options="equalsHashCodeOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="tempEntity.equalsAndHashCode"
                              @blur="$v.tempEntity.equalsAndHashCode.$touch()"
                          />
                          <div v-if="$v.tempEntity.equalsAndHashCode.$error">
                            <span class="errorMsg" v-if="!$v.tempEntity.equalsAndHashCode.$error.required"> equals & hashcode information is required! </span>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row class="mt-1">
                        <b-col class="col-6">
                          <label class="form-input-label">Super Class :</label>
                          <multiselect
                              :options="superClassOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="selectedSuperClassType"
                              @input="updateProjectSuperClassDropdownList($event)"
                          />
                        </b-col>
                        <b-col v-if="selectedSuperClassType !== undefined && selectedSuperClassType.value !== 'PROJECT' && selectedSuperClassType.value !== ''" class="col-6">
                          <b-form-group label="Super Class Name :" class="form-input-label">
                            <b-form-input
                                v-model="tempEntity.superClass"
                                @blur="$v.tempEntity.superClass.$touch()"
                                type="text"
                                placeholder="Enter Super Class Name"
                            />
                            <div v-if="$v.tempEntity.superClass.$error">
                              <span class="errorMsg" v-if="!$v.tempEntity.superClass.$error.required"> super class is required! </span>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col v-if="selectedSuperClassType !== undefined && selectedSuperClassType.value === 'PROJECT' && selectedSuperClassType.value !== ''" class="col-6">
                          <label class="form-input-label">Super Class Name :</label>
                          <multiselect
                              :options="superClassDropdownList"
                              placeholder="Select an Option"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="tempEntity.superClass"
                          />
                          <div v-if="$v.tempEntity.superClass.$error">
                            <span class="errorMsg" v-if="!$v.tempEntity.superClass.$error.required"> super class is required! </span>
                          </div>
                        </b-col>
                      </b-row>
                    </template>

                    <template v-if="entitiesTab.name==='attributeSettings'">
                      <b-row class="text-center">
                        <b-col v-if="tempEntity.attributes.length ===0" class="text-danger font-weight-bold col-12">Attributes list is empty please add at least one element</b-col>
                        <b-col><i class="fa fa-plus-circle table-icons ml-0" style="color: #17a2b8 !important;" title="add attribute" @click="addAttribute()"/></b-col>
                      </b-row>

                      <b-row v-for="(attribute, index) in $v.tempEntity.attributes.$each.$iter" :key="index" >
                        <b-col>
                          <b-form-group label="Name :" class="form-input-label">
                            <b-form-input
                                v-model="attribute.name.$model"
                                type="text"
                                placeholder="Enter Attribute Name"
                                @blur="attribute.name.$touch()"
                            />
                            <div v-if="attribute.name.$error">
                              <span class="errorMsg" v-if="!attribute.name.$error.required"> name is required! </span>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col>
                          <label class="form-input-label">Modifier :</label>
                          <multiselect
                              :options="attributeModifiersOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.modifier.$model"
                          />
                          <div v-if="attribute.modifier.$error">
                            <span class="errorMsg" v-if="!attribute.modifier.ensureNotEmpty"> modifier is required! </span>
                          </div>
                        </b-col>
                        <b-col>
                          <label class="form-input-label">Type :</label>
                          <multiselect
                              :options="attributeTypesOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.type.$model"
                              @input="updateProjectSuperEmbeddedClassDropdownList($event, index)"
                          />
                          <div v-if="attribute.type.$error">
                            <span class="errorMsg" v-if="!attribute.type.ensureNotEmpty"> type is required! </span>
                          </div>
                        </b-col>
                        <b-col v-if="attribute.type.$model.value === 'Object'">
                          <label class="form-input-label">Class Name :</label>
                          <multiselect
                              :options="superClassEmbeddedDropdownList"
                              placeholder="Select an Option"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.className.$model"
                          />
                          <div v-if="attribute.className.$error">
                            <span class="errorMsg" v-if="!attribute.className.ensureNotEmpty"> class is required! </span>
                          </div>
                        </b-col>
                      </b-row>
                    </template>

                    <template v-if="entitiesTab.name==='associationSettings'">
                      <b-row class="text-center">
                        <b-col v-if="tempEntity.associations.length ===0" class="text-danger font-weight-bold col-12">Association list is not required, but you can add associations by clicking the below button</b-col>
                        <b-col><i class="fa fa-plus-circle table-icons ml-0" style="color: #17a2b8 !important;" title="add attribute" @click="addAssociation()"/></b-col>
                      </b-row>
                    </template>

                  </tab-content>

                  <template slot="footer" slot-scope="entitiesProps">
                    <div class="wizard-footer-left">
                      <wizard-button  v-if="entitiesProps.activeTabIndex > 0" @click.native="entitiesProps.prevTab()" :style="entitiesProps.fillButtonStyle">Previous</wizard-button>
                      <wizard-button class="main-wizard-buttons-margin" :style="entitiesProps.fillButtonStyle" v-if="!entitiesProps.isLastStep" @click.native="entitiesProps.nextTab()" > Next </wizard-button>
                    </div>
                    <div class="wizard-footer-right">
                      <wizard-button class="main-wizard-buttons-margin"  style="background-color: #ffc107; color: white" @click.native="onEntitiesWizardReset()"> Reset </wizard-button>
                      <wizard-button class="main-wizard-buttons-margin"  style="background-color: #28a745; color: white" v-if="entitiesProps.isLastStep" @click.native="entitiesProps.nextTab()"> Validate </wizard-button>
                    </div>
                  </template>

                </form-wizard>

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
import {required,requiredIf} from 'vuelidate/lib/validators';
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
        readme: '',
        entities: []
      };

      this.onEntitiesWizardReset();
    },
    onEntitiesWizardReset(){

      this.$v.tempEntity.$reset();
      this.$refs.entitiesWizard[0].reset();

      this.tempEntity = {
        name: '',
        serializable: '',
        superClass: '',
        equalsAndHashCode:'',
        embeddable: '',
        attributes: [],
        associations: []
      };

      this.selectedSuperClassType = {
        label: 'No Selection',
        value: '',
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
      return this.isEntityGeneralSettingsValid() && this.isEntitiesAttributesListValid() && this.isJoinsListValid();
    },
    isEntityGeneralSettingsValid(){

      this.$v.tempEntity.name.$touch();
      this.$v.tempEntity.equalsAndHashCode.$touch();
      this.$v.tempEntity.embeddable.$touch();
      this.$v.tempEntity.serializable.$touch();
      this.$v.tempEntity.superClass.$touch();

      if( this.$v.tempEntity.name.$error || this.$v.tempEntity.superClass.$error || this.$v.tempEntity.equalsAndHashCode.$error || this.$v.tempEntity.embeddable.$error || this.$v.tempEntity.serializable.$error ) {

        notyf.open({type: "error", message: "Form is Invalid!"});

        return new Promise((resolve) => {
          resolve(false);
        });

      }

      return new Promise((resolve) => {
        resolve(true);
      });
    },
    isEntitiesAttributesListValid(){

      this.$v.tempEntity.attributes.$touch();

      if( this.$v.tempEntity.attributes.$error ) {

        notyf.open({type: "error", message: "Form is Invalid!"});

        return new Promise((resolve) => {
          resolve(false);
        });

      }

      return new Promise((resolve) => {
        resolve(true);
      });

    },
    isJoinsListValid(){
      return new Promise((resolve) => {
        resolve(true);
      });
    },
    captureTableEvents(data, event){

      console.log(data);

      switch (event){
        case 'editEntity' :
          console.log('Edit Event!');
          break;
        case 'cloneEntity' :
          console.log('Clone Event!');
          break;
        case 'displayEntity' :
          console.log('Display Event!');
          break;
        case 'removeEntity' :
          console.log('Remove Event!');
          break;
      }
    },
    getColor(value){
        if (value === true ) return 'success'
        if (value === false ) return 'danger'
    },
    updateProjectSuperClassDropdownList(event){

      this.tempEntity.superClass = '';

      let tempSuperClassDropdownList = [];

      switch (event.value){
        case 'PROJECT':
          this.superClassDropdownList = [];
          tempSuperClassDropdownList = this.dataModel.entities.filter(entity => {return entity.embeddable === false});
          for (let i = 0; i < tempSuperClassDropdownList.length; i++) {
            this.superClassDropdownList.push(tempSuperClassDropdownList[i].class_name);
          }
          break;
      }
    },
    updateProjectSuperEmbeddedClassDropdownList(event, key){

      let tempSuperClassDropdownList = [];

      for (let i = 0; i < this.tempEntity.attributes.length; i++) {

        if(i === parseInt(key)){
          this.tempEntity.attributes[i].className = '';
        }
      }

      switch (event.value){
        case 'Object':
          this.superClassEmbeddedDropdownList = [];
          tempSuperClassDropdownList = this.dataModel.entities.filter(entity => {return entity.embeddable === true});
          for (let i = 0; i < tempSuperClassDropdownList.length; i++) {
            this.superClassEmbeddedDropdownList.push(tempSuperClassDropdownList[i].class_name);
          }
          break;
      }
    },
    addAttribute(){
      let size = this.tempEntity.attributes.length;
      this.tempEntity.attributes.push({
        id: size,
        name: '',
        modifier: {
          label: '',
          value : ''
        },
        type : {
          label: '',
          value : ''
        },
        className: ''
      });
    },
    addAssociation(){

      let tempAssociationDropdownList = this.dataModel.entities.filter(entity => {return entity.embeddable === false});

      this.AssociationDropdownList = [];

      for (let i = 0; i < tempAssociationDropdownList.length; i++) {
        this.AssociationDropdownList.push(tempAssociationDropdownList[i].class_name);
      }

      let size = this.tempEntity.associations.length;

      this.tempEntity.associations.push({
        id: size,
        target: '',
        uniqueItem: {
          label: '',
          value : ''
        },
        cordinality : {
          label: '',
          value : ''
        },
        biDirectional: {
          label: '',
          value : ''
        },
        referenceName: '',
        fetchType: {
          label: '',
          value : ''
        },
        cascadeType:{
          label: '',
          value : ''
        }
      });
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
        readme: '',
        entities: [
          {
            class_name : 'Dog',
            super_class: 'Animal',
            embeddable: true
          },
          {
            class_name : 'Cat',
            super_class: 'Animal',
            embeddable: false
          }
        ]
      },
      tempEntity: {
        name: '',
        serializable: '',
        superClass: '',
        equalsAndHashCode:'',
        embeddable: '',
        attributes: [],
        associations : []
      },
      selectedSuperClassType : {
        label: 'No Selection',
        value: '',
      },
      mainWizardTabs: [
        { name: 'generalSettings', title: 'General Settings', icon: 'fa fa-cogs', beforeChange : () => this.isGeneralSettingsValid()},
        { name: 'entitiesList', title: 'Entities List', icon: 'fa fa-database', beforeChange : () => this.isEntitiesListValid()}
      ],
      entitiesWizardTabs:[
        { name: 'generalEntitiesSettings', title: 'Global Information', icon: 'fa fa-info-circle', beforeChange : () => this.isEntityGeneralSettingsValid()},
        { name: 'attributeSettings', title: 'Attributes', icon: 'fa fa-list', beforeChange : () => this.isEntitiesAttributesListValid()},
        { name: 'associationSettings', title: 'Associations List', icon: 'fa fa-map-signs', beforeChange : () => this.isJoinsListValid()},
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
      ],
      entities_table_fields: [
        {
          key: 'class_name',
          label: 'Class',
          sortable: false
        },
        {
          key: 'super_class',
          label: 'Super Class',
          sortable: false
        },
        {
          key: 'embeddable',
          label: 'Embeddable',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        }
      ],
      entities_table_row_actions: [
        {
          key: 'edit',
          icon: 'fa fa-edit',
          class: 'text-primary',
          label: 'Edit',
          actionEvent: 'editEntity'
        },
        {
          key: 'clone',
          icon: 'fa fa-copy',
          class: 'text-info',
          label: 'Clone',
          actionEvent: 'cloneEntity'
        },
        {
          key: 'display',
          icon: 'fa fa-tv',
          class: 'text-secondary',
          label: 'Details',
          actionEvent: 'displayEntity'
        },
        {
          key: 'remove',
          icon: 'fa fa-minus',
          class: 'text-danger',
          label: 'Remove',
          actionEvent: 'removeEntity'
        }
      ],
      serializableOptions : [
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ],
      equalsHashCodeOptions : [
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ],
      embeddableOptions : [
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ],
      superClassOptions: [
        {
          label: 'No Selection',
          value: '',
        },
        {
          label: 'Java',
          value: 'JAVA'
        },
        {
          label: 'Spring Boot',
          value: 'SPRING_BOOT'
        },
        {
          label: 'Project',
          value: 'PROJECT'
        }
      ],
      superClassDropdownList : [

      ],
      superClassEmbeddedDropdownList: [

      ],
      attributeTypesOptions: [
        {
          label: 'Integer',
          value: 'int'
        },
        {
          label: 'Float',
          value: 'float'
        },
        {
          label: 'Long',
          value: 'long'
        },
        {
          label: 'Double',
          value: 'double'
        },
        {
          label: 'Boolean',
          value: 'boolean'
        },
        {
          label: 'Character',
          value: 'char'
        },
        {
          label: 'String',
          value: 'String'
        },
        {
          label: 'Date',
          value: 'date'
        },
        {
          label: 'DateTime',
          value: 'dateTime'
        },
        {
          label: 'Timestamp',
          value: 'timestamp'
        },
        {
          label: 'Object',
          value: 'Object'
        },
      ],
      attributeModifiersOptions: [
        {
          label: 'Public',
          value: 'public'
        },
        {
          label: 'Private',
          value: 'private'
        }
      ],
      AssociationDropdownList: [
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
      },
      entities: {
        required
      }
    },
    tempEntity: {
      name: {
        required
      },
      serializable: {
        required
      },
      superClass: {
        required : requiredIf(function () {return this.selectedSuperClassType !== undefined && this.selectedSuperClassType.value !== '' })
      },
      equalsAndHashCode: {
        required
      },
      embeddable: {
        required
      },
      attributes: {
        required,
        $each: {
          name: {
            required
          },
          modifier: {
            required,
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          type: {
            required,
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          className: {
            ensureNotEmpty(data, currentRow){
              return currentRow.type.value === 'Object' ? data !== undefined && data!=='' : true;
            }
          }
        }
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

.table-icons {
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}

</style>