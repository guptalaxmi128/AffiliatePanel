
import * as api from "../../api";
import { ADD_VIDEO, ADD_VIDEO_THUMBNAIL,DELETE_VIDEO, ADD_EMBED_VIDEO } from "../../constants/actionTypes";

export const addVideo = (formData) => async (dispatch) => {
    try {
     console.log(formData)
     const lessonId = formData.get("lessonId");
     const response = await api.addVideo(formData, lessonId);
      dispatch({ type: ADD_VIDEO, payload:response.data  });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const addVideoThumbnail = (formData) => async (dispatch) => {
    try {
     console.log(formData)
     const id = formData.get("id");
     const response = await api.addVideoThumbnail(formData, id);
      dispatch({ type: ADD_VIDEO_THUMBNAIL, payload:response.data  });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteVideo = (id) => async (dispatch) => {
    try {
      const response = await api.deleteVideo(id);
      dispatch({ type: DELETE_VIDEO, payload: id });
      return response.data;
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // export const getVideoProcessing = (lessonVideoId) => async (dispatch) => {
  //   try {
  //     const { data } = await api.getVideoProcessing(lessonVideoId);
  //     dispatch({ type: GET_VIDEO_PROCESSING, payload: data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  export const addEmbedVideo = (embedInfo) => async (dispatch) => {
    try {
    //  console.log(formData)
    //  const lessonId = formData.get("lessonId");
     const response = await api.addEmbedVideo(embedInfo);
      dispatch({ type: ADD_EMBED_VIDEO, payload:response.data  });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };