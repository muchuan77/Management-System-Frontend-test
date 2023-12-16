<template>
  <div>
    <el-card>
      <div slot="header">
        <h2>Warehouse Cargo List</h2>
      </div>
      <el-button type="primary" @click="showDialog">Add</el-button>
      <el-button type="danger" @click="showDeleteDialog">Delete</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="cargoName" label="Cargo Name"></el-table-column>
        <el-table-column prop="typeName" label="Cargo Type"></el-table-column>
        <el-table-column prop="weight" label="Cargo Weight"></el-table-column>
        <el-table-column prop="entryTime" label="Entry Time"></el-table-column>
        <el-table-column prop="outboundTime" label="Outbound Time"></el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" title="Add Cargo">
        <el-form ref="formData" :model="form" label-width="120px">
          <el-form-item label="Cargo Name" prop="cargoName">
            <el-input v-model="form.cargoName"></el-input>
          </el-form-item>
          <el-form-item label="Cargo Type" prop="typeName">
            <el-input v-model="form.typeName"></el-input>
          </el-form-item>
          <el-form-item label="Cargo Weight" prop="weight">
            <el-input v-model.number="form.weight" ></el-input>
          </el-form-item>
          <el-form-item label="Entry Time" prop="entryTime">
            <el-date-picker type="datetime"  v-model="form.entryTime" placeholder="Select date" value-format='YYYY-MM-DD HH:mm:ss'></el-date-picker>
          </el-form-item>
          <el-form-item label="Outbound Time" prop="outboundTime">
            <el-date-picker type="datetime"  v-model="form.outboundTime" placeholder="Select date" value-format='YYYY-MM-DD HH:mm:ss'></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveItem">Save</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="deleteDialogVisible" title="Confirm Deletion">
        <el-form ref="deleteFormData" :model="form" label-width="80px">
          <el-form-item label="Cargo Name" prop="cargoName">
            <select v-model="selectedDepotId">
              <option v-for="depot in tableData" :key="depot.id" :value="depot.id">{{ depot.cargoName }}</option>
            </select>
          </el-form-item>
        </el-form>
        <span>Are you sure you want to delete?</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="confirmRemoveItem">Yes</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      cargoNameArray: [],
      dialogVisible: false,
      deleteItemIndex: '',
      form: {
        id: '',
        cargoName: '',
        typeName: '',
        weight: 0.0,
        entryTime: '',
        outboundTime: '',
      },
      selectedDepotId: null,
      deleteDialogVisible: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('http://localhost:8081/depot/list');
        console.log(response);
        this.tableData = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async saveItem() {
      if (await this.$refs.formData.validate()) {
        try {
          const response = await axios.post('http://localhost:8081/depot/add', this.form, );
          console.log('Response from server:', response.data);
          if (response.data.success) {
            this.tableData.push(response.data.form);
          }

          this.dialogVisible = false;
          this.resetForm();
        } catch (error) {
          console.error('Error adding data:', error);
        }
      }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    resetForm() {
      this.form = {
        id: '',
        cargoName: '',
        typeName: '',
        weight: 0.0,
        entryTime: '',
        outboundTime: '',
      };
    },
    editItem(row) {
      console.log('Edit item:', row);
      // Implement editing logic if needed
    },
    removeItem(row) {
      this.deleteItemIndex = this.tableData.data.indexOf(row);
      this.showDeleteDialog();
    },
    showDeleteDialog() {
      this.deleteDialogVisible = true;
    },
    fetchData() {
      axios
          .get("http://localhost:8081/depot/list")
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    },


    async confirmRemoveItem() {
      if (!this.selectedDepotId) {
        console.error("Please select the cargo to delete");
        return;
      }

      axios
          .delete(`http://localhost:8081/depot/${this.selectedDepotId}`)
          .then((response) => {
            console.log(response.data)
            this.fetchData()
            this.selectedDepotId = null
          })
          .catch((error) => {
            console.error("Error deleting cargo:", error)
          })
    },
  },
};
</script>

<style>
/* Add styles if needed */
</style>
