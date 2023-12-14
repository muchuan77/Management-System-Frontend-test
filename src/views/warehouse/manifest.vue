<template>
  <div>
    <el-card>
      <div slot="header">
        <h2>仓库货单</h2>
      </div>
      <el-button type="primary" @click="showDialog">添加</el-button>
      <el-button type="danger" @click="showDeleteDialog">删除</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="cargoName" label="货品名称"></el-table-column>
        <el-table-column prop="typeName" label="货品类别"></el-table-column>
        <el-table-column prop="weight" label="货品重量"></el-table-column>
        <el-table-column prop="entryTime" label="进库时间"></el-table-column>
        <el-table-column prop="outboundTime" label="出库时间"></el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" title="添加货单">
        <el-form ref="formData" :model="form" label-width="80px">
          <el-form-item label="货品名称" prop="productName">
            <el-input v-model="form.cargoName"></el-input>
          </el-form-item>
          <el-form-item label="货品类别" prop="typeName">
            <el-input v-model="form.typeName"></el-input>
          </el-form-item>
          <el-form-item label="货品重量" prop="weight">
            <el-input v-model.number="form.weight" ></el-input>
          </el-form-item>
          <el-form-item label="进库时间" prop="entryTime">
            <el-date-picker type="datetime"  v-model="form.entryTime" placeholder="选择日期" value-format='YYYY-MM-DD HH:mm:ss'></el-date-picker>
          </el-form-item>
          <el-form-item label="出库时间" prop="outboundTime">
            <el-date-picker type="datetime"  v-model="form.outboundTime" placeholder="选择日期" value-format='YYYY-MM-DD HH:mm:ss'></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveItem">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="deleteDialogVisible" title="确认删除">
        <el-form ref="deleteFormData" :model="form" label-width="80px">
          <el-form-item label="货品名称" prop="productName">
            <select v-model="selectedDepotId">
              <option v-for="depot in tableData" :key="depot.id" :value="depot.id">{{ depot.cargoName }}</option>
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
            console.error("获取数据时出错：", error);
          });
    },


    async confirmRemoveItem() {
      if (!this.selectedDepotId) {
        console.error("请选择要删除的用户");
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
        console.error("删除用户时出错:", error)
      })
    },
  },
};
</script>

<style>
/* Add styles if needed */
</style>
In this modification: