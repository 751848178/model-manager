import { CDN } from "./app.config";

// 请求服务器域名
const prefix = "";

const requestHost = CDN.request + prefix;// "https://console.roadofcloud.com/api";

export const User = {
    login: `${requestHost}/login`, // POST 增加联系人
};

export const Course = {
    list: `${requestHost}/course/list`, // GET 获取科目列表
};

export const Grade = {
    list: `${requestHost}/grade/list`, // GET 获取年级列表
};

export const Type = {
    list: `${requestHost}/type/list`, // GET 获取题目类型列表
};

export const Subject = {
    list: `${requestHost}/subject/list`, // GET 获取题目列表
};

export const Upload = {
    upload: `${requestHost}/upload`, // POST 上传文件
};

export const EmailSMS = {
    // sendVerificationCode: `${requestHost}/general/EmailSMS/sendVerificationCode`, // GET 发送验证码
    // sendImageCode: `${requestHost}/general/EmailSMS/sendImageCode`, // POST 发送图形验证码
    // checkVerifyCode: `${requestHost}/general/EmailSMS/checkVerifyCode`, // POST check验证码是否正确
    // checkImageCode: `${requestHost}/general/EmailSMS/checkImageCode`, // POST check图形验证码是否正确
};

export const Room = {
    // createRoom: `${requestHost}/general/Room/createRoom`, // POST 创建小班课
    // createLiveRoom: `${requestHost}/general/Room/createLiveRoom`, // POST 创建直播
    // createMeetingRoom: `${requestHost}/general/Room/createMeetingRoom`, // POST 创建会议
};

const httpUrls = {
    User,
    Course,
    Subject,
    EmailSMS,
    Room,
    Upload,
};

export default httpUrls;
