<template>
  <div>
    <h1>User Management</h1>

    <!-- Add User Button -->
    <el-button @click="showAddDialog" type="primary">Add User</el-button>
    <!-- Add User Dialog -->
    <el-dialog v-model="addDialogVisible" title="Add User">
      <el-form ref="addFormData" :model="newUser" label-width="80px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="newUser.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="newUser.password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="mailbox">
          <el-input v-model="newUser.mailbox" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="User Type" prop="usertype">
          <el-radio-group v-model="newUser.usertype">
            <el-radio label="master" />
            <el-radio label="employee" />
            <el-radio label="admin" />
            <el-radio label="entrepot" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addUser">Save</el-button>
      </div>
    </el-dialog>

    <!-- User List -->
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="username" label="Username" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mailbox" label="Email" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="password" label="Password" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="usertype" label="User Type" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column fixed= "right" label="Actions" width="120">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="startEdit(scope.row)"
          >Edit
          </el-button>
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteUser(scope.row.id)"
          >Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Edit User Dialog -->
    <el-dialog v-model="editDialogVisible" title="Edit User">
      <el-form ref="editFormData" :model="editUser" label-width="80px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="editUser.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="editUser.password"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="mailbox">
          <el-input v-model="editUser.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="User Type" prop="usertype">
          <el-input v-model="editUser.usertype"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateUser">Save</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      addDialogVisible: false,
      newUser: {
        username: '',
        password: '',
        mailbox: '',
        usertype: ''
      },
      editUser: {
        username: '',
        password: '',
        mailbox: '',
        usertype: ''
      },
      editDialogVisible: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8081/user/list');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    addUser() {
      axios.post('http://localhost:8081/user/add', this.newUser)
          .then(() => {
            this.fetchUsers();
            this.newUser = { username: '', password: '', mailbox: '', usertype: '' };
            this.addDialogVisible = false;
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });
    },
    startEdit(user) {
      this.editUser = { ...user };
      this.editDialogVisible = true;
    },
    updateUser() {
      axios.put(`http://localhost:8081/user/${this.editUser.id}`, {
        username: this.editUser.username,
        mailbox: this.editUser.mailbox,
        password: this.editUser.password,
        usertype: this.editUser.usertype
        // Note: Typically, you shouldn't update the password directly. This is just an example.
      })
          .then(() => {
            this.fetchUsers();
            this.editDialogVisible = false;
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
    },
    deleteUser(userId) {
      axios.delete(`http://localhost:8081/user/${userId}`)
          .then(() => {
            this.fetchUsers();
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
    },
    showAddDialog() {
      this.addDialogVisible = true;
    },
  }
};
</script>

<style>
/* Custom styles */
</style>
