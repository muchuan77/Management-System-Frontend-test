<template>
  <div>
    <el-card>
      <div slot="header">
        <h2>Employee Information</h2>
      </div>
      <el-button type="primary" @click="showDialog">Add Employee</el-button>
      <el-button type="danger" @click="showDeleteDialog">Delete Employee</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="employeeName" label="Employee Name"></el-table-column>
        <el-table-column prop="age" label="Age"></el-table-column>
        <el-table-column prop="gender" label="Gender"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
        <el-table-column prop="manHour" label="Man Hour"></el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" title="Add Employee">
        <el-form ref="formData" :model="form" label-width="120px">
          <el-form-item label="Employee Name" prop="employeeName">
            <el-input v-model="form.employeeName"></el-input>
          </el-form-item>
          <el-form-item label="Age" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="Gender" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">Male</el-radio>
              <el-radio label="female">Female</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Address" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="Man Hour" prop="manHour">
            <el-input v-model="form.manHour"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveItem">Save</el-button>
        </div>
      </el-dialog>

      <el-dialog v-model="deleteDialogVisible" title="Confirm Deletion">
        <el-form ref="deleteFormData" :model="form" label-width="80px">
          <el-form-item label="Employee Name" prop="employeeName">
            <select v-model="selectedEmployeeId">
              <option v-for="employee in tableData" :key="employee.id" :value="employee.id">{{ employee.employeeName }}</option>
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
      dialogVisible: false,
      deleteItemIndex: '',
      form: {
        id: '',
        employeeName: '',
        age: '',
        gender: 'male',
        address: '',
        manHour: ''
      },
      selectedEmployeeId: null,
      deleteDialogVisible: false
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('http://localhost:8081/employee/list');
        this.tableData = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async saveItem() {
      if (await this.$refs.formData.validate()) {
        try {
          const response = await axios.post('http://localhost:8081/employee/add', this.form);
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
        employeeName: '',
        age: '',
        gender: 'male',
        address: '',
        manHour: ''
      };
    },
    editItem(row) {
      console.log('Edit item:', row);
      // Implement editing logic if needed
    },
    removeItem(row) {
      this.deleteItemIndex = this.tableData.indexOf(row);
      this.showDeleteDialog();
    },
    showDeleteDialog() {
      this.deleteDialogVisible = true;
    },
    async confirmRemoveItem() {
      if (!this.selectedEmployeeId) {
        console.error("Please select the employee to delete");
        return;
      }

      try {
        const response = await axios.delete(`http://localhost:8081/employee/${this.selectedEmployeeId}`);
        if (response.data.success) {
          await this.loadData();
          this.selectedEmployeeId = null;
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }

      this.deleteDialogVisible = false;
    },
  },
};
</script>

<style>
/* Add styles if needed */
</style>
