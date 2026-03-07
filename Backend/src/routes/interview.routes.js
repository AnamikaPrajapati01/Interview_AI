import express from "express"
import authMiddleware from "../middleware/auth.middleware"
import interviewController from "../controllers/interview.controller"
import upload from "../middleware/file.middleware"


const interviewRouter = express.Router()


interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)


interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)



export default interviewRouter;