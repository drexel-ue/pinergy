import Axios from 'axios';

export const getAwsUrl = img => Axios.post("/api/images/image-upload", { img });