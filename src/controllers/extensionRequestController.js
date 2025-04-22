const { ExtensionRequest } = require("../models/ExtensionRequest");

exports.createExtensionRequest = async (req, res) => {
  try {
    const { task_id, reason, new_deadline } = req.body;
    const requested_by = req.user.id;

    const request = await ExtensionRequest.create({
      task_id,
      requested_by,
      reason,
      new_deadline,
    });

    res.status(201).json({ message: "Extension request submitted", request });
  } catch (error) {
    console.error("Error creating extension request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExtensionRequestById = async (req, res) => {
  try {
    const request = await ExtensionRequest.getById(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllForTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const requests = await ExtensionRequest.getAllForTask(taskId);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveOrRejectRequest = async (req, res) => {
  try {
    const { status, new_deadline } = req.body;
    const approved_by = req.user.id;
    const decision_date = new Date();

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await ExtensionRequest.updateStatus(
      req.params.id,
      status,
      approved_by,
      decision_date,
      status === "approved" ? new_deadline : null
    );
    res.json({ message: `Request ${status}` });
    if (status === "approved" && new_deadline) {
      await Task.updateDeadline(request.task_id, new_deadline);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
