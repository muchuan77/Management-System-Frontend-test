<template>
  <div>
    <el-card>
      <div slot="header">
        <h2>员工信息</h2>
      </div>
      <el-button type="primary" @click="showDialog">添加员工</el-button>
      <el-button type="danger" @click="showDeleteDialog">删除员工</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="employeeName" label="人员名称"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="manHour" label="工时"></el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" title="添加员工">
        <el-form ref="formData" :model="form" label-width="80px">
          <el-form-item label="人员名称" prop="employeeName">
            <el-input v-model="form.employeeName"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="工时" prop="manHour">
            <el-input v-model="form.manHour"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveItem">保存</el-button>
        </div>
      </el-dialog>

      <el-dialog v-model="deleteDialogVisible" title="确认删除">
        <el-form ref="deleteFormData" :model="form" label-width="80px">
          <el-form-item label="人员名称" prop="employeeName">
            <select v-model="selectedEmployeeId">
              <option v-for="employee in tableData" :key="employee.id" :value="employee.id">{{ employee.employeeName }}</option>
            </select>
          </el-form-item>
        </el-form>
        <span>是否删除？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmRemoveItem">是</el-button>
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
    this.loadData();
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
        console.error("请选择要删除的员工");
        return;
      }

      try {
        const response = await axios.delete(`http://localhost:8081/employee/${this.selectedEmployeeId}`);
        if (response.data.success) {
          await this.loadData();
          this.selectedEmployeeId = null;
        }
      } catch (error) {
        console.error("删除员工时出错:", error);
      }

      this.deleteDialogVisible = false;
    },
  },
};
</script>

<style>
/* Add styles if needed */
</style>
