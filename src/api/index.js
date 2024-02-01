import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL:"https://affiliate-indian.onrender.com/",
  // baseURL:"http://3.224.85.30/",
});

api.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).authToken
      }`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addAdmin = (userInfo) => api.post(`api/admin/register`, userInfo);
export const loginAdmin = (userInfo) => api.post(`api/admin/login`, userInfo);

export const loginUser = (userInfo) => api.post(`api/user/login`, userInfo);
export const registerUser = (userInfo) =>
  api.post(`api/user/register`, userInfo);
export const getUser = () => api.get(`api/user/users`);
export const changePassword = (password) => {
  return api.post(`api/user/changePassword`, password);
};
export const getAllCourseUser = () => api.get(`api/user/courses`);
export const getUserCourse = () => api.get(`api/user/myCourses`);
export const addPayment = (paymentInfo) => {
  const { id, ...data } = paymentInfo;
  return api.post(`api/user/createPayment/${id}`, data);
};
export const getUserSection = (courseId) =>
  api.get(`api/user/sections/${courseId}`);
export const getUserLesson = (id) => api.get(`api/user/lesson/${id}`);
export const getUserQuiz = (lessonId) => api.get(`api/user/quizs/${lessonId}`);
export const getResult = (lessonId) =>
  api.get(`api/user/results`, {
    params: {
      lessonId,
    },
  });

export const addCourse = (courseInfo) => {
  return api.post(`api/admin/createCourse`, courseInfo);
};
export const getCourse = () => api.get(`api/admin/myCourses`);
export const publishCourse = (id) => {
  return api.put(`api/admin/publicCourse/${id}`);
};
export const updateCourse = ({ id, ...updatedData }) => {
  return api.put(`api/admin/updateCourse/${id}`, updatedData);
};

export const unPublishCourse = (id) => {
  return api.put(`api/admin/unPublicCourse/${id}`);
};
export const addCourseImage = (formData, id) => {
  return api.put(`api/admin/addOrUpdateCourseImage/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addSection = (sectionInfo) => {
  return api.post(`api/admin/createSection`, sectionInfo);
};
export const publishSection = (id) => {
  return api.put(`api/admin/publicSection/${id}`);
};
export const unPublishSection = (id) => {
  return api.put(`api/admin/unPublicSection/${id}`);
};

export const allowAffiliateCourse = (id) => {
  return api.put(`api/admin/allowAffiliateCourse/${id}`);
};

export const disAllowAffiliate = (id) => {
  return api.put(`api/admin/disAllowAffiliateCourse/${id}`);
};

export const addLessons = (lessonInfo) => {
  return api.post(`api/admin/createLesson`, lessonInfo);
};
export const updateLesson = ({ id, ...updatedData }) => {
  return api.put(`api/admin/updateLesson/${id}`, updatedData);
};

export const getSectionById = (courseId) =>
  api.get(`api/admin/sections/${courseId}`);
export const getLessonById = (id) => api.get(`api/admin/lesson/${id}`);
export const publishLesson = (id) => {
  return api.put(`api/admin/publicLesson/${id}`);
};

export const unPublishLesson = (id) => {
  return api.put(`api/admin/unPublicLesson/${id}`);
};

export const addVideo = (formData, lessonId) => {
  return api.post(`api/admin/uploadVideo/${lessonId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const addVideoThumbnail = (formData, id) => {
  return api.put(`api/admin/addOrUpdateThumbNail/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addPdf = (formData, lessonId) => {
  return api.post(`api/admin/addPDF/${lessonId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addCoupon = (coupon) => {
  return api.post(`api/admin/createCoupon`, coupon);
};
export const getCoupon = () => api.get(`api/admin/coupons`);

export const addQuiz = ({ lessonId, ...quiz }) => {
  return api.post(`api/admin/createQuiz/${lessonId}`, quiz);
};
export const getQuiz = (lessonId) => api.get(`api/admin/quizs/${lessonId}`);

export const updateQuiz = ({ id, ...quizInfo }) => {
  return api.put(`api/admin/updateQuiz/${id}`, quizInfo);
};

export const addAuthorDetails = (formData, id) => {
  return api.put(`api/admin/addOrUpdateAuthorImage/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addCouponToCourse = (updatedData) => {
  return api.put(`api/admin/addCouponToCourses`, updatedData);
};

export const deleteVideo = (id) =>
  api.delete(`api/admin/hardDeleteVideo/${id}`);
export const deletePdf = (id) => api.delete(`api/admin/hardDeletePDF/${id}`);
export const deleteQuiz = (id) => api.delete(`api/admin/hardDeleteQuiz/${id}`);
export const deleteLesson = (id) =>
  api.delete(`api/admin/hardDeleteLesson/${id}`);
export const deleteSection = (id) =>
  api.delete(`api/admin/hardDeleteSection/${id}`);
export const deleteCourse = (id) =>
  api.delete(`api/admin/hardDeleteCourse/${id}`);

export const updateUser = (updatedData) => {
  return api.put(`api/user/update`, updatedData);
};

export const submitQuizAnswer = (answerInfo) => {
  return api.post(`api/user/submitAnswer`, answerInfo);
};

export const updateSection = ({ id, ...updatedData }) => {
  return api.put(`api/admin/updateSection/${id}`, updatedData);
};

export const addUpsell = (upsell) => {
  return api.post(`api/admin/addUpSell`, upsell);
};

export const addUserAccount = (accountInfo) => {
  return api.post(`api/user/addAccountDetails`, accountInfo);
};
export const getUserAccount = () => api.get(`api/user/findUserAccountDetails`);
export const updateUserAccount = ({ id, ...updatedData }) => {
  return api.put(`api/user/updateAccountDetails/${id}`, updatedData);
};

export const getCourseById = (id) => api.get(`api/admin/courses/${id}`);
export const addRatio = (ratioInfo) => {
  return api.post(`api/admin/addRatio`, ratioInfo);
};
export const getRatio = () => api.get(`api/admin/ratios`);

export const getUserCoupon = () => api.get(`api/user/coupons`);
export const updateUserCoupon = (updatedData) => {
  return api.put(`api/user/applyCouponToCourse`, updatedData);
};

export const updateCoupon = ({ id, ...updatedData }) => {
  return api.put(`api/admin/UpdateCoupon/${id}`, updatedData);
};

export const deleteCoupon = (id) =>
  api.delete(`api/admin/hardDeleteCoupon/${id}`);
export const deleteRatio = (id) =>
  api.delete(`api/admin/hardDeleteRatio/${id}`);
export const deleteUpsell = (id) => api.delete(`api/admin/deleteUpSell/${id}`);

export const updateRatio = ({ id, ...ratioInfo }) => {
  return api.put(`api/admin/UpdateRatio/${id}`, ratioInfo);
};

export const addTemplate = (formData) => {
  return api.post(`api/admin/addTemplate`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getTemplate = () => api.get(`api/admin/templates`);
export const deleteTemplate = (id) =>
  api.delete(`api/admin/hardDeleteTemplate/${id}`);

export const addAssignment = ({ id, ...assignment }) => {
  return api.post(`api/admin/createAssignment/${id}`, assignment);
};

export const getAssignment = (id) =>
  api.get(`api/admin/getAssignmentAnswer/${id}`); //this api is working fine but not apply this api on UI this time User Id not send

export const getUserAssignment = (id) =>
  api.get(`api/user/getAssignmentAnswer/${id}`); //this api is working fine but not apply this api on UI this time
export const addUserAssignment = ({ id, ...assignment }) => {
  return api.post(`api/user/submitAssignmentAnswer/${id}`, assignment);
};

export const addForm = (formInfo) => {
  return api.post(`api/admin/addForm`, formInfo);
};
export const getForm = () => api.get(`api/admin/forms`);
export const addSendOtp = (otp) => {
  return api.post(`api/user/sendOTP`, otp);
};

export const verifyOtp = (otp) => {
  return api.post(`api/user/verifyOTP`, otp);
};

export const generatePassword = (passwordInfo) => {
  return api.post(`api/user/generatePassword`, passwordInfo);
};

export const addScheduleCall = (callInfo) => {
  return api.post(`api/admin/createSchedule`, callInfo);
};

export const getMyBooking = (date) =>
  api.get(`api/admin/pausedSchedule`, {
    params: {
      date,
    },
  });

export const getScheduleBooking = (date) =>
  api.get(`api/admin/unPausedSchedule`, {
    params: {
      date,
    },
  });

export const getUserSchdeduleCall = (adminId) => {
  // console.log("adminId in API call:", adminId);
  return api.get(`api/user/schedules`, {
    params: { adminId },
  });
};

export const addUserScheduleCall = (id) => {
  return api.post(`api/user/bookSchedule/${id}`);
};

export const addUserAffiliateLink = (assignmentId) => {
  return api.post(`api/user/sendAffiliateUserIdRequest/${assignmentId}`);
};
export const getLinkRequest = () =>
  api.get(`api/admin/getAffiliateUserIdRequest`);
export const updateAcceptRequest = (id) => {
  return api.put(`api/admin/acceptAffiliateUserIdRequest/${id}`);
};

export const updateBlockRequest = (id) => {
  return api.put(`api/admin/blockAffiliateUserIdRequest/${id}`);
};

export const updateUnblockRequest = (id) => {
  return api.put(`api/admin/unblockAffiliateUserIdRequest/${id}`);
};

export const getAffiliateUserId = (courseId) => {
  return api.get(`api/user/getAffiliateUserId/${courseId}`);
};

export const addPpt = (formData, lessonId) => {
  return api.post(`api/admin/addResource/${lessonId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAdminUser = (params) => api.get(`api/admin/myUsers`,{params});

export const updateBlockUser = (id) => {
  return api.put(`api/admin/blockUser/${id}`);
};

export const updateUnblockUser = (id) => {
  return api.put(`api/admin/unBlockUser/${id}`);
};

export const getAdminBlockUser = (params) => api.get(`api/admin/myBlockUsers`,{params});
export const addSaleLink = (saleInfo) => {
  return api.post(`api/user/generateSaleLinkCode`, saleInfo);
};

// export const getVideoProcessing = (lessonVideoId) =>
// api.get(`api/admin/videoProcessing/${lessonVideoId}`);

export const addEmbedVideo = ({ lessonId, ...embedInfo }) => {
  return api.post(`api/admin/uploadVideoEmbeddedCode/${lessonId}`, embedInfo);
};

export const addAdminSaleLink = (saleInfo) => {
  return api.post(`api/admin/generateSaleLinkCode`, saleInfo);
};

export const getCourseByTitle = (id) =>{
 return api.get(`api/user/courses/${id}`);
}

export const getPublicCourse = () => api.get(`api/courses`);

export const addText = ({ lessonId, ...textInfo }) => {
  return api.post(`api/admin/addLessonText/${lessonId}`, textInfo);
};

export const deleteText = (id) =>
  api.delete(`api/admin/hardDeleteLessonText/${id}`);

  export const updateText = ({ id, ...textInfo }) => {
    return api.put(`api/admin/updateLessonText/${id}`, textInfo);
  };

  export const deleteAssignment = (id) =>
  api.delete(`api/admin/hardDeleteAnswer/${id}`);

  export const addNewUser = (userInfo) => {
    return api.post(`api/admin/addUserToCourse`, userInfo);
  };

  export const addBulkUserToCourse = (userInfo) => {
    return api.post(`api/admin/bulkUserAddToCourse`, userInfo);
  };