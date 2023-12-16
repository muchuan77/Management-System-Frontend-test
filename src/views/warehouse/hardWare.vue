<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="250" max-width="200">
      <el-table-column fixed prop="id" label="Cargo Number" width="150" show-overflow-tooltip/>
      <el-table-column prop="waybillName" label="Waybill Name" width="120" show-overflow-tooltip/>
      <el-table-column prop="waybillTime" label="Waybill Time" width="120" show-overflow-tooltip/>
      <el-table-column prop="consigneeName" label="Consignee Name" width="400" show-overflow-tooltip/>
      <el-table-column prop="waybillDescription" label="Waybill Description" width="120" show-overflow-tooltip/>
      <el-table-column fixed="right" label="Controls" width="120">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.row)"
          >Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="deleteDialogVisible" title="Confirm Deletion">
      <p>Are you sure you want to delete this item?</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmDelete">Confirm</el-button>
      </div>
    </el-dialog>
    <el-button class="mt-4" style="width: 100%" @click="showDialog">
      Add Goods
    </el-button>

    <el-dialog v-model="dialogVisible" title="Add Cargo">
      <el-form ref="addForm" :model="addItemForm" label-width="120px">
        <el-form-item label="Cargo Number" prop="id">
          <el-input v-model="addItemForm.id" style="width: 200px;" :placeholder="getNextIdPlaceholder()"></el-input>
        </el-form-item>
        <el-form-item label="Waybill Name" prop="waybillName">
          <el-input v-model="addItemForm.waybillName" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="Receive Time" prop="receiveTime">
          <el-date-picker v-model="addItemForm.waybillTime" type="datetime" placeholder="Select date" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="Consignee Name" prop="consigneeName">
          <el-input v-model="addItemForm.consigneeName" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="WaybillDescription" prop="waybillDescription">
          <el-input v-model="addItemForm.waybillDescription" style="width: 150px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addItem">Add</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      addItemForm: {
        id: '',
        waybillName: '',
        waybillTime: '',
        consigneeName: '',
        waybillDescription: '',
      },
      deleteDialogVisible: false,
      deleteItemIndex: null,
      lastItemId: 0,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('http://localhost:8081/waybill/list');
        this.tableData = response.data;
        this.lastItemId = Math.max(...this.tableData.map(item => item.id), 0);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    addItem() {
      if (!this.addItemForm.id) {
        this.addItemForm.id = this.lastItemId + 1;
      }
      this.tableData.push({ ...this.addItemForm });

      axios.post('http://localhost:8081/waybill/add', this.addItemForm)
          .then(() => {
            console.log('Successfully added item to the backend.');
          })
          .catch(error => {
            console.error('Error adding item to the backend:', error);
          })
          .finally(() => {
            this.dialogVisible = false;
            this.resetAddItemForm();
          });
    },
    resetAddItemForm() {
      this.addItemForm = {
        id: '',
        waybillName: '',
        receiveTime: '',
        consigneeName: '',
        waybillDescription: '',
      };
    },
    deleteRow(row) {
      this.deleteItemIndex = this.tableData.indexOf(row);
      this.deleteDialogVisible = true;
    },

    confirmDelete() {
      if (this.deleteItemIndex !== null) {
        const waybillIdToDelete = this.tableData[this.deleteItemIndex].id;

        axios.delete(`http://localhost:8081/waybill/${waybillIdToDelete}`)
            .then(() => {
              console.log('Successfully deleted item from the backend.');
            })
            .catch(error => {
              console.error('Error deleting item from the backend:', error);
            })
            .finally(() => {
              this.tableData.splice(this.deleteItemIndex, 1);
              this.deleteDialogVisible = false;
              this.deleteItemIndex = null;
            });
      }
    },
    getNextIdPlaceholder() {
      return `Next Cargo Number: ${this.lastItemId + 1}`;
    },
  },
};
</script>
