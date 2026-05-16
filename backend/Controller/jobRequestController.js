import jobRequestModel from "../Model/jobRequestModel.js";


export const GetAllPostedJobs = async (req, res) => {

  try {
    const allJobs = await jobRequestModel.find();

    if (!allJobs) {
      return res.status(404).json({ message: "Currently You don't have any posted jobs" });
    }

    return res.status(200).json({ allJobs });

  } catch (err) {

    console.log("Error: ", err);
    return res.status(500).json({ message: "Error Occur While fetching job posts.." });

  }
};

export const createJobPost = async (req, res) => {

  try {

    const { title, description, category, location, contactName, contactEmail } = req.body;

    if (!title || !description || !category || !location || !contactEmail) {
      return res.status(400).json({ message: "values cant be empty" });
    }

    const emailFormatValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormatValidate.test(contactEmail)) {
      return res.status(422).json({
        message: "Invalid email format"
      });
    }

    const saveValues = new jobRequestModel({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      status: `Open`
    });

    const saveJob = await saveValues.save();

    return res.status(201).json({ saveJob, message: "Job successfully posted" });

  } catch (err) {

    console.log("Error: ", err);
    return res.status(500).json({ message: "Error occur while posting job" });

  }

};

export const getJobsById = async (req, res) => {

  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Job Id isn't pass properly" });
    }

    const getJobById = await jobRequestModel.findById(id);

    if (getJobById == null) {
      return res.status(200).json({ message: "Don't have any post related to given id" });
    }

    return res.status(200).json(getJobById);

  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Error occur while Getting jobs By ID" });
  }

};

export const updateJobStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Job Id isn't pass properly" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status isn't passed properly" });
    }

    const updatedJob = await jobRequestModel.findByIdAndUpdate(id, { status }, { new: true }).lean();

    return res.status(200).json(updatedJob);

  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Error occur while updating job" });
  }

};

export const deleteJobPost = async (req, res) => {

  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Job Id isn't pass properly" });
    }

    const deleteJob = await jobRequestModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Job successfully deleted" });

  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Error occur while Deleting job" });
  }

};

