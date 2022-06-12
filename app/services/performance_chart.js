import axios from 'axios';

const baseURL = 'https://fe-task.getsandbox.com';

export default {
  getTeamPerformanceData() {
    return axios.get(`${baseURL}/performance`);
  },
};
