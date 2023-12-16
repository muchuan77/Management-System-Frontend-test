<template>
  <div>
    <el-table :data="activities" style="width: 100%">
      <el-table-column prop="activityName" label="Activity Name"></el-table-column>
      <el-table-column prop="activityTime" label="Activity Time"></el-table-column>
      <el-table-column prop="activityType" label="Activity Type"></el-table-column>
      <el-table-column prop="activityForm" label="Activity Form"></el-table-column>
      <el-table-column prop="activityZone" label="Activity Zone"></el-table-column>
      <el-table-column prop="activityResource" label="Activity Resource"></el-table-column>
      <el-table-column label="Status" width="150">
        <template v-slot="{ row }">
          <el-tag :type="row.status === 'processed' ? 'success' : 'warning'"
                     @click="promptStatusChange(row)">
            {{ row.status === 'processed' ? 'Completed' : 'Pending' }}
          </el-tag>
          <el-button type="text" @click="deleteActivity(row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Confirm Status Change" v-model="statusDialogVisible">
        <div slot="footer" class="dialog-footer">
          <el-button @click="statusDialogVisible = false">cancel</el-button>
          <el-button type="primary" @click="changeStatus">confirm</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activities: [],
      statusDialogVisible: false,
      selectedActivity: null
    };
  },
  mounted() {
    this.fetchActivities();
  },
  methods: {
    async fetchActivities() {
      try {
        const response = await axios.get('http://localhost:8081/activity/list');
        this.activities = response.data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    },
    async deleteActivity(row) {
      try {
        await axios.delete(`http://localhost:8081/activity/${row.id}`);
        this.activities = this.activities.filter(activity => activity.id !== row.id);
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    },
    promptStatusChange(activity) {
      this.selectedActivity = activity;
      this.statusDialogVisible = true;
    },
    async changeStatus() {
      try {
        const newStatus = this.selectedActivity.status === 'processed' ? 'pending' : 'processed';
        await axios.put(`http://localhost:8081/activity/${this.selectedActivity.id}`, { status: newStatus });

        const activity = this.activities.find(a => a.id === this.selectedActivity.id);
        if (activity) {
          activity.status = newStatus;
        }

        this.statusDialogVisible = false;
      } catch (error) {
        console.error('Error changing status:', error);
        this.statusDialogVisible = false;
      }
    }
  }
};
</script>

<style>
/* Add custom styles if needed */
</style>
