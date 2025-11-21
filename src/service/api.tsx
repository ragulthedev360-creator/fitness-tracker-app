import axiosInstance from "./axios";


export const userLogin = (body: any) => {
  return axiosInstance.post('auth/login', body);
};
export const userRegister = (body: any) => {
  return axiosInstance.post('auth/register', body);

};
export const updateUserProfile = (body: any) => {
  return axiosInstance.post('profile/updateUserProfile', body);
};
export const userexerciseList = () => {
  return axiosInstance.post('profile/exercise_details');

};
export const getExercisesDetails = (body: any) => {
  return axiosInstance.post('profile/getExercisesDetailsById', body);
};
export const addSession = (body: any) => {
  return axiosInstance.post('exerciseTracker/saveWorkoutLog', body);
};

export const workoutHistory = () => {
  return axiosInstance.post('exerciseTracker/historyWorkoutLog');
};