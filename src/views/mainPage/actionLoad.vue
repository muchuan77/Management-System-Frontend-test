<template>
  <el-form :model="form" label-width="150px">
    <el-form-item label="Activity Name">
      <el-input v-model="form.activityName" />
    </el-form-item>
    <el-form-item label="Activity Type">
      <el-input v-model="form.activityType" />
    </el-form-item>
    <el-form-item label="Business Location">
      <el-select v-model="form.activityZone" placeholder="Please select a location">
        <el-option label="Warehouse 1" value="warehouseOne" />
        <el-option label="Warehouse 2" value="warehouseTwo" />
        <el-option label="Warehouse 3" value="warehouseThree" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity Time">
      <el-col :span="11">
        <el-date-picker
            v-model="form.activityDate"
            type="date"
            placeholder="Select date"
            style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500"></span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
            v-model="form.activityTime"
            placeholder="Select time"
            style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Resource Request">
      <el-radio-group v-model="form.activityResource">
        <el-radio label="Individual" />
        <el-radio label="Group" />
        <el-radio label="Department" />
        <el-radio label="Company" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity Format">
      <el-input v-model="form.activityForm" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  activityName: '',
  activityZone: '',
  activityDate: '',
  activityTime: '',
  activityType: '',
  activityForm: '',
  activityResource: '',
  status: '',
});

const mergeDateTime = () => {
  const datePart = new Date(form.value.activityDate);
  const timePart = form.value.activityTime;

  if (timePart instanceof Date) {
    datePart.setHours(timePart.getHours(), timePart.getMinutes(), timePart.getSeconds());
  } else {
    // If timePart is in 'HH:mm:ss' string format, split and set hours, minutes, and seconds
    const time = timePart.split(':');
    datePart.setHours(parseInt(time[0]), parseInt(time[1]), parseInt(time[2] || 0));
  }

  // Format the datetime as 'YYYY-MM-DD HH:mm:ss'
  return datePart.getFullYear() + '-' +
      ('0' + (datePart.getMonth() + 1)).slice(-2) + '-' +
      ('0' + datePart.getDate()).slice(-2) + ' ' +
      ('0' + datePart.getHours()).slice(-2) + ':' +
      ('0' + datePart.getMinutes()).slice(-2) + ':' +
      ('0' + datePart.getSeconds()).slice(-2);
};

const onSubmit = async () => {
  try {
    // Merge date and time
    const activityDateTime = mergeDateTime();
    const submitData = {
      ...form.value,
      activityTime: activityDateTime, // Use the merged date and time
    };

    // Send a POST request to the backend API endpoint using Axios
    const response = await axios.post('http://localhost:8081/activity/add', submitData);

    // Handle the response as needed (e.g., display a success message, navigate to another page)
    console.log('Submission successful:', response.data);
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle the error (e.g., show an error message to the user)
  }
}
</script>
