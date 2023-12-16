<template>
  <div>
    <el-card>
      <div slot="header">
        <h2>Warehouse Invoices</h2>
      </div>
      <el-button type="primary" @click="showDialog">Add</el-button>
      <el-button type="danger" @click="showDeleteDialog">Delete</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <!-- Existing table columns -->
        <el-table-column prop="id" label="Invoice Number" width="120"></el-table-column>
        <el-table-column prop="productName" label="Product Name"></el-table-column>
        <el-table-column prop="quantity" label="Quantity"></el-table-column>
        <el-table-column prop="productNumber" label="Product Number"></el-table-column>
        <el-table-column prop="productAddress" label="Product Address"></el-table-column>
        <el-table-column label="Action" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="editItem(scope.row)">Edit</el-button>
            <el-button type="text" @click="removeItem(scope.$index)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Dialog for data input -->
      <el-dialog v-model="dialogVisible" title="Add Invoice">
        <el-form ref="formData" :model="form" label-width="80px">
          <!-- Existing form items -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveItem">Save</el-button>
        </div>
      </el-dialog>

      <!-- Dialog for deletion -->
      <el-dialog v-model="deleteDialogVisible" title="Confirm Deletion">
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
export default {
  data() {
    return {
      // Existing data
      deleteDialogVisible: false,
      deleteProductNumber: null,
    };
  },
  methods: {
    // Existing methods

    // Show dialog for deletion
    showDeleteDialog() {
      this.deleteDialogVisible = true;
    },

    // Confirm removal
    confirmRemoveItem() {
      // Remove item based on product number
      const index = this.tableData.findIndex(item => item.productNumber === this.deleteProductNumber);
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }

      // Reset values
      this.deleteProductNumber = null;
      this.deleteDialogVisible = false;
    },
  },
};
</script>

<style>
/* Add styles if needed */
</style>
