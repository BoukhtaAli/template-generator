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
                <b-table ref="table" striped bordered hover :items="dataModel.entities" :fields="entities_table_fields">
                  <template #cell(superClass)="data">
                      {{ data.value !== null && data.value !== undefined  && data.value !== '' ? data.value : '---' }}
                  </template>
                  <template #cell(embeddable)="data">
                    <b-badge :variant="getColor(data.value.value)" class="px-3">
                      {{ data.value.value }}
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

                <form-wizard title="" subtitle="" next-button-text="Next" color="saddlebrown" shape="tab" ref="entitiesWizard" @on-complete=addEntityToTable()>
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
                              <span class="errorMsg"> name is required, should be in valid format, and should not be duplicated</span>
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
                        <b-col>
                          <i class="fa fa-plus-circle table-icons ml-0" style="color: #17a2b8 !important;" title="add attribute" @click="addAttribute()"/>
                          <i class="fa fa-sync-alt table-icons ml-2" style="color: #ffc107 !important;" title="reset attribute list" @click="refreshAttributeList()"/>
                        </b-col>
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
                            <span class="errorMsg"> name is required, should be in valid format! </span>
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
                          <label class="form-input-label">Data Type :</label>
                          <multiselect
                              :options="attributeTypesOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.dataType.$model"
                              @input="updateProjectSuperEmbeddedClassDropdownList($event, index)"
                          />
                          <div v-if="attribute.dataType.$error">
                            <span class="errorMsg" v-if="!attribute.dataType.ensureNotEmpty"> data type is required! </span>
                          </div>
                        </b-col>
                        <b-col v-if="attribute.dataType.$model.value === 'Object'">
                          <label class="form-input-label">Type :</label>
                          <multiselect
                              :options="superClassEmbeddedDropdownList"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.type.$model"
                          />
                          <div v-if="attribute.type.$error">
                            <span class="errorMsg" v-if="!attribute.type.ensureNotEmpty"> type is required! </span>
                          </div>
                        </b-col>
                        <b-col v-show="attribute.dataType.$model.value === 'Date'">
                          <label class="form-input-label">Type :</label>
                          <multiselect
                              :options="dateOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.type.$model"
                          />
                          <div v-if="attribute.type.$error">
                            <span class="errorMsg" v-if="!attribute.type.ensureNotEmpty"> type is required! </span>
                          </div>
                        </b-col>
                        <b-col v-if="attribute.dataType.$model.value === 'Simple'">
                          <label class="form-input-label">Type :</label>
                          <multiselect
                              :options="simpleTypeOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="attribute.type.$model"
                          />
                          <div v-if="attribute.type.$error">
                            <span class="errorMsg" v-if="!attribute.type.ensureNotEmpty"> type is required! </span>
                          </div>
                        </b-col>
                      </b-row>
                    </template>

                    <!--  Association Settings  -->

                    <template v-if="entitiesTab.name==='associationSettings'">
                      <b-row class="text-center">
                        <b-col v-if="tempEntity.associations.length ===0" class="text-danger font-weight-bold col-12">Association list is not required, but you can add associations by clicking the below button</b-col>
                        <b-col>
                          <i class="fa fa-plus-circle table-icons ml-0" style="color: #17a2b8 !important;" title="add attribute" @click="addAssociation()"/>
                          <i class="fa fa-sync-alt table-icons ml-2" style="color: #ffc107 !important;" title="reset association list" @click="refreshAssociationList()"/>
                        </b-col>
                      </b-row>

                      <b-row v-for="(association, index) in $v.tempEntity.associations.$each.$iter" :key="index" >

                        <b-col class="col-4">
                          <label class="form-input-label">Target :</label>
                          <multiselect
                              :options="associationDropdownList"
                              placeholder="Select Target Entity"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="association.target.$model"
                          />
                          <div v-if="association.target.$error">
                            <span class="errorMsg" v-if="!association.target.required"> target is required! </span>
                          </div>
                        </b-col>

                        <b-col class="col-4">
                          <b-form-group label="Reference Name :" class="form-input-label">
                            <b-form-input
                                v-model="association.referenceName.$model"
                                type="text"
                                placeholder="Enter Reference Name"
                                @blur="association.referenceName.$touch()"
                            />
                            <div v-if="association.referenceName.$error">
                              <span class="errorMsg"> reference name is required and should be in! </span>
                            </div>
                          </b-form-group>
                        </b-col>

                        <b-col class="col-4">
                          <label class="form-input-label">Is Unique item :</label>
                          <multiselect
                              :options="uniqueItemDropdownOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="association.uniqueItem.$model"
                          />
                          <div v-if="association.uniqueItem.$error">
                            <span class="errorMsg" v-if="!association.uniqueItem.ensureNotEmpty"> is unique item information is required! </span>
                          </div>
                        </b-col>

                        <b-col class="col-6">
                          <label class="form-input-label">Cordinality :</label>
                          <multiselect
                              :options="cordinalityDropdownOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="association.cordinality.$model"
                          />
                          <div v-if="association.cordinality.$error">
                            <span class="errorMsg" v-if="!association.cordinality.ensureNotEmpty"> cordinality is required! </span>
                          </div>
                        </b-col>

                        <b-col class="col-6">
                          <label class="form-input-label">Is Association Bi-Directional :</label>
                          <multiselect
                              :options="biDirectionalDropdownOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="association.biDirectional.$model"
                          />
                          <div v-if="association.biDirectional.$error">
                            <span class="errorMsg" v-if="!association.biDirectional.ensureNotEmpty"> direction information is required! </span>
                          </div>
                        </b-col>

                        <b-col class="col-6">
                          <label class="form-input-label">Fetch Type :</label>
                          <multiselect
                              :options="fetchTypeDropdownOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="association.fetchType.$model"
                          />
                          <div v-if="association.fetchType.$error">
                            <span class="errorMsg" v-if="!association.fetchType.ensureNotEmpty"> fetch Type is required! </span>
                          </div>
                        </b-col>

                        <b-col class="col-6">
                          <label class="form-input-label">Cascading Type :</label>
                          <multiselect
                              :options="cascadeTypeDropdownOptions"
                              placeholder="Select an Option"
                              track-by="value"
                              label="label"
                              :searchable="false"
                              :allow-empty="false"
                              :close-on-select="true"
                              :multiple="false"
                              v-model="association.cascadeType.$model"
                          />
                          <div v-if="association.cascadeType.$error">
                            <span class="errorMsg" v-if="!association.cascadeType.ensureNotEmpty"> cascade type is required! </span>
                          </div>
                        </b-col>

                      </b-row>
                    </template>

                  </tab-content>

                  <template slot="footer" slot-scope="entitiesProps">
                    <div class="wizard-footer-left">
                      <wizard-button  v-if="entitiesProps.activeTabIndex > 0" @click.native="entitiesProps.prevTab()" style="background-color: saddlebrown; color: white" :style="entitiesProps.fillButtonStyle">Previous</wizard-button>
                      <wizard-button class="main-wizard-buttons-margin" style="background-color: saddlebrown; color: white" :style="entitiesProps.fillButtonStyle" v-if="!entitiesProps.isLastStep" @click.native="entitiesProps.nextTab()" > Next </wizard-button>
                    </div>
                    <div class="wizard-footer-right">
                      <wizard-button class="main-wizard-buttons-margin"  style="background-color: saddlebrown; color: white" @click.native="onEntitiesWizardReset()"> Reset </wizard-button>
                      <wizard-button class="main-wizard-buttons-margin"  style="background-color: saddlebrown; color: white" v-if="entitiesProps.isLastStep" @click.native="entitiesProps.nextTab()"> Validate </wizard-button>
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
            <wizard-button  v-if="props.activeTabIndex > 0" style="background-color: #17a2b8; color: white" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #17a2b8; color: white" :style="props.fillButtonStyle" v-if="!props.isLastStep" @click.native="props.nextTab()" > Next </wizard-button>
          </div>
          <div class="wizard-footer-right">
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #17a2b8; color: white"> Cancel </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #17a2b8; color: white" @click.native="onReset()"> Reset </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #17a2b8; color: white" v-if="props.isLastStep" @click.native="props.nextTab()"> Preview </wizard-button>
            <wizard-button class="main-wizard-buttons-margin"  style="background-color: #17a2b8; color: white" v-if="props.isLastStep" @click.native="props.nextTab()" > Download </wizard-button>
          </div>
        </template>

      </form-wizard>

    </b-card-text>
  </b-card>
</template>

<script>
import {required,requiredIf} from 'vuelidate/lib/validators';
import {notyf} from "@/notyf";
import ModalMixin from "@/mixins/ModalMixin";

export default {
  name: "Form",
  mixins: [ModalMixin],
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

      this.commonEntityWizardReset();

      notyf.open({type: "warning", message: "Form Has Been Reset!"});
    },
    commonEntityWizardReset(){

      this.$v.tempEntity.$reset();
      this.$refs.entitiesWizard[0].reset();

      this.tempEntity = {
        id: null,
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

      this.$v.tempEntity.associations.$touch();

      if( this.$v.tempEntity.associations.$error ) {

        notyf.open({type: "error", message: "Form is Invalid!"});

        return new Promise((resolve) => {
          resolve(false);
        });

      }

      return new Promise((resolve) => {
        resolve(true);
      });
    },
    captureTableEvents(data, event){

      let temp = {...data};

      switch (event){
        case 'editEntity' :
          this.commonEntityWizardReset();
          this.tempEntity = {...temp};
          break;
        case 'removeEntity' :
          this.showMsgBox('delete').then(
              value => {
                if(value){

                  if(temp.id === this.tempEntity.id){
                    notyf.open({type: "error", message: "Cannot Delete Object Under Modification!"});
                  }else {
                    this.dataModel.entities =  this.dataModel.entities.filter(function(ele){ return ele.name !== temp.name });
                    notyf.open({type: "success", message: "Entities List Updated!"});
                  }
                }
              }
          );
          break;
        case 'cloneEntity' :
          console.log('Clone Event!');
          break;
        case 'displayEntity' :
          console.log('Display Event!');
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
          tempSuperClassDropdownList = this.dataModel.entities.filter(entity => {return entity.embeddable.value === false});
          for (let i = 0; i < tempSuperClassDropdownList.length; i++) {
            this.superClassDropdownList.push(tempSuperClassDropdownList[i].name);
          }
          break;
      }
    },
    updateProjectSuperEmbeddedClassDropdownList(event, key){

      let tempSuperClassDropdownList = [];

      for (let i = 0; i < this.tempEntity.attributes.length; i++) {

        if(i === parseInt(key)){
          this.tempEntity.attributes[i].type = {
            label: '',
            value: ''
          };
        }
      }

      switch (event.value){
        case 'Object':
          this.superClassEmbeddedDropdownList = [];
          tempSuperClassDropdownList = this.dataModel.entities.filter(entity => {return entity.embeddable.value === true});
          for (let i = 0; i < tempSuperClassDropdownList.length; i++) {
            this.superClassEmbeddedDropdownList.push({
              label : tempSuperClassDropdownList[i].name,
              value : tempSuperClassDropdownList[i].name
            });
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
        dataType : {
          label: '',
          value : ''
        },
        type: {
          label: '',
          value : ''
        }
      });
    },
    addAssociation(){

      let tempAssociationDropdownList = this.dataModel.entities.filter(entity => {return entity.embeddable.value === false});

      this.associationDropdownList = [];

      for (let i = 0; i < tempAssociationDropdownList.length; i++) {
        this.associationDropdownList.push(tempAssociationDropdownList[i].name);
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
    },
    addEntityToTable(){

      this.showMsgBox('add').then(
          value => {
            if(value){

              const i = this.dataModel.entities.findIndex(_element => _element.id === this.tempEntity.id);

              if (i > -1){
                this.dataModel.entities[i] = {...this.tempEntity};
              }else {
                this.tempEntity.id = this.dataModel.entities.length;
                this.dataModel.entities.push({...this.tempEntity});
              }

              this.$refs.table[0].refresh();

              this.commonEntityWizardReset();
              notyf.open({type: "success", message: "Entities List Updated!"});

            }
          }
      );
    },
    refreshAttributeList(){
      this.tempEntity.attributes = [];
    },
    refreshAssociationList(){
      this.tempEntity.associations = [];
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

        ]
      },
      tempEntity: {
        id:null,
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
          value: 'PYTHON',
          $isDisabled: true
        }
      ],
      technologiesVersionDropdownsList: [

      ],
      javaTechnologiesVersionDropdownsList:[
          '1.8'
      ],
      entities_table_fields: [
        {
          key: 'name',
          label: 'Class',
          sortable: false
        },
        {
          key: 'superClass',
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
        // {
        //   key: 'clone',
        //   icon: 'fa fa-copy',
        //   class: 'text-info',
        //   label: 'Clone',
        //   actionEvent: 'cloneEntity'
        // },
        // {
        //   key: 'display',
        //   icon: 'fa fa-tv',
        //   class: 'text-secondary',
        //   label: 'Details',
        //   actionEvent: 'displayEntity'
        // },
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
          label: 'Simple',
          value: 'Simple'
        },
        {
          label: 'Date',
          value: 'Date'
        },
        {
          label: 'Object',
          value: 'Object'
        },
      ],
      simpleTypeOptions:[
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
        }
      ],
      dateOptions:[
        {
          label: 'LocalDate',
          value: 'LocalDate'
        },
        {
          label: 'LocalDateTime',
          value: 'LocalDateTime'
        },
        {
          label: 'Timestamp',
          value: 'Timestamp'
        }
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
      associationDropdownList: [
      ],
      uniqueItemDropdownOptions: [
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ],
      cordinalityDropdownOptions: [
        {
          label: 'One to One',
          value: 'OneToOne'
        },
        {
          label: 'One to Many',
          value: 'OneToMany'
        },
        {
          label: 'Many to One',
          value: 'ManyToOne'
        },
        {
          label: 'Many to Many',
          value: 'ManyToMany'
        }
      ],
      biDirectionalDropdownOptions: [
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ],
      fetchTypeDropdownOptions : [
        {
          label: 'Lazy',
          value: 'LAZY'
        },
        {
          label: 'Eager',
          value: 'EAGER'
        }
      ],
      cascadeTypeDropdownOptions : [
        {
          label: 'All',
          value: 'ALL'
        },
        {
          label: 'Detach',
          value: 'DETACH'
        }
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
        required,
        ensureNotDuplicated(data){
          return this.dataModel.entities.filter(entity => { return entity.name === data && entity.id !== this.tempEntity.id}).length === 0;
        },
        isAlpha(value) {
          return /^[A-Za-z]+$/i.test(value)
        }
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
            required,
            isAlpha(value) {
              return /^[A-Za-z]+$/i.test(value)
            }
          },
          modifier: {
            required,
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          dataType: {
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          type: {
            ensureNotEmpty(data){
              return data.value !== '';
            }
          }
        }
      },
      associations: {
        $each: {
          target: {
            required
          },
          uniqueItem: {
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          cordinality: {
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          biDirectional: {
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          referenceName: {
            required,
            isAlpha(value) {
              return /^[A-Za-z]+$/i.test(value)
            }
          },
          cascadeType: {
            ensureNotEmpty(data){
              return data.value !== '';
            }
          },
          fetchType: {
            ensureNotEmpty(data){
              return data.value !== '';
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