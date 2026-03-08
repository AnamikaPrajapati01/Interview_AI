import express from "express"
import authUser from "../middleware/auth.middleware.js"
import interviewController from "../controllers/interview.controller.js"
import upload from "../middleware/file.middleware.js"


const interviewRouter = express.Router()


interviewRouter.post("/", authUser, upload.single("resume"), interviewController.generateInterViewReportController)


interviewRouter.get("/report/:interviewId", authUser, interviewController.getInterviewReportByIdController)


interviewRouter.get("/", authUser, interviewController.getAllInterviewReportsController)


interviewRouter.post("/resume/pdf/:interviewReportId", authUser, interviewController.generateResumePdfController)



export default interviewRouter;