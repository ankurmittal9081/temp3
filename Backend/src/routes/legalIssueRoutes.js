// import { Router } from 'express';
// import LegalIssue from '../models/LegalIssue.js';
// // import Notification from '../models/Notification.js'; // <-- REMOVED: This was causing the error
// import { softDeleteById } from '../utils/helpers.js';

// const router = Router();

// // Create a new legal issue for the logged-in user
// router.post('/', async (req, res, next) => {
//   try {
//     const issue = await LegalIssue.create({
//       ...req.body,
//       userId: req.user._id,
//       isDeleted: false
//     });
//     res.status(201).json(issue);
//   } catch (err) {
//     next(err);
//   }
// });

// // This route is for admins to get ALL issues.
// router.get('/', async (req, res, next) => {
//   try {
//     const issues = await LegalIssue.find({ isDeleted: false });
//     res.json(issues);
//   } catch (err) {
//     next(err);
//   }
// });

// // PUT route for updating an issue
// router.put('/:id', async (req, res, next) => {
//     try {
//         const issueId = req.params.id;
        
//         const updatedIssue = await LegalIssue.findByIdAndUpdate(
//             issueId,
//             req.body,
//             { new: true }
//         );

//         if (!updatedIssue) {
//             return res.status(404).json({ message: 'Issue not found' });
//         }

//         // ===================================================================
//         //  REMOVED: All notification-related logic has been commented out
//         //  or removed since the feature was skipped.
//         // ===================================================================
//         // if (status) {
//         //     const message = `The status of your issue "${updatedIssue.issueType}" has been updated to ${status}.`;
//         //     const notification = await Notification.create({...});
//         //     // Socket logic would go here
//         // }
        
//         res.json(updatedIssue);
//     } catch (err) {
//         next(err);
//     }
// });

// // Soft delete a legal issue
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const issue = await softDeleteById(LegalIssue, req.params.id);
//     res.json({ message: 'Legal Issue soft-deleted successfully', issue });
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;
import { Router } from "express"
import LegalIssue from "../models/LegalIssue.js"
import Document from "../models/Document.js"
import { softDeleteById } from "../utils/helpers.js"

const router = Router()

// Create new legal issue
router.post("/", async (req, res, next) => {
  try {
    const issue = await LegalIssue.create({
      ...req.body,
      userId: req.user._id,
      isDeleted: false,
    })

    const populatedIssue = await LegalIssue.findById(issue._id)
      .populate("userId", "fullName email")
      .populate("kiosk", "location village district")
      .populate("assignedParalegal", "user phoneNumber areasOfExpertise")

    res.status(201).json({ success: true, data: populatedIssue })
  } catch (err) {
    next(err)
  }
})

// Get all issues (admin) or user-specific issues
router.get("/", async (req, res, next) => {
  try {
    const query = { isDeleted: false }

    // If not admin, only show user's issues
    if (req.user.role !== "admin") {
      query.userId = req.user._id
    }

    const issues = await LegalIssue.find(query)
      .populate("userId", "fullName email phoneNumber")
      .populate("kiosk", "location village district operatorName")
      .populate("assignedParalegal", "user phoneNumber areasOfExpertise")
      .sort({ createdAt: -1 })

    res.json({ success: true, data: issues })
  } catch (err) {
    next(err)
  }
})

// Get single issue with full details - FIXED
router.get("/:id", async (req, res, next) => {
  try {
    const query = { _id: req.params.id, isDeleted: false }

    // If not admin, ensure user can only see their own issues
    if (req.user.role !== "admin") {
      query.userId = req.user._id
    }

    const issue = await LegalIssue.findOne(query)
      .populate("userId", "fullName email phoneNumber aadhaarNumber")
      .populate("kiosk", "location village district operatorName organizationType organizationName")
      .populate({
        path: "assignedParalegal",
        populate: {
          path: "user",
          select: "fullName email",
        },
      })

    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" })
    }

    // Get related documents
    const documents = await Document.find({ issueId: issue._id, isDeleted: false }).select(
      "documentType fileUrl submissionStatus createdAt",
    )

    const issueWithDocs = {
      ...issue.toObject(),
      documents: documents,
    }

    res.json({ success: true, data: issueWithDocs })
  } catch (err) {
    console.error("Error fetching issue details:", err)
    next(err)
  }
})

// Update issue
router.put("/:id", async (req, res, next) => {
  try {
    const query = { _id: req.params.id }

    // If not admin, ensure user can only update their own issues
    if (req.user.role !== "admin") {
      query.userId = req.user._id
    }

    const updatedIssue = await LegalIssue.findOneAndUpdate(query, req.body, { new: true })
      .populate("kiosk", "location village district")
      .populate("assignedParalegal", "user phoneNumber areasOfExpertise")

    if (!updatedIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" })
    }

    res.json({ success: true, data: updatedIssue })
  } catch (err) {
    next(err)
  }
})

// Soft delete issue
router.delete("/:id", async (req, res, next) => {
  try {
    const issue = await softDeleteById(LegalIssue, req.params.id)
    res.json({ success: true, message: "Legal Issue deleted successfully", data: issue })
  } catch (err) {
    next(err)
  }
})

export default router